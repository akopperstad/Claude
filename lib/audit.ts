import type { CaptureResult, Finding, Severity } from "./types";

const weight: Record<Severity, number> = {
  critical: 14,
  warning: 6,
  info: 2,
  good: 0,
};

// Run heuristic UX/UI/accessibility/SEO/perf checks over a captured site and
// return findings + a 0-100 score. Pure function — no I/O — so it is trivially
// testable and runs with or without an API key.
export function auditSite(c: CaptureResult): {
  findings: Finding[];
  score: number;
  breakdown: Record<string, number>;
} {
  const f: Finding[] = [];
  const add = (x: Finding) => f.push(x);

  // ---- Responsive ----
  if (!c.viewportMeta) {
    add({
      id: "viewport",
      severity: "critical",
      category: "responsive",
      title: "No responsive viewport meta tag",
      detail:
        "The page is missing <meta name=\"viewport\">, so mobile browsers render it at desktop width and zoom out.",
      recommendation:
        'Add <meta name="viewport" content="width=device-width, initial-scale=1">.',
    });
  } else if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/.test(c.viewportMeta)) {
    add({
      id: "viewport-zoom",
      severity: "warning",
      category: "accessibility",
      title: "Pinch-zoom is disabled",
      detail: "The viewport tag blocks zooming, which fails WCAG 1.4.4.",
      recommendation: "Remove user-scalable=no / maximum-scale=1.",
    });
  }
  if (c.smallTapTargets > 0) {
    add({
      id: "tap-targets",
      severity: c.smallTapTargets > 8 ? "warning" : "info",
      category: "responsive",
      title: `${c.smallTapTargets} tap target(s) smaller than 44×44px`,
      detail:
        "Small links/buttons are hard to hit on touch screens (Apple/Google guideline is ~44px).",
      recommendation: "Increase padding/min-height on interactive elements.",
    });
  }

  // ---- Accessibility ----
  if (c.counts.imagesNoAlt > 0) {
    add({
      id: "alt",
      severity: c.counts.imagesNoAlt > 5 ? "critical" : "warning",
      category: "accessibility",
      title: `${c.counts.imagesNoAlt} image(s) missing alt text`,
      detail:
        "Screen readers can't describe these images; decorative images need alt=\"\".",
      recommendation: "Add descriptive alt attributes (empty alt if decorative).",
    });
  }
  if (!c.lang) {
    add({
      id: "lang",
      severity: "warning",
      category: "accessibility",
      title: "No <html lang> attribute",
      detail:
        "Without a language, screen readers may use the wrong pronunciation.",
      recommendation: 'Set <html lang="en"> (or the correct language).',
    });
  }
  if (c.counts.inputsNoLabel > 0) {
    add({
      id: "labels",
      severity: "warning",
      category: "accessibility",
      title: `${c.counts.inputsNoLabel} form field(s) without a label`,
      detail: "Unlabeled inputs are unusable with assistive tech.",
      recommendation: "Associate a <label for> or add aria-label.",
    });
  }
  if (c.lowContrastSamples > 0) {
    add({
      id: "contrast",
      severity: c.lowContrastSamples > 10 ? "warning" : "info",
      category: "accessibility",
      title: `~${c.lowContrastSamples} text sample(s) below 4.5:1 contrast`,
      detail:
        "Low contrast text fails WCAG AA and is hard to read in bright light.",
      recommendation: "Darken text or lighten background to reach 4.5:1.",
    });
  }
  const landmarksMissing = (["nav", "main", "header", "footer"] as const).filter(
    (k) => !c.landmarks[k]
  );
  if (landmarksMissing.length) {
    add({
      id: "landmarks",
      severity: "info",
      category: "structure",
      title: `Missing landmark region(s): ${landmarksMissing.join(", ")}`,
      detail:
        "Semantic landmarks let assistive tech and SEO crawlers understand page regions.",
      recommendation: "Wrap content in <header>, <nav>, <main>, <footer>.",
    });
  }

  // ---- SEO / structure ----
  if (!c.title || c.title.length < 10) {
    add({
      id: "title",
      severity: "warning",
      category: "seo",
      title: c.title ? "Page title is very short" : "Page has no <title>",
      detail: "The title is the primary SEO signal and the browser tab label.",
      recommendation: "Write a 30–60 char descriptive title.",
    });
  } else if (c.title.length > 65) {
    add({
      id: "title-long",
      severity: "info",
      category: "seo",
      title: "Page title may be truncated in search results",
      detail: `Title is ${c.title.length} chars; Google truncates around 60.`,
      recommendation: "Trim the title to ~60 characters.",
    });
  }
  if (!c.metaDescription) {
    add({
      id: "meta-desc",
      severity: "warning",
      category: "seo",
      title: "No meta description",
      detail: "Search engines fall back to scraped text for the snippet.",
      recommendation: "Add a 120–160 char meta description.",
    });
  }
  if (c.landmarks.h1Count === 0) {
    add({
      id: "h1-missing",
      severity: "warning",
      category: "seo",
      title: "No <h1> heading",
      detail: "Every page should have exactly one top-level heading.",
      recommendation: "Add a single descriptive <h1>.",
    });
  } else if (c.landmarks.h1Count > 1) {
    add({
      id: "h1-many",
      severity: "info",
      category: "seo",
      title: `${c.landmarks.h1Count} <h1> headings`,
      detail: "Multiple h1s dilute the document outline.",
      recommendation: "Use one <h1>; demote the rest to <h2>.",
    });
  }
  // Heading order jumps (e.g. h2 -> h4).
  let prev = 0;
  let skip = false;
  for (const h of c.headings) {
    if (prev && h.level > prev + 1) skip = true;
    prev = h.level;
  }
  if (skip) {
    add({
      id: "heading-order",
      severity: "info",
      category: "structure",
      title: "Heading levels skip a step",
      detail: "Jumping from e.g. h2 to h4 breaks the outline for screen readers.",
      recommendation: "Keep heading levels sequential.",
    });
  }
  if (!c.favicon) {
    add({
      id: "favicon",
      severity: "info",
      category: "seo",
      title: "No favicon",
      detail: "Favicons aid recognition in tabs, bookmarks and history.",
      recommendation: 'Add <link rel="icon" href="/favicon.ico">.',
    });
  }

  // ---- Performance ----
  if (c.loadMs > 5000) {
    add({
      id: "load",
      severity: "warning",
      category: "performance",
      title: `Slow load (~${(c.loadMs / 1000).toFixed(1)}s to network idle)`,
      detail: "Long loads increase bounce rate, especially on mobile networks.",
      recommendation: "Defer non-critical JS, compress images, lazy-load below the fold.",
    });
  }
  if (c.counts.domNodes > 1500) {
    add({
      id: "dom",
      severity: "info",
      category: "performance",
      title: `Large DOM (${c.counts.domNodes} nodes)`,
      detail: "Heavy DOM trees slow rendering and increase memory use.",
      recommendation: "Simplify markup; virtualize long lists.",
    });
  }
  if (c.counts.scripts > 20) {
    add({
      id: "scripts",
      severity: "info",
      category: "performance",
      title: `${c.counts.scripts} external scripts`,
      detail: "Each blocking script adds latency and a request.",
      recommendation: "Bundle, defer, or remove unused third-party scripts.",
    });
  }

  // ---- Visual ----
  if (c.fonts.length > 3) {
    add({
      id: "fonts",
      severity: "info",
      category: "visual",
      title: `${c.fonts.length} font families in use`,
      detail: `Detected: ${c.fonts.slice(0, 6).join(", ")}. Too many fonts feels inconsistent and slows load.`,
      recommendation: "Limit to ~2 families (one display, one body).",
    });
  }

  // ---- Security ----
  if (!c.https) {
    add({
      id: "https",
      severity: "critical",
      category: "security",
      title: "Site is not served over HTTPS",
      detail: "Browsers flag HTTP pages as 'Not secure' and block modern APIs.",
      recommendation: "Install a TLS certificate and redirect HTTP→HTTPS.",
    });
  }

  // Positive signals so the report isn't all negative.
  if (c.viewportMeta && landmarksMissing.length === 0) {
    add({
      id: "ok-semantics",
      severity: "good",
      category: "structure",
      title: "Responsive + full semantic landmarks",
      detail: "Viewport meta present and all main landmark regions exist.",
      recommendation: "Keep it up.",
    });
  }

  // ---- Score ----
  const breakdown: Record<string, number> = {};
  let penalty = 0;
  for (const x of f) {
    penalty += weight[x.severity];
    breakdown[x.category] = (breakdown[x.category] || 0) + weight[x.severity];
  }
  const score = Math.max(0, Math.min(100, 100 - penalty));

  // Sort: critical -> warning -> info -> good.
  const order: Severity[] = ["critical", "warning", "info", "good"];
  f.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));

  return { findings: f, score, breakdown };
}
