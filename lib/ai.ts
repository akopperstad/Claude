import Anthropic from "@anthropic-ai/sdk";
import type { Finding, PageAudit } from "./types";

const MODEL = process.env.REFACE_MODEL || "claude-sonnet-4-6";

// A key can come from the request (UI field) or the environment.
export function resolveApiKey(reqKey?: string): string | undefined {
  const k = (reqKey || "").trim();
  if (k) return k;
  return process.env.ANTHROPIC_API_KEY || undefined;
}

interface AiOutput {
  review: string;
  redesignHtml: string;
}

// Send the homepage screenshot + every crawled page's content + the aggregated
// heuristic findings to Claude (vision) and ask for (1) a prose UX/UI review and
// (2) a complete, self-contained multi-section redesigned site. Returns null on
// any failure so the caller can fall back to the template redesign.
export async function aiReviewAndRedesign(
  pages: PageAudit[],
  findings: Finding[],
  apiKey?: string
): Promise<AiOutput | null> {
  const key = resolveApiKey(apiKey);
  if (!key) return null;
  const client = new Anthropic({ apiKey: key });

  const home = pages[0].capture;
  const base64 = home.desktopShot.replace(/^data:image\/png;base64,/, "");
  const findingsText = findings
    .filter((f) => f.severity !== "good")
    .map((f) => `- [${f.severity}] ${f.title}: ${f.recommendation}`)
    .join("\n");

  const pagesText = pages
    .map((p, i) => {
      const c = p.capture;
      return `### Page ${i + 1}${i === 0 ? " (HOME)" : ""}: ${c.finalUrl}
Title: ${c.title}
Headings: ${c.headings.slice(0, 8).map((h) => `h${h.level}:${h.text}`).join(" | ")}
Content:
${c.contentText.slice(0, i === 0 ? 3000 : 1500)}`;
    })
    .join("\n\n");

  const prompt = `You are a senior product designer and front-end engineer reviewing a website (${pages.length} page(s) crawled).

The HOMEPAGE screenshot is attached. Site URL: ${home.finalUrl}
Detected fonts: ${home.fonts.join(", ") || "n/a"}

Aggregated heuristic audit findings (across all pages):
${findingsText || "(none)"}

Crawled pages and their real content (reuse this copy so the redesign stays recognizable):
"""
${pagesText.slice(0, 9000)}
"""

Do TWO things, in this exact output format:

<review>
A concise, specific UX/UI critique (250-450 words) of the site as a whole.
Cover visual hierarchy, layout, typography, color/contrast, accessibility,
navigation/IA across the pages, and conversion. Reference what you actually see
in the homepage screenshot. Short paragraphs and bullets.
</review>

<redesign>
A COMPLETE, self-contained HTML document (one file, inline <style>, no build step,
no external JS frameworks) that redesigns the WHOLE site as a single cohesive page:
- a sticky top nav linking to one in-page section per crawled page
- a strong hero from the homepage
- one <section> per crawled page, reusing that page's real headline/content
- mobile-first, fully responsive, modern cohesive visual design
- fixes the audit findings (responsive viewport, contrast >= 4.5:1, alt text, labels, semantic landmarks <header><nav><main><footer>)
- production-quality, renders correctly on its own
Output ONLY the HTML inside this tag, starting with <!doctype html>.
</redesign>`;

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 8000,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/png", data: base64 } },
            { type: "text", text: prompt },
          ],
        },
      ],
    });

    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    const review =
      text.match(/<review>([\s\S]*?)<\/review>/i)?.[1]?.trim() || text.slice(0, 1400);
    let redesignHtml = text.match(/<redesign>([\s\S]*?)<\/redesign>/i)?.[1]?.trim() || "";
    redesignHtml = redesignHtml.replace(/^```html?\s*/i, "").replace(/```$/i, "").trim();

    if (!/<!doctype html|<html/i.test(redesignHtml)) return null;
    return { review, redesignHtml };
  } catch (e) {
    console.error("AI redesign failed:", e);
    return null;
  }
}
