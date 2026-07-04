# FINN+ — konseptprototype

Klikkbar prototype som viser hvordan FINN.no kan tilby et premium-medlemskap
(«FINN+», 99 kr/mnd) på tvers av Eiendom og Bil. Bygget for å pitche konseptet
til FINN/Schibsted — enten som pilot internt eller som oppkjøp av konsept og
team.

> Konseptdemonstrasjon. Ikke tilknyttet FINN.no / Schibsted. All data er mock.

## Kom i gang

```bash
npm install
npm run dev        # http://localhost:3000
```

Produksjonsbygg: `npm run build && npm run start`.

## Demo-manus (5 minutter)

Bruk **demobryteren nede til venstre** («Fri bruker» / «FINN+ medlem») —
den er selve pitch-verktøyet.

1. **Forsiden som fri bruker** — ser ut som FINN i dag. Merk teaser-kortene
   øverst: «Ny annonse — FINN+ medlemmer ser den nå».
2. **Åpne `/eiendom`** — flere låste kort med nedtelling. Klikk ett →
   oppsalgsvegg («Denne annonsen er i tidlig tilgang»).
3. **Flipp bryteren til FINN+ medlem** — samme side, nå med prisjakt-chips på
   hvert kort (over/under markedsverdi) og lilla «Tidlig tilgang»-chips.
   Dette er hele verdiforslaget i ett skjermbilde.
4. **Åpne en annonse** (f.eks. Grünerløkka-leiligheten) — «Prisinnsikt» med
   verdivurdering, 12-måneders prisgraf (hover for verdier) og nylig solgte
   sammenlignbare.
5. **`/selger` (Mine annonser)** — annonsestatistikk og «Boost nå»:
   plassering hopper fra #16 til #2, +180 % visninger projisert i grafen.
6. **`/plus`** — medlemssiden med pris og fordeler. Vis at «Bli medlem»
   fungerer.
7. **Avslutt på `/pitch`** — forretningscasen: betalingsvilje per funksjon og
   ARR-scenarier (14,9–89,1 mill. kr).

## Deling / deploy

### GitHub Pages (automatisk)

Workflowen `.github/workflows/deploy-pages.yml` bygger en statisk eksport og
publiserer den ved hver push. Engangsoppsett: repoets **Settings → Pages →
Source: «GitHub Actions»**. URL: `https://akopperstad.github.io/Claude/`.

Appen er full statisk eksport (`output: "export"`); `BASE_PATH=/Claude`
settes av workflowen fordi Pages serverer fra en understi.

### Vercel (alternativ)

1. vercel.com → importer repoet → sett **Root Directory** til `finn-plus`
2. Eller CLI: `npm i -g vercel && vercel --prod` fra `finn-plus/`

Ingen miljøvariabler kreves — alt er statisk mock-data.

## Struktur

| Sti | Innhold |
|-----|---------|
| `app/` | Sider: forside, `/eiendom`, `/bil`, `/listing/[id]`, `/plus`, `/selger`, `/pitch` |
| `components/` | FINN-skall (Header, kort, søk) + FINN+-laget (PlusLock, DemoToggle, PriceInsight, ViewsChart …) |
| `lib/mock/` | 12 bolig- + 12 bilannonser |
| `lib/priceHistory.ts` | Deterministisk prishistorikk + sammenlignbare salg |
| `lib/earlyAccess.ts` | Frossen demo-klokke + 24-timersvindu |
| `lib/sellerStats.ts` | Deterministisk annonsestatistikk + boost-effekt |
| `public/listings/` | AI-genererte annonsebilder (`<id>.jpg`) |

Medlemsstatus lagres i `localStorage` (`finn-plus-member`) via
`PlusContext` — ingen backend.
