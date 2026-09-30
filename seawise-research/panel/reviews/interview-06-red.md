# Red team: 15-minute phone interview guide (`08-telefonintervju-15min.md`)

**Reviewer:** Red team
**Date:** 30 Sept 2026

**Verdict:** the structure is good. It asks about the past, it has a note template, and the class question is in it.

**But:**
- the guide will produce **false positives**,
- it has **two built-in pitch traps**,
- it asks the **most sensitive question (cost) in minute 2**,
- it leaves **four of the plan's riskiest assumptions untested**: switching mid-contract, trust in a 2-person supplier, offline needs, and willingness to commit.

Fixes below are in bokmål, ready to paste.

---

## 1. False positives: where polite yeses come from

| Source | Why it fails | Fix |
|---|---|---|
| Closing line «Kan jeg komme tilbake om noen uker og vise hva vi har lært?» | Nobody in Norway says no to this. It measures politeness, not interest. It also books a demo, which is pitching by another name | Ask for a **commitment that costs them something** (time with others, an introduction, data). See §5 |
| Friendly-network bias | Arne's followers and Herøy contacts are warmer than the market. Their answers will overstate pain and openness | Add "kjenner Arne personlig (ja/nei)" to the notes, and **report the two groups separately** on the Friday scoreboard. Gate 1 needs at least 50% strangers |
| No signal scoring | «Spennende!» ends up in the CRM as a lead | Score each call 0–4 (see the note template). Only a score of 3–4 counts toward the kill rule and Gate 1 |
| Interviewing only one role | A technical manager's pain ≠ the owner's budget | Record the role, and require all three DMU levels per segment before Gate 1 |

## 2. Where Arne will slip into pitching

1. **The opening line.** «Jeg selger ingenting i dag» is the same problem as «ingen salgspitch»: it announces a sale, and "i dag" suggests one tomorrow. Replace it with:
   > «Takk for at du tar deg tid. Jeg prøver å forstå hvordan rederier som dere jobber med vedlikehold og klasse – du er ekspert på deres drift, ikke jeg. Går det greit at jeg noterer?»
2. **When they describe a pain.** An engineer's reflex is «det har vi faktisk laget!». Hard rule: never answer a pain with a solution. Answer:
   > «Hvordan løser dere det i dag?» / «Hva har dere prøvd?»
3. **When they ask «Hva er det dere lager?»**. Have one scripted sentence, then hand the conversation back:
   > «Et vedlikeholds- og samsvarsverktøy – men vi har ikke bestemt hva det skal være ennå, det er derfor jeg ringer. Hvordan …» *(back to the next question)*
4. **Demo trap.** No screen-sharing and no link in the first call. If they ask to see it: «Gjerne – skal vi sette av 30 min med deg og [teknisk sjef/daglig leder] om to uker?» That turns the demo into a commitment test.

## 3. Questions Norwegians will dodge

| Question | Why they dodge it | Replacement (bokmål) |
|---|---|---|
| Cost in minute 2: «Omtrent hva koster det per fartøy i året?» | It is too early and too direct. Prices are often confidential under the vendor contract, and the question makes a stranger sound like a seller | Move it to **after** the switching question, and ask with ranges and contract form: «Er det lisens per fartøy eller en rammeavtale? Grovt sett – under 50 000, 50–150 000 eller over 150 000 per fartøy i året?» plus «Når løper avtalen ut?» |
| «Siste gang noe gikk galt» | People downplay their own mistakes, and admitting an audit finding feels like losing face | Normalise it and use a neutral trigger: «Sist klassen eller Sdir var om bord – hva gikk mesteparten av tiden til i uka før?» and «Hva pleier de å ta tak i hos dere?» |
| Criticism of the current vendor | PreMaster is from Ålesund. People know each other, and speaking ill of a local vendor feels disloyal | Ask about workarounds, not the vendor: «Hva gjør dere utenfor systemet – Excel, perm, egne lister?» Workarounds are pain, without anyone having to criticise |
| Budget and decision-maker | The CEO won't reveal internal politics to a stranger | «Sist dere kjøpte et nytt system om bord – hvordan gikk det for seg, og hvem var med?» (asks about the past, not the organisation chart) |

## 4. Plan assumptions the guide does not test (add these)

The guide has **5 core questions in 10 minutes**, which is already tight, so these replace or merge rather than add to it. Use one variant for the CEO and one for the technical manager.

| Assumption (PLAN/20-synthesis) | Missing question (bokmål) |
|---|---|
| **Switching mid-contract / migration** (the importer is "the #1 sales weapon") | «Hvis dere skulle bytte, hva ville vært det verste med å flytte historikken? Hvor mange år med data har dere i systemet?» + «Når løper avtalen ut?» |
| **Trust in a 2-person supplier** | «Sist dere valgte en systemleverandør – hva krevde dere av dem? Sikkerhet, størrelse, referanser?» + «Har dere noen gang brukt en liten leverandør til noe viktig? Hvordan gikk det?» |
| **Offline at sea** (M4 builds offline sign-off) | «Hvordan er nettet om bord – når var det sist en uke dere ikke fikk synket eller sendt noe?» |
| **Class arrangement (the Gate 1 census)** | Already in Q2. Make it answerable by adding: «…eller står dere på kontinuerlig maskinbesiktelse (CMS) eller PMS-ordning? Hvem hos dere vet det sikkert?» «Vet ikke» plus a name counts as an answer |
| **Price / willingness to pay** | Do **not** ask hypothetically («Hadde du betalt X?»). Test it through the current spend range (§3) + renewal date + the commitment ask (§5). Price-test only in meeting 2 |
| **Compliance tower vs PMS replacement** (review 06, E3) | «Hvis dere beholder dagens vedlikeholdssystem – hva følger dere opp i Excel ved siden av? Sertifikater, besiktelsesvinduer, avvik?» |

**Suggested new order for the core (10 min):**
1. System today and workarounds.
2. Class arrangement.
3. The last visit from class or Sdir: time and pain.
4. The last time they changed or considered changing systems, including migration and contract end date.
5. The last system purchase: who was involved, and what they demanded of the supplier (trust).
6. Spend range, only if the mood allows.

Offline and the CEO/technical-manager variants are one-line follow-ups.

## 5. The closing: from politeness to commitment

Replace «Kan jeg komme tilbake om noen uker og vise hva vi har lært?» with a sequence that goes up a level only as long as the answers are positive:
1. «Hvem andre bør jeg snakke med – her hos dere eller i andre rederier? Kan du sette meg i kontakt?» (a name plus an introduction = commitment)
2. «Kan vi sette av 30 min med deg og [teknisk sjef/daglig leder] om 2–3 uker, så viser jeg hva vi har funnet og hvordan vi tenker?» (time plus a decision-maker = strong signal)
3. For a technical manager with clear pain: «Kunne du sendt meg en anonymisert eksport eller liste over hva dere følger opp i Excel i dag?» (data = strong signal)

## 6. Changes to the note template

Add these rows:
- `Kjenner Arne personlig: ja / nei`
- `Rolle i DMU: bruker / velger / betaler`
- `Avtale løper ut (måned/år)` and `Spend-intervall: <50k / 50–150k / >150k per fartøy per år`
- `Tillitskrav til leverandør (sitat)`
- `Nett om bord: ok / periodevis / dårlig`
- `Signalstyrke 0–4`, where 0 = compliments only, 1 = information, 2 = named referral, 3 = introduction or meeting booked with a decision-maker, 4 = data shared / LOI / money. **Only 3–4 counts as a "commitment" under the kill rule** (together with PLAN edit E4, software commitments only).
- `Pitchet jeg? (ja/nei – vær ærlig)`, a self-check that Kristian reviews every Friday.

## 7. Other points

- **Record, don't just take notes.** Ask for permission to record: «Er det greit at jeg tar opp, kun til egne notater?». Claude produces a same-day summary, and Arne listens instead of writing.
- **Don't cite employer figures,** not even as "a trawler company I know". It is a duty-of-loyalty breach, and it reveals the source.
- **Stick to 15 minutes.** Say «jeg holder tiden» at the start. If they want to talk longer, that is a signal; note it.
