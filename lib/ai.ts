import Anthropic from "@anthropic-ai/sdk";
import type { CaptureResult, Finding } from "./types";

const MODEL = process.env.REFACE_MODEL || "claude-sonnet-4-6";

export function aiAvailable(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

interface AiOutput {
  review: string;
  redesignHtml: string;
}

// Send the desktop screenshot + extracted content + heuristic findings to Claude
// (vision) and ask for (1) a prose UX/UI review and (2) a complete, self-contained
// redesigned HTML page. Returns null on any failure so the caller can fall back
// to the template redesign.
export async function aiReviewAndRedesign(
  c: CaptureResult,
  findings: Finding[]
): Promise<AiOutput | null> {
  if (!aiAvailable()) return null;
  const client = new Anthropic();

  const base64 = c.desktopShot.replace(/^data:image\/png;base64,/, "");
  const findingsText = findings
    .filter((f) => f.severity !== "good")
    .map((f) => `- [${f.severity}] ${f.title}: ${f.recommendation}`)
    .join("\n");

  const prompt = `You are a senior product designer and front-end engineer reviewing a website.

URL: ${c.finalUrl}
Title: ${c.title}
Detected fonts: ${c.fonts.join(", ") || "n/a"}
Heuristic audit findings:
${findingsText || "(none)"}

Extracted page content (use this real copy in the redesign so it stays recognizable):
"""
${c.contentText.slice(0, 4000)}
"""

A full-page screenshot is attached.

Do TWO things, in this exact output format:

<review>
A concise, specific UX/UI critique (250-400 words). Cover visual hierarchy,
layout, typography, color/contrast, accessibility, and conversion. Reference what
you actually see in the screenshot. Use short paragraphs and bullet points.
</review>

<redesign>
A COMPLETE, self-contained HTML document (one file, inline <style>, no external
build step, no external JS frameworks). It must:
- reuse the real headline/content above so it's clearly the same site, improved
- be mobile-first and fully responsive
- fix the audit findings (responsive viewport, contrast >= 4.5:1, alt text, labels, semantic landmarks)
- use a modern, cohesive visual design with a clear hierarchy and strong hero
- be production-quality and render correctly on its own
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
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: base64 },
            },
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
      text.match(/<review>([\s\S]*?)<\/review>/i)?.[1]?.trim() ||
      text.slice(0, 1200);
    let redesignHtml =
      text.match(/<redesign>([\s\S]*?)<\/redesign>/i)?.[1]?.trim() || "";
    // Strip stray markdown fences if the model added them.
    redesignHtml = redesignHtml.replace(/^```html?\s*/i, "").replace(/```$/i, "").trim();

    if (!/<!doctype html|<html/i.test(redesignHtml)) return null;
    return { review, redesignHtml };
  } catch (e) {
    console.error("AI redesign failed:", e);
    return null;
  }
}
