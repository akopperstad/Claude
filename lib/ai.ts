import Anthropic from "@anthropic-ai/sdk";
import type { Finding, PageAudit } from "./types";
import type { StyleTokens } from "./styles";

const MODEL = process.env.REFACE_MODEL || "claude-sonnet-4-6";

export function resolveApiKey(reqKey?: string): string | undefined {
  const k = (reqKey || "").trim();
  if (k) return k;
  return process.env.ANTHROPIC_API_KEY || undefined;
}

function pagesContext(pages: PageAudit[]): string {
  return pages
    .map((p, i) => {
      const c = p.capture;
      return `### Page ${i + 1}${i === 0 ? " (HOME)" : ""}: ${c.finalUrl}
Title: ${c.title}
Headings: ${c.headings.slice(0, 8).map((h) => `h${h.level}:${h.text}`).join(" | ")}
Content:
${c.contentText.slice(0, i === 0 ? 2600 : 1200)}`;
    })
    .join("\n\n")
    .slice(0, 9000);
}

// Generate ONE style-directed redesign snapshot with Claude (vision). Optionally
// also returns a prose review (only request it once per run to save tokens).
export async function aiSnapshot(
  pages: PageAudit[],
  findings: Finding[],
  style: StyleTokens,
  sectorLabel: string,
  apiKey: string,
  wantReview: boolean
): Promise<{ html: string; review?: string } | null> {
  const client = new Anthropic({ apiKey });
  const home = pages[0].capture;
  const base64 = home.desktopShot.replace(/^data:image\/png;base64,/, "");
  const findingsText = findings
    .filter((f) => f.severity !== "good")
    .map((f) => `- [${f.severity}] ${f.title}: ${f.recommendation}`)
    .join("\n");

  const reviewBlock = wantReview
    ? `<review>
A concise, specific UX/UI critique (220-380 words) of the site as a whole — visual
hierarchy, layout, typography, color/contrast, accessibility, navigation across the
pages, and conversion. Reference what you see in the homepage screenshot. Bullets ok.
</review>

`
    : "";

  const prompt = `You are a senior product designer redesigning a ${sectorLabel} website (${pages.length} page(s) crawled). The homepage screenshot is attached.

Design direction for THIS snapshot — "${style.name}": ${style.vibe}.
Palette: background ${style.bg}, text ${style.text}, primary ${style.brand}, secondary ${style.brand2} (${style.mode} mode). Headings font family like ${style.headingFont}. Corner radius ~${style.radius}. Make the design clearly match this direction and feel appropriate for a ${sectorLabel} brand.

Aggregated heuristic findings to fix:
${findingsText || "(none)"}

Crawled pages and real content (reuse this copy so it stays recognizable):
"""
${pagesContext(pages)}
"""

Output EXACTLY in this format:
${reviewBlock}<redesign>
A COMPLETE, self-contained HTML document (one file, inline <style>, no build step,
no external JS) redesigning the WHOLE site as one cohesive page in the "${style.name}"
direction: sticky nav linking to one in-page section per crawled page, a strong hero,
one <section> per page reusing real content, mobile-first + responsive, semantic
landmarks, contrast >= 4.5:1, alt text. Output ONLY the HTML, starting with <!doctype html>.
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

    let html = text.match(/<redesign>([\s\S]*?)<\/redesign>/i)?.[1]?.trim() || "";
    html = html.replace(/^```html?\s*/i, "").replace(/```$/i, "").trim();
    if (!/<!doctype html|<html/i.test(html)) return null;

    const review = wantReview
      ? text.match(/<review>([\s\S]*?)<\/review>/i)?.[1]?.trim()
      : undefined;
    return { html, review };
  } catch (e) {
    console.error("AI snapshot failed:", e);
    return null;
  }
}
