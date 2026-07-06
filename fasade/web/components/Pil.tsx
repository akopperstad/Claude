/* Drawn inline-SVG arrows (§5.3) — never an icon font. Shared by the
   landing, the workbench and the style strip. The `.pil` class (globals.css)
   gives the hover nudge. */

export function Pil() {
  return (
    <svg className="pil" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PilNed() {
  return (
    <svg className="pil" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 1v12M2 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
