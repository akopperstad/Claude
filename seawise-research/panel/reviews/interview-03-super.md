# Review of 08-telefonintervju-15min.md: the technical superintendent's view

## Verdict
The structure is sound: questions about the past, not opinions; priorities set; notes on the same day. But the technical questions are phrased the way an outsider would ask them. The guide also misses the four things that actually stop a switch:
- **history and migration**
- **how the PMS runs on board (offline and replication)**
- **how the chief engineer signs off jobs and enters running hours**
- **contract period and lock-in**

A technical manager will politely answer everything as it stands. You will come away knowing the price, but not why they won't switch.

## 1. Does it sound like the industry? Rewrites

| Today | Problem | Rewrite (bokmål) |
|---|---|---|
| Q2: «Har dere vedlikeholdet godkjent hos klassen, slik at klassen godtar det som del av besiktelsen?» | Nobody says it like that. The field terms are *PMS-ordning*, *CMS*, *kreditering* and *chiefen krediterer*. | «Går maskineriet på PMS-ordning hos klassen, der chiefen krediterer klasseposter, eller på CMS/vanlig fornyelse med surveyor til stede? Hvilket klasseselskap?» Follow-up if they're unsure: «Står PMS-notasjonen i klassesertifikatet/Veracity?» Log "vet ikke" as its own answer. |
| Q1: «vedlikehold og sertifikater … system, Excel eller papir?» | Mixes two things that often live in separate systems (PMS vs a certificate and survey overview in Excel or Veracity). | «Hvilket vedlikeholdssystem kjører dere om bord, og hvor lenge har dere hatt det? Og sertifikat- og besiktelsesoversikten – ligger den i samme system, eller i Excel/Veracity ved siden av?» |
| Q1b: cost "per fartøy i året" | OK, but technical managers often don't know the licence cost; purchasing or finance holds it. | «Vet du omtrent hva lisensen koster per skip i året – eller hvem hos dere sitter på den fakturaen?» |
| Q3: «siste gang noe … gikk galt» | Nobody admits a failure to a stranger. Ask about work, not errors. | «Tenk på siste årlige klassebesøk eller ISM-revisjon (for <500 BT: Sdir-revisjon av sikkerhetsstyringen). Hva tok mest tid å få klart, og hva måtte dere hente utenfor PMS-en?» Follow-up: «Fikk dere avvik eller pålegg på vedlikehold eller kritisk utstyr?» |
| Opening: «Jeg selger ingenting i dag» | The panel already dropped "ingen salgspitch". This is the same thing and makes the listener brace for a pitch. | «Takk for at du tar deg tid. Jeg er maskinsjef selv, og vil forstå hvordan teknisk avdeling hos dere jobber. Greit at jeg noterer?» |
| Loose terms | — | Use *fornyelse*, *årlig*, *mellombesiktelse*, *dokking*, *forfalte/utestående jobber*, *utsettelse*, *gangtimer*, *komponenttre/SFI*, *kritisk utstyr*, *DOC/SMC-revisjon*. Avoid *plattform*, *løsning* and *digitalisering*. |

## 2. The technical questions that reveal switching barriers
Replace Q4 ("when did you last consider switching") with these. Ask **two or three** of them, depending on the answers.

1. **History and migration:** «Hvor mange års historikk ligger i PMS-en, og hvem bygde komponenttreet og jobbene – verftet, leverandøren eller dere selv? Hvor mange jobber per skip, omtrent?»
   This reveals how much work migration would be, and whether they trust their own data.
2. **On board and offline:** «Kjører PMS-en lokalt om bord med replikering til land, eller i nettleseren? Hva gjør maskinistene når samband er nede?»
   This reveals whether a web-only product is dead on arrival for this customer.
3. **The chief engineer's workflow:** «Hvordan kvitterer maskinistene ut en jobb i praksis – PC i kontrollrommet, nettbrett, eller papir som føres inn senere? Hvem godkjenner utsettelse av forfalte jobber?»
   This reveals usability pain and approval flow, which is where Seawise can win.
4. **Running hours:** «Hvordan kommer gangtimene inn – føres de manuelt, hvor ofte, eller hentes de fra automasjonen?»
   This reveals an integration opportunity and the data quality you would inherit.
5. **Lock-in:** «Hvordan er avtalen med dagens leverandør – bindingstid, oppsigelse, og får dere ut alle data hvis dere går?»
   This reveals when a switch is possible at all, which is a date for the CRM.
6. **Last switch (keep a short version of today's Q4):** «Sist dere byttet system – hvor lang tid tok det før det var i drift på alle skip, og hva var verst?»
   This gives you real migration pain in the customer's own words.

## 3. What a technical manager would find naive
- **Treating class approval as a yes/no about "maintenance".** Separate PMS-ordning, CMS and type approval of the software. This matters for the M10 decision.
- **Not distinguishing ISM ≥500 GT (DOC/SMC) from Sdir small-vessel audits under 500 GT.** Wellboat, offshore and short-sea are mostly ≥500 GT, so say "ISM-revisjon".
- **Asking for "hva det kostet" in money before trust is built.** Ask in hours and findings instead; money comes later.
- **Five core questions in 10 minutes, with no technical depth.** Better: 3 core questions (system, class arrangement, last class visit/audit) plus 2–3 barrier questions, chosen from the answers.
- **Asking the CEO technical questions.** For owners, change the questions: «Hva er dyrest med vedlikehold i dag – lisenser, timer på kontoret, eller off-hire når noe glipper?» and «Hvem i teknisk avdeling bør jeg snakke med?»
- **Offering to «vise hva vi har lært» without a date.** Say «Kan jeg ringe deg om tre uker med oppsummeringen?»

## 4. Additional fields for the note template
- PMS-ordning / CMS / vet ikke, and the class society
- Onboard setup: local + replication / web / paper
- Years of history, jobs per vessel (rough)
- How running hours are captured
- Contract period / notice period
- Who approves deferrals
