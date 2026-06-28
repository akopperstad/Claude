export type Severity = "critical" | "warning" | "info" | "good";

export interface Finding {
  id: string;
  severity: Severity;
  category:
    | "responsive"
    | "accessibility"
    | "seo"
    | "performance"
    | "structure"
    | "visual"
    | "security";
  title: string;
  detail: string;
  recommendation: string;
}

export interface HeadingNode {
  level: number;
  text: string;
}

export interface CaptureResult {
  url: string;
  finalUrl: string;
  https: boolean;
  title: string;
  lang: string | null;
  metaDescription: string | null;
  viewportMeta: string | null;
  charset: string | null;
  favicon: boolean;
  fonts: string[];
  headings: HeadingNode[];
  links: string[]; // same-origin internal links discovered on the page
  counts: {
    images: number;
    imagesNoAlt: number;
    links: number;
    buttons: number;
    forms: number;
    inputs: number;
    inputsNoLabel: number;
    scripts: number;
    stylesheets: number;
    domNodes: number;
    wordCount: number;
  };
  landmarks: {
    nav: boolean;
    main: boolean;
    header: boolean;
    footer: boolean;
    h1Count: number;
  };
  lowContrastSamples: number;
  smallTapTargets: number;
  bodyBg: string | null;
  primaryText: string | null;
  contentText: string;
  desktopShot: string; // data URL (png base64)
  mobileShot: string; // data URL (png base64)
  loadMs: number;
}

export interface PageAudit {
  capture: CaptureResult;
  findings: Finding[];
  score: number;
}

export interface Snapshot {
  id: string;
  styleName: string;
  vibe: string;
  source: "ai" | "template";
  html: string;
}

export interface AnalyzeResult {
  pages: PageAudit[];
  score: number; // overall (site-wide)
  scoreBreakdown: Record<string, number>;
  review: string;
  snapshots: Snapshot[];
  sector: string; // detected or chosen sector id
  sectorLabel: string;
  sectorConfidence: number; // 0-1
  sectors: { id: string; label: string }[]; // all selectable sectors
  aiRequested: boolean;
}
