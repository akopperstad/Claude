# ref-current.md — Vøling codebase audit before visual revamp

Audited 2026-07-05. Source of truth: `/home/user/Claude/fasade/web`.
Files read: `app/layout.tsx`, `app/page.tsx`, `app/ny/page.tsx`, `app/prosjekt/[id]/page.tsx`,
`app/tokens.css`, `app/globals.css`, `components/{Logo,Beacon,CompareSlider,StyleStrip,Waitlist}.tsx`,
all `app/api/**` routes, `@pipeline/presets` (styleIds).

Locked brand context (DECISIONS.md): D7 scandi premium minimal, warm and honest; A13 lowercase
"vøling" wordmark, deep spruce green (`--gran`), ø-stroke as single brand gesture; free quota beta,
Norwegian bokmål, payment deferred ("Kommer snart").

---

## 1. Page inventory (DOM order, per page)

Global shell: `layout.tsx` renders `<html lang="nb"><body><Beacon/>{children}</body></html>`,
imports `tokens.css` then `globals.css`. Every page wraps content in `div.wrap`.

### `/` — Landing (`app/page.tsx`, server component, no state)

| # | Section | DOM + classes |
|---|---------|---------------|
| 1 | Nav | `nav.site` > `Logo` (`a.logo` > `span.o` > `span`) + `div.links` (3 anchor links `#stiler #slik #priser` + `Link.btn` → `/ny`) |
| 2 | Hero | `div.hero` > col 1: `span.seklabel`, `h1.display` (contains `span.marker` highlight), `p.lede`, `Link.btn.stor` → `/ny`, `div.trust` (3 `span` with `::before ✓`); col 2: `CompareSlider` (`div.cmp` …) with `/styles/base.jpg` vs `/styles/sort-minimalisme.jpg` |
| 3 | Stiler `#stiler` | `section.sek` > `span.seklabel` ("01 / Stiler") + div: `h2.sekttl`, `p.blokklede`, `StyleStrip` (browse-only, no `onSelect`) |
| 4 | Slik virker det `#slik` | `section.sek` > `span.seklabel` ("02 …") + div: `h2.sekttl`, `div.radliste` > 3× `div.rad` (`span.radnr`, `b`, `p`) |
| 5 | Priser `#priser` | `section.sek` > `span.seklabel` ("03 …") + div: `h2.sekttl`, `p.blokklede`, `div.prices` > 4× `div.price` (one `.price.feat` with `span.anbefalt`); each price: `span.seklabel`, `span.amount` (+`small`), `ul>li`, CTA (`Link.btn` on free tier; `span.btn.ghost.kommer` on paid tiers) |
| 6 | Ventelinje | inside Priser section: `div.ventelinje` > `span` + `Waitlist` (`form.venteliste` > `input.felt[type=email]` + `button.btn`; success swaps to `p.ventetakk`) |
| 7 | Footer | `footer.site` — © line + illustrasjon/søknadsplikt disclaimer |

### `/ny` — Upload + finn.no import (`app/ny/page.tsx`, client)

| # | Section | DOM + classes |
|---|---------|---------------|
| 1 | Nav | `nav.site` > `Logo` + `div.links` > `span.eyebrow` ("Steg 1 av 3") |
| 2 | Header | `section` (inline `padding:48px 0`) > `span.eyebrow`, `h1` (inline styles), `p` (inline styles) |
| 3 | Dropzone | `div.drop` (+`.dragover` while dragging) — click opens hidden `input[type=file]`; busy state shows `p.spinner`; idle shows two `p` (bold + "JPG eller PNG") |
| 4 | Error | conditional `div.hint` |
| 5 | Tips | `div.tips` > 3 emoji `span` |
| 6 | Finn-import | `div.finnimport` > `span.label`, `form.justerform` (`input.felt` URL + `button.btn` "Hent bilder"), `label.finnbekreft` (checkbox + span legal text); after fetch: `p.finntittel`, `p.finnvelg`, `div.finnbilder` (grid of `button>img`), `p.illu` disclaimer |
| 7 | Demo house | `div.analyse` (inline `margin-top:20`) > `b` + `button.btn.ghost` "Bruk eksempelhus" |

Note: no footer on `/ny`. Heading/paragraph in section 2 and the demo button margin use inline
styles, not classes.

### `/prosjekt/[id]` — Workbench (`app/prosjekt/[id]/page.tsx`, client)

Loading state (project null): `div.wrap` > `nav.site` > `Logo`; `p.spinner` "Henter prosjekt …".

| # | Section | DOM + classes |
|---|---------|---------------|
| 1 | Nav | `nav.site` > `Logo` + `div.links` > `span.eyebrow` ("Illustrasjon" if result else "Nytt prosjekt") |
| 2 | Analyse header | `section.prosjekt-hode` > `span.eyebrow` "Analysert", `h1` (buildingType), `p` (cladding · roof · windows) |
| 3 | Steg 1: nivå | `section.steg-seksjon` > `h2` (`span.stegnr` "1") + `div.nivaer` > 4× `button.niva` (+`.valgt`) each with `span.num`, `h3`, `p`, `span.tag` ("N poeng · gratis i beta") |
| 4 | Steg 2: tilpass | `section.steg-seksjon` > `h2` (`span.stegnr` "2") + `div.panel` with `div.del` blocks separated by borders: (a) level ≤2: `span.label` + `div.chips` > 6× `button.chip-farge` (+`.valgt`, `span.dot` inline bg) + `input.felt` custom color; (b) level ≥2: `span.label` + `StyleStrip` selectable (`div.stilstripe` > `div.stil`(+`.valgt`) > `button.stilbilde`(img + `span.zoom`) + `button.stiltekst`(b, span, `span.velg`); lightbox `div.lysboks` > `div.lysboks-innhold` > img, `div.lysboks-tekst` (+`button.btn`), `button.lysboks-pil.venstre/.hoyre`, `button.lysboks-lukk`); (c) wishes: `span.label` + `textarea.felt` (rows 2, maxLength 400); (d) level ≥3: inspiration `span.label` + `div.upload` > `label.btn.ghost` (hidden file input) + `span.filnavn`(+`.tom`) with `button.fjern`; (e) staging: `label.brytervalg` > `span.bryter`(+`.på`) > `span.knott`, hidden checkbox, `span.brytertekst` > `b` |
| 5 | Steg 3: render | `section.steg-seksjon` > `h2` (`span.stegnr` "3") + `div.cta` (`button.btn.stor` + `span.poengnote`); busy: `div.progress` (role=status) > `div.bar` > `div.fill` (inline width %) + `div.stage`; level ≥3 & !busy: `div.hint` søknadsplikt; error: `div.hint` |
| 6 | Result grid | conditional `div.resgrid` (ref=resultRef) — col 1: `CompareSlider`, `p.illu` (level/target/candidates/staging/demoSubstituted line), `div.kort.juster-kort` > `span.eyebrow` "Juster videre", chain `div.chips.stegrekke` > `button.chip-farge`(+`.valgt`) per step, `form.justerform` (`input.felt` maxLength 400 + `button.btn` "Juster"), `span.label` "Populære ideer", `div.chips` > 7× `button.chip-farge` "+ idea"; col 2: palette `div.kort` (`span.eyebrow`, `h3`, `p` inline styles), estimate `div.kort` (`span.eyebrow`, `table.kost` > rows + `tr.sum`, `p.illu`), `div.handling` (3× `.btn.w100`: håndverker `a.btn.w100 href="#"`, download `a.btn.ghost.w100[download]`, share `button.btn.ghost.w100`), email `div.kort` (inline margin) > `span.eyebrow` + `form.justerform` (`input.felt[type=email]` + `button.btn` "Send") or thanks `p` (inline styles) |
| 7 | Footer | `footer.site` |

---

## 2. FUNCTIONAL CONTRACT — must survive the revamp unchanged

The revamp may restyle everything below but must not change: state wiring, event handlers,
fetch payloads/endpoints, conditional rendering logic, class-based state toggles the JS drives
(`.dragover`, `.valgt`, `.på`, `--pos`, `.fill` width), or aria attributes.

### /ny — `app/ny/page.tsx`

1. **Photo upload (drag + click).** State: `busy`, `drag`, `error`; ref `fileInput`.
   `div.drop` onClick → `fileInput.current.click()`; onDragOver/Leave/Drop toggle `drag`
   (class `dragover`); drop or file-input change → `onFile` → FormData `photo=<file>` →
   `createProject(form)` → `POST /api/prosjekt` (multipart) → on ok `router.push('/prosjekt/'+data.id)`.
   Accept `image/jpeg,image/png`; server caps 15 MB. Busy shows `p.spinner`; errors land in `div.hint`.
2. **Demo house button.** `button.btn.ghost` → `createProject({demo:true})` →
   `POST /api/prosjekt` (JSON `{demo:true}`) → redirect. Disabled while `busy`.
3. **finn.no import, gated by private-use checkbox.** State: `finnUrl`, `finnBusy`,
   `finnImages: string[]`, `finnTitle`, `finnBekreft` (A27 gate).
   Submit button disabled unless `finnUrl.trim() && finnBekreft && !finnBusy`; form onSubmit also
   re-checks both. `hentFinn()` → `POST /api/finn` JSON `{url}` → `{images: string[], title?}`
   (server validates finn.no host, returns finncdn 1600w URLs, max 24; errors are Norwegian strings).
   Clicking a thumbnail → `createProject({finnImageUrl: src})` → `POST /api/prosjekt` JSON
   (server accepts only `https://images.finncdn.no/dynamic/` prefixes). Both legal-text blocks
   (checkbox label + `p.illu` under grid) must remain.

### /prosjekt/[id] — `app/prosjekt/[id]/page.tsx`

State variables (complete list): `project`, `level` (1|2|3|4), `farge`, `egenFarge`, `wishes`,
`busy`, `progress`, `stage`, `result`, `error`, `email`, `emailState` ('idle'|'sent'), `juster`,
`styleId`, `stagingChoice` (boolean|null), `insp` ({base64,mime,name}|null); derived
`staging = stagingChoice ?? level >= 3`; refs `resultRef`; derived `beforeUrl`
(`project.photoPath` if demo else `/api/bilde/{id}`), `poeng`, `chain` (parentId walk, oldest first).

4. **Project load.** `useEffect` → `GET /api/prosjekt/{id}` → `setProject`; last render
   (`p.renders.at(-1)`) becomes `result` and sets `level`. Loading UI = spinner page.
5. **Nivå 1–4 selection with quota points.** `NIVAER` const (poeng 1/1/2/3). Click sets `level`
   and clears `styleId` if selected style's `minLevel > level` (styles from
   `EXTERIOR_STYLES`, `@pipeline/presets`: sorlandshvit, moderne-kontrast, lys-skandinavisk,
   sort-minimalisme, naturnaer-lerk, fjellstil, herskapelig; minLevel 2 typical).
   `.valgt` class on active; `poengnote` shows cost from `NIVAER`.
6. **Color chips + custom color (level ≤ 2 only).** Chip click toggles `farge` (re-click
   deselects → null) and clears `egenFarge`; typing in `egenFarge` clears `farge`.
   Payload uses `egenFarge.trim() || farge` as `target`, only sent when `level <= 2`.
7. **Style strip (level ≥ 2 only).** `StyleStrip maxLevel={level} selectedId={styleId}
   onSelect={setStyleId}`. Contract in component: filter `minLevel <= maxLevel`; image click
   opens lightbox at index; text button toggles selection (null on re-click); lightbox is
   `role="dialog" aria-modal`, backdrop click closes, `stopPropagation` on content, keyboard
   Escape/ArrowRight/ArrowLeft (window keydown listener while open), arrows wrap modulo,
   "Velg denne stilen" selects + closes. Landing uses it with no `onSelect` (text click opens
   lightbox instead). Images from `/styles/{id}.jpg`, broken imgs hidden via onError.
8. **Wishes textarea.** `textarea.felt` maxLength 400 → `wishes`; sent as `wishes` when non-empty.
   Placeholder text differs by level (≤2 vs ≥3).
9. **Inspiration photo (level ≥ 3 only).** Hidden file input in `label.btn.ghost`; FileReader
   → dataURL → `insp = {base64 (after comma), mime (png|jpeg), name}`; `button.fjern` clears.
   Sent as `inspirationBase64`+`inspirationMime` only when `level >= 3 && insp`.
10. **Rydd & vask toggle (A21 per-level defaults).** `stagingChoice` starts null =
    follow default (on at 3–4, off at 1–2); hidden checkbox checked = `staging`;
    change sets explicit `stagingChoice`. Visual = `span.bryter` + `.på` class + `span.knott`.
    Note: class name is `på` (non-ASCII) — keep exact.
11. **Render CTA + progress.** `render()` → `POST /api/prosjekt/{id}/render` JSON.
    Fresh payload: `{level, staging, target? (level≤2 && color), styleId? (level≥2 && styleId),
    wishes?, inspirationBase64?/inspirationMime? (level≥3)}`.
    Chained payload: `{baseRenderId, instruction, source: 'chip'|'text'}`.
    Progress: setInterval 900 ms; eases to max 90% on a 110 s clock, 100% only on real response;
    stage strings: "Leser bildet …" (<3 s), "Analyserer fasade og omgivelser …" (<8 s),
    "Genererer — tar vanligvis 1–2 minutter" (<15 s), then rotates 11 FUN lines every 7 s.
    `div.progress` has `role="status" aria-live="polite"`. Response parsed via `res.text()` then
    JSON.parse (tolerates empty body). Success: setResult, append to `project.renders`, clear
    `juster` if edit, smooth-scroll `resultRef` via requestAnimationFrame.
    Quota errors surface server message (429: "Dagens N gratis render-poeng er brukt opp …")
    in `div.hint`. Chained edits cost 1 poeng server-side.
12. **Error hints.** Two `div.hint` uses in steg 3: søknadsplikt notice (level ≥3 && !busy)
    and `error`. Same class also used on /ny for upload/finn errors.
13. **Result before/after slider.** `CompareSlider before={beforeUrl} after={result.imageUrl}`.
    Contract: `pos` state 0–100 drives CSS var `--pos` on `div.cmp`; invisible full-bleed
    `input[type=range]` (aria-label "Sammenlign før og etter") is the control; `clip-path`
    on `.beforeWrap`, `.divider`+`.handle` positioned at `--pos`; FØR/ETTER `span.taglabel.tl-l/.tl-r`.
    Also used in landing hero.
14. **Chain step chips (A16.3).** `chain` built by walking `parentId` via Map of renders with ids;
    shown when length > 1; click `setResult(r)` (next adjustment builds on the shown step);
    active step gets `.valgt`; label `{i+1}. {instruction ?? target}`.
15. **"Populære ideer" one-tap chips (A25).** `IDEER` const (7 strings); click →
    `render({baseRenderId: result.id, instruction: idee, source:'chip'})`; disabled while busy.
    Rendered only when `result.id` exists (as is the juster form).
16. **Juster-videre form.** `form.justerform` onSubmit → chained render with
    `juster.trim()`, source 'text'; button disabled when busy or empty; input cleared on success.
17. **Palette card.** Conditional on `result.palette`; shows `palette.cladding` (h3) +
    `palette.reasoning`.
18. **Cost estimate table.** `result.estimate.lines[]` rows via `kr()` formatter
    (`Math.round(n/1000)` + " 000 kr"), `tr.sum` totals `totalLowNok`–`totalHighNok`;
    `p.illu` "Ikke et tilbud" disclaimer.
19. **Håndverker CTA.** `a.btn.w100 href="#"` "Få tilbud fra håndverkere i nærheten"
    (placeholder link — keep as dead CTA).
20. **Download.** `a.btn.ghost.w100 href={result.imageUrl} download`.
21. **Share-card canvas (A25).** `shareCard()`: loads beforeUrl + result.imageUrl into Images,
    canvas H=900 + 110 px footer, widths from aspect ratios, bg `#faf9f6`, FØR/ETTER tags
    (dark pills), "vøling" wordmark `#2e4636` + tagline `#5c6660`, toBlob →
    download `voling-for-etter.png`. Hardcoded colors here are brand-load-bearing —
    update deliberately if palette shifts, don't break the flow.
22. **Email report form.** `POST /api/interesse` JSON `{email, projectId}` → on ok
    `emailState='sent'` swaps form for thanks text.
23. **Result illu caption.** Must keep conditional fragments: candidates > 1
    ("Geometri rangert — beste av N"), staging ("Inkluderer rydding og vask"),
    demoSubstituted ("Demo-modus: eksempelrender vist …").

### Global

24. **Waitlist form (landing).** `Waitlist` component: `POST /api/interesse` JSON `{email}`
    (no projectId) → `sent` swaps to `p.ventetakk`. Requires valid email server-side.
25. **Pageview beacon.** `Beacon` in layout: on every `usePathname()` change →
    `POST /api/hendelse` JSON `{path}` with `keepalive:true`, errors swallowed. Server
    normalizes `/prosjekt/<id>` → `/prosjekt/:id`. Must stay mounted in layout.
26. **Logo (A13).** `a.logo href="/"`: literal text `v` + `span.o>span>o` + `ling`; the ø-stroke
    is pure CSS (`.logo .o::after` rotated bar, `::before` re-draws the o, inner span hidden).
    Any markup change must preserve accessible text "voling"/ø rendering.

### Fetch endpoint summary

| Endpoint | Method | Used by | Payload → response |
|---|---|---|---|
| `/api/prosjekt` | POST | /ny (all 3 entry flows) | multipart `photo` \| `{demo:true}` \| `{finnImageUrl}` → Project `{id,…}` |
| `/api/finn` | POST | /ny | `{url}` → `{images[], title?}` |
| `/api/prosjekt/[id]` | GET | workbench load | → Project (analysis + renders[]) |
| `/api/prosjekt/[id]/render` | POST | render + juster + idea chips | fresh or chained payload → RenderRecord (+`demoSubstituted`); 429 quota |
| `/api/bilde/[id]` | GET | beforeUrl (non-demo) | image bytes |
| `/api/interesse` | POST | Waitlist + email report | `{email, projectId?}` → `{ok:true}` |
| `/api/hendelse` | POST | Beacon | `{path}` → `{ok:true}` |
| `/api/render/[name]` | GET | render imageUrls | serves generated render files |

---

## 3. CSS class inventory

### tokens.css (82 lines) — SAFE to retune, keep variable NAMES

`--paper --card --ink --muted --line` (base), `--gran --gran-hover --gran-lys --gran-ink` (brand),
`--varsel-bg --varsel-ink` (warning), `--font --font-mono --fs-display --fs-h2 --fs-body
--fs-small --track-label` (type), `--radius --gap --maxw` (form). Three theme blocks:
`:root`, `@media (prefers-color-scheme: dark)`, `:root[data-theme="dark"]`,
`:root[data-theme="light"]`. Values are the revamp's playground; renaming variables requires
sweeping globals.css + inline `var(--muted)`/`var(--gran-ink)` uses in ny/prosjekt TSX.

### globals.css (1082 lines), by file section

| Section (comment) | Classes | Restyle safety |
|---|---|---|
| base | `*`, `body`, `a`, `.wrap` | Safe; `.wrap` max-width is layout-structural |
| logo (A13) | `.logo`, `.logo .o` (+`::before/::after`), `.logo .o span` | STRUCTURAL — CSS-drawn ø depends on exact pseudo-element trick; restyle size/weight only |
| nav | `nav.site`, `nav.site .links`, `nav.site a:not(.btn):not(.logo)` | Safe |
| buttons | `.btn`, `.btn:hover`, `.btn.ghost`, `.btn:disabled`, `.eyebrow` | Safe; keep `:disabled` visibly distinct (gates depend on it) |
| hero | `.hero`, `.hero h1`, `.hero p.lede`, `.trust`, `.trust span::before`, 860px breakpoint | Safe |
| compare slider | `.cmp`, `.cmp img`, `.cmp .beforeWrap`, `.cmp .divider`, `.cmp .handle`, `.cmp .taglabel`, `.tl-l`, `.tl-r`, `.cmp input[type=range]` | STRUCTURAL — `--pos` var, `clip-path`, invisible range input, `position:absolute` stack are the widget's mechanics; colors/shadows/radius safe |
| sections | `section.block` (UNUSED — no `.block` in TSX), `h2`, `.steps`/`.step`/`.step .n` (UNUSED — landing now uses `.rad`) | Dead code candidates; verify before deleting |
| pricing | `.prices`, `.price`(+`.feat`), `.price .amount`(+`small`), `.price ul`, `.price .btn` | Safe |
| upload | `.drop`, `.drop b`, `.drop.dragover`, `.tips`, `.analyse` | `.dragover` class name is JS-driven — keep name; visuals safe |
| levels | `.nivaer`, `.niva`(+`.valgt`), `.niva h3/.num/p/.tag`, `.niva.valgt .tag`, `.hint` | `.valgt` name JS-driven; visuals safe |
| result | `.resgrid` (+breakpoint), `.kort`, `.kort h3`, `.swatches`/`.sw` (UNUSED in TSX), `table.kost`, `.kost td`, `.kost tr.sum td`, `.illu`, `footer.site`, `.spinner` | Safe; `.swatches/.sw` dead |
| level options | `.valg` (UNUSED), `.chips`, `.chip-farge`(+`.valgt`), `.chip-farge .dot`, `.felt`, `.felt:focus` | `.valgt` JS-driven; `.dot` gets inline background — keep it a paintable swatch |
| render progress | `.progress`, `.progress .bar`, `.progress .fill`, `.progress .stage`, reduced-motion block | STRUCTURAL-ish — `.fill` width set inline by JS; keep width-based bar + transition override |
| style strip + lightbox (A24) | `.stilstripe`, `.stil`(+`.valgt`,`:hover`), `.stilbilde`, `.stilbilde img`, `.stilbilde .zoom`, `.stiltekst`(+`b/span/.velg`), `.lysboks`, `.lysboks-innhold`(+`>img`), `.lysboks-tekst`, `.lysboks-pil`(+`.venstre/.hoyre`), `.lysboks-lukk` | Scroll-snap + fixed-overlay mechanics structural; all colors/cards safe. `.valgt` JS-driven |
| project workbench | `.prosjekt-hode`(+h1/p), `.steg-seksjon`(+h2), `.stegnr`, `.panel`, `.panel .del`(+`+ .del`), `.label`, `.panel .felt`, `.panel .chips`, `.upload`(+`.btn.ghost`), `.filnavn`(+`.tom`), `.fjern`, `.brytervalg`, `.bryter`(+`.på`), `.bryter .knott`, `.brytertekst`(+b), `.cta`, `.btn.stor`, `.poengnote`, `.juster-kort`, `.stegrekke`, `.justerform`(+`.felt`), `.handling`, `.w100` | `.på` (non-ASCII!) and toggle geometry structural (knott left offsets); rest safe |
| landing extras | `.blokklede`, `.ventelinje`, `.venteliste`(+`.felt`), `.ventetakk`, `.btn.kommer`, shared transition block (`.btn,.chip-farge,.niva,.price`), hover lifts, `:focus-visible`, `.price .btn` margin | Safe; keep a visible `:focus-visible` treatment |
| finn import (A16.4/A17) | `.finnimport`(+`.justerform .felt`), `.finntittel`, `.finnvelg`, `.finnbilder`(+button/img) | Safe |
| finn confirmation (A27) | `.finnbekreft`(+input) | Safe visuals; the checkbox must stay a real, clickable gate |
| editorial pass | `.display`, `.marker`, `.seklabel`, `.sek` (+breakpoint), `.sekttl`, `.radliste`, `.rad`(+`.radnr`/b/p, breakpoint), `.price` position, `.price .amount` mono, `.anbefalt` | Safe — this is the layer the revamp replaces |

### Safe vs structural, summarized

- **Free to restyle/replace:** all colors, shadows, radii, spacing, typography, hover lifts,
  the entire "editorial pass" layer, pricing/hero/section layouts, cards (`.kort`, `.panel`),
  chips visuals, dropzone visuals, finn grid, footer/nav.
- **Structural — keep mechanics, restyle skins only:** `.cmp` slider stack (`--pos`,
  clip-path, hidden range), `.logo .o` pseudo-element ø, `.bryter/.knott/.på` toggle,
  `.progress .fill` inline-width bar, `.lysboks` fixed overlay + `stopPropagation` layout,
  `.stilstripe` horizontal scroll-snap, `.drop` as click/drop target.
- **JS-driven class names that must keep their exact names:** `dragover`, `valgt`
  (niva/chip/stil/chain), `på`, `tom`, `kommer` is content-driven; plus inline-style hooks
  (`--pos`, `.fill` width, `.dot` background).
- **Dead CSS (verify, then delete during revamp):** `section.block`, `.steps`, `.step`,
  `.step .n`, `.swatches`, `.sw`, `.valg`.
- **Inline styles in TSX to migrate into classes during revamp:** /ny header (h1/p/section
  padding, demo button margin), workbench palette/email card paragraphs, spinner paddings,
  `.label` margin-top on "Populære ideer".
