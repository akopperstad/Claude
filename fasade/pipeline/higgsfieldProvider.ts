import type { RenderProvider } from './provider';
import type { RenderRequest, RenderResult } from './types';

/**
 * Higgsfield platform REST adapter.
 *
 * Contract from https://docs.higgsfield.ai (verified 2026-07-05):
 *   auth    Authorization: Key {key}:{secret}
 *   submit  POST https://platform.higgsfield.ai/{model_id}  body: {prompt, aspect_ratio, ...}
 *   poll    GET  https://platform.higgsfield.ai/requests/{request_id}/status
 *           -> { status: queued|in_progress|nsfw|failed|completed, images: [{url}] }
 *   cancel  POST https://platform.higgsfield.ai/requests/{request_id}/cancel
 *
 * OPEN (docs don't cover it yet): the field name for a reference/input image
 * on image-edit models, and the exact platform id for the nano-banana model
 * used in buckets 1-2. Both must be confirmed against the models gallery
 * (cloud.higgsfield.ai) when the API key is provisioned — REFERENCE_FIELD and
 * MODEL_ID below are the only two things expected to change.
 */

const BASE = 'https://platform.higgsfield.ai';
const MODEL_ID = process.env.FASADE_MODEL_ID ?? 'nano-banana-pro'; // confirm at key provisioning
const REFERENCE_FIELD = process.env.FASADE_REFERENCE_FIELD ?? 'input_images'; // confirm at key provisioning
const POLL_INTERVAL_MS = 3_000;
const POLL_TIMEOUT_MS = 180_000;
const MAX_SUBMIT_RETRIES = 3;

export class HiggsfieldProvider implements RenderProvider {
  private readonly authHeader: string;

  constructor(apiKey = process.env.HIGGSFIELD_API_KEY, apiSecret = process.env.HIGGSFIELD_API_SECRET) {
    if (!apiKey || !apiSecret) {
      throw new Error('HIGGSFIELD_API_KEY and HIGGSFIELD_API_SECRET must be set');
    }
    this.authHeader = `Key ${apiKey}:${apiSecret}`;
  }

  async uploadSource(image: Buffer, contentType: string): Promise<string> {
    // The platform API accepts public image URLs as inputs; product uploads
    // go to our own storage (bucket 4: object store + signed URLs) and the
    // public URL is passed as the reference. This adapter therefore expects
    // the caller to host the bytes and treats the URL as the source ref.
    void image;
    void contentType;
    throw new Error(
      'uploadSource: host the image (product object store) and pass its URL as sourceRef',
    );
  }

  async render(sourceRef: string, prompt: string, req: RenderRequest): Promise<RenderResult> {
    const body: Record<string, unknown> = {
      prompt,
      aspect_ratio: '4:3',
      [REFERENCE_FIELD]: [sourceRef],
    };
    const requestId = await this.submitWithRetry(body);
    const imageUrl = await this.pollUntilDone(requestId);
    return { jobId: requestId, imageUrl, cost: 2, request: req };
  }

  private async submitWithRetry(body: Record<string, unknown>): Promise<string> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_SUBMIT_RETRIES; attempt++) {
      try {
        const res = await fetch(`${BASE}/${MODEL_ID}`, {
          method: 'POST',
          headers: {
            Authorization: this.authHeader,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          throw new Error(`submit failed: ${res.status} ${await res.text()}`);
        }
        const data = (await res.json()) as { request_id?: string; id?: string };
        const id = data.request_id ?? data.id;
        if (!id) throw new Error(`submit response missing request id: ${JSON.stringify(data)}`);
        return id;
      } catch (err) {
        lastError = err;
        if (attempt < MAX_SUBMIT_RETRIES) {
          await sleep(1000 * 2 ** attempt);
        }
      }
    }
    throw lastError;
  }

  private async pollUntilDone(requestId: string): Promise<string> {
    const deadline = Date.now() + POLL_TIMEOUT_MS;
    while (Date.now() < deadline) {
      const res = await fetch(`${BASE}/requests/${requestId}/status`, {
        headers: { Authorization: this.authHeader },
      });
      if (!res.ok) throw new Error(`status failed: ${res.status} ${await res.text()}`);
      const data = (await res.json()) as {
        status: string;
        images?: Array<{ url: string }>;
      };
      switch (data.status) {
        case 'completed': {
          const url = data.images?.[0]?.url;
          if (!url) throw new Error('completed without image url');
          return url;
        }
        case 'failed':
        case 'nsfw':
          throw new Error(`generation ${data.status} (request ${requestId})`);
        default:
          await sleep(POLL_INTERVAL_MS);
      }
    }
    throw new Error(`generation timed out after ${POLL_TIMEOUT_MS}ms (request ${requestId})`);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
