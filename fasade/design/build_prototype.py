import base64, io, os
from PIL import Image

SP = '/tmp/claude-0/-home-user-Claude/4e4bb2d4-b51a-5d47-9451-4638e34b7387/scratchpad'
D = os.path.join(SP, 'design')

def b64(path, w=760, q=68):
    im = Image.open(path).convert('RGB')
    h = int(im.height * w / im.width)
    buf = io.BytesIO()
    im.resize((w, h)).save(buf, 'JPEG', quality=q)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()

M = os.path.join(SP, 'matrix')
imgs = {
    'e7_for': b64(f'{M}/orig_e7.jpg'),
    'e7_rod': b64(f'{M}/e7_repaint_rorosrod.png'),
    'e2_for': b64(f'{M}/orig_e2.jpg'),
    'e2_hvit': b64(f'{M}/e2_repaint_hvit.png'),
    'e2_visjon': b64(f'{SP}/matrix/../finn9/../matrix/e2_refresh_antrasitt.png'.replace('/matrix/../finn9/../matrix','/matrix')),
    'upload_eks': b64(f'{M}/orig_e11.jpg', w=420),
}

tokens = open('/home/user/Claude/fasade/design/tokens.css').read()

html = f'''<title>Vøling — Prototype (Bucket 3)</title>
<style>
{tokens}
* {{ box-sizing: border-box; }}
body {{ margin:0; background:var(--paper); color:var(--ink); font:var(--fs-body)/1.6 var(--font); -webkit-font-smoothing:antialiased; }}
.wrap {{ max-width:var(--maxw); margin:0 auto; padding:0 20px; }}

/* logo (A13: retning 1 i ren CSS/SVG) */
.logo {{ font-weight:600; font-size:24px; letter-spacing:-0.02em; color:var(--gran); text-decoration:none; }}
.logo .o {{ position:relative; display:inline-block; }}
.logo .o::after {{ content:""; position:absolute; left:-14%; top:52%; width:128%; height:2.5px; background:var(--gran); transform:rotate(-38deg); border-radius:2px; }}
.logo .o span {{ visibility:hidden; }}
.logo .o::before {{ content:"o"; position:absolute; left:0; }}

nav {{ display:flex; align-items:center; justify-content:space-between; padding:20px 0; border-bottom:1px solid var(--line); }}
nav .links {{ display:flex; gap:26px; align-items:center; font-size:15px; }}
nav a {{ color:var(--ink); text-decoration:none; }}
.btn {{ display:inline-block; background:var(--gran); color:#fff; padding:11px 22px; border-radius:var(--radius); text-decoration:none; font-weight:600; font-size:15px; border:none; cursor:pointer; }}
.btn:hover {{ background:var(--gran-hover); }}
.btn.ghost {{ background:transparent; color:var(--gran); border:1.5px solid var(--gran); }}
.eyebrow {{ font-size:12px; letter-spacing:var(--track-label); text-transform:uppercase; color:var(--muted); }}

/* skjerm-faner */
.tabs {{ position:sticky; top:0; z-index:9; background:var(--paper); display:flex; gap:8px; padding:12px 20px; border-bottom:1px solid var(--line); overflow-x:auto; }}
.tabs button {{ font:600 13px/1 var(--font); letter-spacing:.04em; padding:9px 16px; border-radius:999px; border:1px solid var(--line); background:var(--card); color:var(--ink); cursor:pointer; white-space:nowrap; }}
.tabs button.active {{ background:var(--gran); color:#fff; border-color:var(--gran); }}
.screen {{ display:none; }}
.screen.active {{ display:block; }}
.mocklabel {{ text-align:center; font-size:12px; letter-spacing:var(--track-label); text-transform:uppercase; color:var(--muted); padding:14px 0 2px; }}

/* hero */
.hero {{ display:grid; grid-template-columns:1fr 1fr; gap:44px; align-items:center; padding:64px 0; }}
.hero h1 {{ font-size:var(--fs-display); line-height:1.05; letter-spacing:-0.025em; font-weight:600; margin:0 0 18px; text-wrap:balance; }}
.hero p.lede {{ color:var(--muted); font-size:18px; margin:0 0 28px; max-width:46ch; }}
.trust {{ display:flex; gap:18px; margin-top:22px; font-size:13px; color:var(--muted); flex-wrap:wrap; }}
.trust span::before {{ content:"✓ "; color:var(--gran); }}
@media (max-width:860px) {{ .hero {{ grid-template-columns:1fr; }} }}

/* slider-komponent */
.cmp {{ position:relative; aspect-ratio:4/3; overflow:hidden; border-radius:var(--radius); background:var(--line); touch-action:pan-y; box-shadow:0 8px 40px rgba(20,18,12,.10); }}
.cmp img {{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }}
.cmp .beforeWrap {{ position:absolute; inset:0; clip-path:inset(0 calc(100% - var(--pos,50%)) 0 0); }}
.cmp .divider {{ position:absolute; top:0; bottom:0; left:var(--pos,50%); width:2px; background:#fff; box-shadow:0 0 8px rgba(0,0,0,.4); }}
.cmp .handle {{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:34px; height:34px; border-radius:50%; background:#fff; box-shadow:0 1px 6px rgba(0,0,0,.3); }}
.cmp .taglabel {{ position:absolute; top:12px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; background:rgba(20,20,18,.55); color:#fff; padding:3px 9px; border-radius:999px; }}
.cmp .tl-l {{ left:12px; }} .cmp .tl-r {{ right:12px; }}
.cmp input[type=range] {{ position:absolute; inset:0; width:100%; height:100%; margin:0; opacity:0; cursor:ew-resize; }}

/* seksjoner */
section.block {{ padding:56px 0; border-top:1px solid var(--line); }}
h2 {{ font-size:var(--fs-h2); font-weight:600; letter-spacing:-0.01em; margin:0 0 24px; }}
.steps {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; }}
.step {{ background:var(--card); border:1px solid var(--line); border-radius:var(--radius); padding:22px; }}
.step b {{ display:block; margin-bottom:6px; }}
.step .n {{ color:var(--gran); font-weight:600; }}

/* priser */
.prices {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:20px; }}
.price {{ background:var(--card); border:1px solid var(--line); border-radius:var(--radius); padding:26px; display:flex; flex-direction:column; gap:8px; }}
.price.feat {{ border-color:var(--gran); box-shadow:0 6px 30px rgba(46,74,59,.12); }}
.price .amount {{ font-size:32px; font-weight:600; letter-spacing:-0.02em; }}
.price .amount small {{ font-size:14px; color:var(--muted); font-weight:400; }}
.price ul {{ margin:6px 0 14px; padding-left:18px; color:var(--muted); font-size:14.5px; }}
.price .btn {{ margin-top:auto; text-align:center; }}

/* upload */
.drop {{ border:2px dashed var(--line); border-radius:var(--radius); padding:60px 24px; text-align:center; background:var(--card); margin:36px 0 20px; }}
.drop b {{ color:var(--gran); }}
.tips {{ display:flex; gap:16px; flex-wrap:wrap; color:var(--muted); font-size:14px; }}
.analyse {{ margin-top:28px; background:var(--gran-lys); color:var(--gran-ink); border-radius:var(--radius); padding:18px 22px; font-size:15px; }}

/* nivåer */
.nivaer {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:18px; margin-top:30px; }}
.niva {{ background:var(--card); border:1.5px solid var(--line); border-radius:var(--radius); padding:22px; cursor:pointer; }}
.niva.valgt {{ border-color:var(--gran); background:var(--gran-lys); }}
.niva h3 {{ margin:2px 0 8px; font-size:17px; }}
.niva .num {{ font-size:12px; letter-spacing:var(--track-label); color:var(--muted); text-transform:uppercase; }}
.niva p {{ font-size:14px; color:var(--muted); margin:0 0 10px; }}
.niva .tag {{ font-size:12px; background:var(--gran-lys); color:var(--gran-ink); border-radius:999px; padding:3px 10px; }}
.niva.valgt .tag {{ background:var(--card); }}
.hint {{ margin-top:22px; background:var(--varsel-bg); color:var(--varsel-ink); border-radius:var(--radius); padding:14px 18px; font-size:14px; }}

/* resultat */
.resgrid {{ display:grid; grid-template-columns:1.5fr 1fr; gap:28px; align-items:start; padding-top:36px; }}
@media (max-width:860px) {{ .resgrid {{ grid-template-columns:1fr; }} }}
.kort {{ background:var(--card); border:1px solid var(--line); border-radius:var(--radius); padding:22px; margin-bottom:18px; }}
.kort h3 {{ margin:0 0 10px; font-size:16px; }}
.swatches {{ display:flex; gap:10px; margin:12px 0; }}
.sw {{ width:44px; height:44px; border-radius:6px; border:1px solid var(--line); }}
.kost td {{ padding:6px 0; font-size:14.5px; }}
.kost td:last-child {{ text-align:right; font-variant-numeric:tabular-nums; white-space:nowrap; }}
.kost tr.sum td {{ border-top:1px solid var(--line); font-weight:600; }}
.illu {{ font-size:12px; color:var(--muted); margin-top:10px; }}
footer {{ border-top:1px solid var(--line); margin-top:60px; padding:28px 0; color:var(--muted); font-size:13.5px; }}
</style>

<div class="tabs" role="tablist">
  <button class="active" data-s="s1">1 · Forside</button>
  <button data-s="s2">2 · Last opp</button>
  <button data-s="s3">3 · Velg nivå</button>
  <button data-s="s4">4 · Resultat</button>
</div>

<!-- SKJERM 1: FORSIDE -->
<div class="screen active" id="s1">
<div class="wrap">
  <nav>
    <a class="logo" href="#">v<span class="o"><span>o</span></span>ling</a>
    <div class="links"><a href="#">Slik virker det</a><a href="#">Priser</a><a class="btn" href="#">Prøv gratis</a></div>
  </nav>
  <div class="hero">
    <div>
      <span class="eyebrow">Visualiser før du pusser opp</span>
      <h1>Se huset ditt i ny drakt — før du løfter en pensel.</h1>
      <p class="lede">Last opp ett bilde. Velg hvor langt du vil gå — fra ny farge til full forvandling. Fotorealistisk svar på sekunder.</p>
      <a class="btn" href="#">Prøv gratis — ny farge på 2 sekunder</a>
      <div class="trust"><span>Geometri kontrollert</span><span>Norske farger</span><span>Grovt kostnadsestimat inkludert</span></div>
    </div>
    <div class="cmp" style="--pos:50%">
      <img src="{imgs['e7_rod']}" alt="Etter">
      <div class="beforeWrap"><img src="{imgs['e7_for']}" alt="Før"></div>
      <div class="divider"><span class="handle"></span></div>
      <span class="taglabel tl-l">Før</span><span class="taglabel tl-r">Etter</span>
      <input type="range" min="0" max="100" value="50" aria-label="Sammenlign før og etter">
    </div>
  </div>
  <section class="block">
    <h2>Slik virker det</h2>
    <div class="steps">
      <div class="step"><span class="n">01</span><b>Last opp et bilde</b>Ett bilde av fasaden holder. Eller lim inn en finn-annonse.</div>
      <div class="step"><span class="n">02</span><b>Velg nivå</b>Fra kun ny farge til arkitektonisk visjon — du styrer hvor langt vi går.</div>
      <div class="step"><span class="n">03</span><b>Se, sammenlign, planlegg</b>Før/etter-glidebryter, fargeforslag med begrunnelse og grovt prisestimat.</div>
    </div>
  </section>
  <section class="block">
    <h2>Priser</h2>
    <div class="prices">
      <div class="price"><span class="eyebrow">Gratis</span><span class="amount">0 kr</span>
        <ul><li>3 fargebytter (nivå 1)</li><li>Svar på sekunder</li><li>Ingen konto nødvendig</li></ul>
        <a class="btn ghost" href="#">Prøv nå</a></div>
      <div class="price feat"><span class="eyebrow">Boligjakt</span><span class="amount">99 kr<small>/mnd</small></span>
        <ul><li>Ubegrenset fargebytte</li><li>15 AI-renders per måned</li><li>Perfekt mens du er på visning</li><li>Avslutt når du vil</li></ul>
        <a class="btn" href="#">Start jakten</a></div>
      <div class="price"><span class="eyebrow">Prosjekt</span><span class="amount">399 kr</span>
        <ul><li>Hele nivåstigen for din bolig</li><li>Fargerapport med begrunnelse</li><li>Grovt kostnadsestimat</li><li>Del med håndverker</li></ul>
        <a class="btn ghost" href="#">Start prosjekt</a></div>
    </div>
  </section>
  <footer>© Vøling · Alle bilder er visualiseringer (illustrasjon) · Tiltak kan være søknadspliktige</footer>
</div>
</div>

<!-- SKJERM 2: LAST OPP -->
<div class="screen" id="s2">
<div class="wrap">
  <nav><a class="logo" href="#">v<span class="o"><span>o</span></span>ling</a><div class="links"><span class="eyebrow">Steg 1 av 3</span></div></nav>
  <section style="padding:48px 0">
    <h1 style="font-size:34px; letter-spacing:-0.02em; font-weight:600; margin:0">Last opp et bilde av boligen</h1>
    <div class="drop"><p style="margin:0 0 8px"><b>Slipp bildet her</b> eller trykk for å velge</p><p style="margin:0;color:var(--muted);font-size:14px">JPG/PNG/HEIC · også lenke til finn-annonse</p></div>
    <div class="tips"><span>📐 Hele fasaden i bildet</span><span>☀️ Dagslys funker best</span><span>📱 Mobilbilde er godt nok</span></div>
    <div class="analyse"><b>Analyserer …</b> To-etasjes enebolig · mørk stående trekledning · grå takstein · hvite vinduskarmer · stor plen. Klar for neste steg.</div>
    <div style="margin-top:26px"><a class="btn" href="#">Fortsett →</a></div>
  </section>
</div>
</div>

<!-- SKJERM 3: VELG NIVÅ -->
<div class="screen" id="s3">
<div class="wrap">
  <nav><a class="logo" href="#">v<span class="o"><span>o</span></span>ling</a><div class="links"><span class="eyebrow">Steg 2 av 3</span></div></nav>
  <section style="padding:48px 0">
    <h1 style="font-size:34px; letter-spacing:-0.02em; font-weight:600; margin:0 0 6px">Hvor langt vil du gå?</h1>
    <p style="color:var(--muted); margin:0">Én skala. Du bestemmer om huset skal beholdes eller forvandles.</p>
    <div class="nivaer">
      <div class="niva"><span class="num">Nivå 1</span><h3>Farge</h3><p>Kun ny farge på kledningen. Alt annet urørt — garantert.</p><span class="tag">Inkludert i gratis</span></div>
      <div class="niva valgt"><span class="num">Nivå 2</span><h3>Overflater</h3><p>Ny kledning, takflate, karmer og dører. Samme hus, nye materialer.</p><span class="tag">Boligjakt / Prosjekt</span></div>
      <div class="niva"><span class="num">Nivå 3</span><h3>Oppgradering</h3><p>Nye vinduer, inngang, platting og AI-optimalisert fargepalett. Samme grunnform.</p><span class="tag">Prosjekt</span></div>
      <div class="niva"><span class="num">Nivå 4</span><h3>Visjon</h3><p>Full arkitektonisk forvandling av boligen på samme tomt.</p><span class="tag">Prosjekt</span></div>
    </div>
    <div class="hint">Nivå 3–4 kan inneholde tiltak som er søknadspliktige. Alle bilder er visualiseringer.</div>
    <div style="margin-top:26px"><a class="btn" href="#">Lag visualisering →</a></div>
  </section>
</div>
</div>

<!-- SKJERM 4: RESULTAT -->
<div class="screen" id="s4">
<div class="wrap">
  <nav><a class="logo" href="#">v<span class="o"><span>o</span></span>ling</a><div class="links"><span class="eyebrow">Steg 3 av 3 · Illustrasjon</span></div></nav>
  <div class="resgrid">
    <div>
      <div class="cmp" style="--pos:50%">
        <img src="{imgs['e2_hvit']}" alt="Etter: klassisk hvit">
        <div class="beforeWrap"><img src="{imgs['e2_for']}" alt="Før"></div>
        <div class="divider"><span class="handle"></span></div>
        <span class="taglabel tl-l">Før</span><span class="taglabel tl-r">Etter</span>
        <input type="range" min="0" max="100" value="50" aria-label="Sammenlign før og etter">
      </div>
      <p class="illu">Illustrasjon · Geometri kontrollert ✓ · Nivå 1: Farge</p>
    </div>
    <div>
      <div class="kort">
        <span class="eyebrow">Anbefalt palett</span>
        <h3>Klassisk hvit + beholdt teglrødt tak</h3>
        <div class="swatches"><div class="sw" style="background:#EFEDE6"></div><div class="sw" style="background:#8A5D45"></div><div class="sw" style="background:#3E3C38"></div><div class="sw" style="background:#2E4A3B"></div></div>
        <p style="font-size:14.5px;color:var(--muted);margin:0">Hvorfor: Åpen tomt med fjordlys — hvit kledning løfter huset mot den grønne hagen og matcher nabolagets lyse palett, mens brun takstein beholdes som varm kontrast.</p>
      </div>
      <div class="kort">
        <span class="eyebrow">Grovt kostnadsestimat</span>
        <table class="kost" style="width:100%; border-collapse:collapse">
          <tr><td>Maling av kledning (~180 m²)</td><td>60–120 000 kr</td></tr>
          <tr><td>Maling av garasje</td><td>15–30 000 kr</td></tr>
          <tr class="sum"><td>Totalt</td><td>75–150 000 kr</td></tr>
        </table>
        <p class="illu">Grovt estimat basert på typiske håndverkerpriser. Ikke et tilbud.</p>
      </div>
      <a class="btn" href="#" style="width:100%; text-align:center">Få tilbud fra malere i nærheten</a>
      <a class="btn ghost" href="#" style="width:100%; text-align:center; margin-top:10px">Last ned bilder</a>
    </div>
  </div>
  <footer>© Vøling · Alle bilder er visualiseringer (illustrasjon)</footer>
</div>
</div>

<script>
document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => {{
  document.querySelectorAll('.tabs button').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.screen').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  document.getElementById(b.dataset.s).classList.add('active');
  window.scrollTo(0, 0);
}}));
document.querySelectorAll('.cmp').forEach(c => {{
  const r = c.querySelector('input[type=range]');
  r.addEventListener('input', () => c.style.setProperty('--pos', r.value + '%'));
}});
document.querySelectorAll('.niva').forEach(n => n.addEventListener('click', () => {{
  n.parentElement.querySelectorAll('.niva').forEach(x => x.classList.remove('valgt'));
  n.classList.add('valgt');
}}));
</script>
'''
out = os.path.join(D, 'voling_prototype.html')
open(out, 'w').write(html)
print(out, len(html)//1024, 'KB')
