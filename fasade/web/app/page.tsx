'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Logo } from '@/components/Logo';
import { CompareSlider } from '@/components/CompareSlider';
import { StyleStrip } from '@/components/StyleStrip';
import { Waitlist } from '@/components/Waitlist';
import './landing.css';

/* Tegnet pil (§5.3) — aldri ikonfont. */
function Pil() {
  return (
    <svg className="pil" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function PilNed() {
  return (
    <svg className="pil" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 1v12M2 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* Nivåtekstene er IDENTISKE med nivåkortene i verkbenken (gjenkjennelse). */
const NIVAER = [
  { num: '01', navn: 'Farge', tekst: 'Ny farge på kledningen. Alt annet står urørt.', poeng: '1 poeng' },
  {
    num: '02',
    navn: 'Overflater',
    tekst: 'Ny kledning, nytt tak og nye lister. Huset beholder formen.',
    poeng: '1 poeng',
  },
  {
    num: '03',
    navn: 'Oppgradering',
    tekst: 'Nye vinduer, inngangsparti og beplantning. Huset er fortsatt seg selv.',
    poeng: '2 poeng',
  },
  {
    num: '04',
    navn: 'Visjon',
    tekst: 'Full arkitektonisk omtenkning. Se hva huset kunne vært.',
    poeng: '3 poeng',
  },
];

export default function Landing() {
  const navRef = useRef<HTMLElement | null>(null);
  const heroCtaRef = useRef<HTMLAnchorElement | null>(null);
  const bandRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // html.js porter skjult-starttilstanden for .avsloring (no-JS-fallback: alt synlig)
    document.documentElement.classList.add('js');

    const nav = navRef.current;
    const onScroll = () => nav?.classList.toggle('skrollet', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // scroll-avsløring (§6.2): threshold .15, unobserve etter fyring, 60ms stagger
    const avslor = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = `${i * 60}ms`;
            el.classList.add('synlig');
            el.addEventListener(
              'transitionend',
              () => {
                el.style.transitionDelay = '';
              },
              { once: true },
            );
            avslor.unobserve(el);
          });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll('.avsloring').forEach((el) => avslor.observe(el));

    // klistre-CTA: vises når hero-CTA forlater viewport, skjules når båndet entrer
    const strip = stripRef.current;
    const heroCta = heroCtaRef.current;
    const band = bandRef.current;
    let heroSynlig = true;
    let bandSynlig = false;
    const stripe = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroCta) heroSynlig = e.isIntersecting;
        if (e.target === band) bandSynlig = e.isIntersecting;
      }
      strip?.classList.toggle('synlig', !heroSynlig && !bandSynlig);
    });
    if (heroCta) stripe.observe(heroCta);
    if (band) stripe.observe(band);

    return () => {
      window.removeEventListener('scroll', onScroll);
      avslor.disconnect();
      stripe.disconnect();
    };
  }, []);

  return (
    <>
      <div className="wrap">
        <nav className="site" ref={navRef}>
          <Logo />
          <div className="links">
            <a href="#stiler">Stiler</a>
            <a href="#slik">Slik virker det</a>
            <a href="#priser">Priser</a>
            <Link className="btn" href="/ny">
              Prøv gratis
            </Link>
          </div>
        </nav>

        {/* 2. Hero — tekst kol 1–5, skyveren er bevisobjektet kol 6–12 */}
        <div className="hero">
          <div>
            <span className="seklabel">Gratis beta · Norsk boligvisualisering</span>
            <h1 className="display">
              Se huset ditt <span className="marker">ferdig</span> oppusset, før du begynner.
            </h1>
            <p className="lede">
              Last opp ett bilde av boligen. Vøling viser fasaden i ny farge, ny kledning — eller
              som noe helt nytt. Ferdig på et par minutter.
            </p>
            <div className="hero-cta">
              <Link className="btn stor" href="/ny" ref={heroCtaRef}>
                Prøv med ditt eget bilde <Pil />
              </Link>
              <a className="tekstlenke" href="#stiler">
                …eller se stilene først <PilNed />
              </a>
            </div>
          </div>
          <div className="hero-bilde">
            <CompareSlider before="/styles/base.jpg" after="/styles/sort-minimalisme.jpg" />
            <p className="illu">
              Sort minimalisme — generert av Vøling fra originalfotoet. Dra i linjen.
            </p>
          </div>
          <div className="trust">
            <span>Uten konto</span>
            <span>10 gratis poeng hver dag</span>
            <span>Klart på 1–2 minutter</span>
          </div>
        </div>

        {/* 3. Tallrekke — bare produktfakta; aldri tall vi ikke måler */}
        <div className="tallrekke">
          <div className="avsloring">
            <span className="seklabel">Nivåer</span>
            <span className="tallverdi">4</span>
          </div>
          <div className="avsloring">
            <span className="seklabel">Stiler for norske hus</span>
            <span className="tallverdi">7</span>
          </div>
          <div className="avsloring">
            <span className="seklabel">Geometri</span>
            <span className="tallverdi">Beste av 3</span>
          </div>
          <div className="avsloring">
            <span className="seklabel">Pris i beta</span>
            <span className="tallverdi">0 kr · 10 poeng/dag</span>
          </div>
        </div>

        {/* 4. Stiler */}
        <section className="sek" id="stiler">
          <span className="seklabel avsloring">
            <span className="nr">01</span> <span className="skra">/</span> Stiler
          </span>
          <div>
            <h2 className="sekttl avsloring">Syv stiler som kler norske hus.</h2>
            <p className="blokklede avsloring">
              Kuratert for norsk byggeskikk og norsk lys, fra sørlandshvit til sort minimalisme.
            </p>
            <div className="avsloring">
              <StyleStrip tryHref={(id) => `/ny?stil=${id}`} />
            </div>
            <div className="stripefot avsloring">
              <p className="illu">Alle bildene er generert av Vøling på samme hus.</p>
              <Link className="tekstlenke" href="/ny">
                Prøv en stil på ditt hus <Pil />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Nivåer */}
        <section className="sek">
          <span className="seklabel avsloring">
            <span className="nr">02</span> <span className="skra">/</span> Nivåer
          </span>
          <div>
            <h2 className="sekttl avsloring">Fire nivåer. Du bestemmer hvor langt du vil gå.</h2>
            <div className="niva-grid">
              {NIVAER.map((n) => (
                <div className="niva statisk avsloring" key={n.navn}>
                  <span className="num">{n.num}</span>
                  <h3>{n.navn}</h3>
                  <p>{n.tekst}</p>
                  <span className="tag">{n.poeng}</span>
                </div>
              ))}
            </div>
            <p className="illu avsloring">
              Poeng er dagskvoten i gratis-betaen. En render koster nivåets vekt. Kvoten
              nullstilles hver dag.
            </p>
          </div>
        </section>

        {/* 6. Slik virker det */}
        <section className="sek" id="slik">
          <span className="seklabel avsloring">
            <span className="nr">03</span> <span className="skra">/</span> Slik virker det
          </span>
          <div>
            <h2 className="sekttl avsloring">Tre steg. Ferdig på et par minutter.</h2>
            <div className="radliste">
              <div className="rad avsloring">
                <span className="radnr">01</span>
                <b>Last opp ett bilde</b>
                <p>Ta bildet rett forfra i dagslys. Eller prøv eksempelhuset først.</p>
              </div>
              <div className="rad avsloring">
                <span className="radnr">02</span>
                <b>Velg nivå og stil</b>
                <p>Fra forsiktig ny farge til full visjon. Skriv egne ønsker om du vil.</p>
              </div>
              <div className="rad avsloring">
                <span className="radnr">03</span>
                <b>Sammenlign og juster</b>
                <p>
                  Dra i før/etter-skyveren, og be om endringer til det sitter: ‘mal den rød’,
                  ‘fjern hekken’.
                </p>
              </div>
            </div>
            <div className="cta-par avsloring">
              <Link className="btn stor" href="/ny">
                Start med ditt bilde <Pil />
              </Link>
              <Link className="btn ghost" href="/ny">
                Prøv eksempelhuset
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Ærlighet — beviselig mekanikk i stedet for testimonials */}
        <section className="sek">
          <span className="seklabel avsloring">
            <span className="nr">04</span> <span className="skra">/</span> Ærlighet
          </span>
          <div>
            <h2 className="sekttl avsloring">Ærlige bilder. Ærlige tall.</h2>
            <div className="soyler">
              <div className="soyle avsloring">
                <b>Geometri rangert.</b>
                <p>
                  På nivå 1–2 genererer vi tre kandidater og måler hver mot originalfotoet. Du får
                  den som ligner mest på huset ditt.
                </p>
              </div>
              <div className="soyle avsloring">
                <b>Alltid merket illustrasjon.</b>
                <p>
                  Alt Vøling lager er visualisering, samme spilleregler som prospektet fra
                  megleren. Kostnadstall er grove estimater, ikke tilbud.
                </p>
              </div>
              <div className="soyle avsloring">
                <b>Ingen sporing.</b>
                <p>Ingen konto, ingen cookies for annonser. Vi teller sidevisninger, ikke noe mer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Priser */}
        <section className="sek" id="priser">
          <span className="seklabel avsloring">
            <span className="nr">05</span> <span className="skra">/</span> Priser
          </span>
          <div>
            <h2 className="sekttl avsloring">Gratis nå. Ryddig prising når betaling åpner.</h2>
            <p className="blokklede avsloring">
              Betaen er åpen og gratis. Prisene under er planen, ikke en overraskelse som kommer
              senere.
            </p>
            <div className="prices">
              <div className="price avsloring">
                <span className="seklabel">Beta</span>
                <span className="amount">
                  0 kr<small>/i dag</small>
                </span>
                <p className="malgruppe">Alt du trenger for å prøve.</p>
                <ul>
                  <li>10 poeng hver dag</li>
                  <li>Alle fire nivåer</li>
                  <li>Alle stiler</li>
                  <li>Før/etter-deling</li>
                  <li>Grovt kostnadsestimat</li>
                </ul>
                <Link className="btn w100" href="/ny">
                  Kom i gang <Pil />
                </Link>
              </div>
              <div className="price avsloring">
                <span className="seklabel">Boligjakt</span>
                <span className="amount">
                  99 kr<small>/mnd</small>
                </span>
                <p className="malgruppe">For deg som ser på boliger.</p>
                <ul>
                  <li>Ubegrenset nivå 1</li>
                  <li>Månedlig renderkvote</li>
                  <li>Visualiser boliger fra annonser</li>
                  <li>Avslutt når du vil</li>
                </ul>
                <span className="btn ghost kommer w100">Kommer snart</span>
              </div>
              <div className="price feat avsloring">
                <span className="anbefalt">Anbefalt</span>
                <span className="seklabel">Prosjekt</span>
                <span className="amount">
                  399 kr<small>/engangs</small>
                </span>
                <p className="malgruppe">For huset du eier.</p>
                <ul>
                  <li>Hele nivåstigen</li>
                  <li>Fargerapport</li>
                  <li>Kostnadsestimat</li>
                  <li>Full oppløsning på alle render</li>
                </ul>
                <span className="btn ghost kommer w100">Kommer snart</span>
              </div>
              <div className="price avsloring">
                <span className="seklabel">Proff</span>
                <span className="amount">Ta kontakt</span>
                <p className="malgruppe">For meglere og håndverkere.</p>
                <ul>
                  <li>Volum og API</li>
                  <li>Egne stiler</li>
                  <li>Prioritert kø</li>
                </ul>
                <span className="btn ghost kommer w100">Kommer senere</span>
              </div>
            </div>
            <p className="illu prisfot avsloring">
              Priser er veiledende til betaling åpner. Vipps og kort.
            </p>
          </div>
        </section>
      </div>

      {/* 9–10. Sluttappell + footer — det ENE fullbredde-aksentmomentet (gran-dyp) */}
      <div className="band" ref={bandRef}>
        <div className="wrap">
          <div className="band-innhold">
            <div className="band-tekst avsloring">
              <h2 className="sekttl">Huset ditt har flere muligheter enn du tror.</h2>
              <Link className="btn stor" href="/ny">
                Prøv gratis nå <Pil />
              </Link>
              <span className="seklabel band-mikro">
                Ett bilde · to minutter · ti gratis poeng hver dag
              </span>
            </div>
            <div className="band-bilder avsloring">
              <div className="fotoramme">
                <img src="/styles/base.jpg" alt="Huset før" />
                <span className="fototag">Før</span>
              </div>
              <div className="fotoramme">
                <img src="/styles/lys-skandinavisk.jpg" alt="Huset etter: lys skandinavisk" />
                <span className="fototag">Etter</span>
              </div>
            </div>
          </div>

          <div className="ventelinje avsloring">
            <span className="seklabel">Venteliste</span>
            <p>Få beskjed når betaling og full versjon åpner.</p>
            <Waitlist />
          </div>

          <footer className="site">
            <div className="footer-grid">
              <div className="fk-om">
                <Logo />
                <p>Vøling viser norske boliger hva de kan bli.</p>
              </div>
              <div className="fk-nav">
                <span className="seklabel">Navigasjon</span>
                <div className="footer-lenker">
                  <a href="#stiler">Stiler</a>
                  <a href="#slik">Slik virker det</a>
                  <a href="#priser">Priser</a>
                  <Link href="/ny">Nytt prosjekt</Link>
                </div>
              </div>
              <div className="fk-merknad">
                <span className="seklabel">Merknad</span>
                <div className="merknader">
                  <span>Alle bilder er illustrasjoner.</span>
                  <span>Tiltak kan være søknadspliktige. Sjekk med kommunen.</span>
                  <span>Personvern</span>
                </div>
              </div>
            </div>
            <div className="footer-bunn">
              <span>© 2026 Vøling · Bygget i Norge</span>
              <span>Gratis beta · 10 poeng per dag</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Klistre-CTA — kun mobil; observeren toggler .synlig */}
      <div className="klistre-cta" ref={stripRef}>
        <Link className="btn" href="/ny">
          Prøv gratis
        </Link>
        <span>10 poeng/dag · uten konto</span>
      </div>
    </>
  );
}
