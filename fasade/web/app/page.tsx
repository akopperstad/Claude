import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { CompareSlider } from '@/components/CompareSlider';
import { StyleStrip } from '@/components/StyleStrip';
import { Waitlist } from '@/components/Waitlist';

export default function Landing() {
  return (
    <div className="wrap">
      <nav className="site">
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

      <div className="hero">
        <div>
          <span className="seklabel">Vøling · visualiser før du pusser opp</span>
          <h1 className="display">
            Se huset ditt i <span className="marker">ny drakt</span> — før du løfter en
            pensel.
          </h1>
          <p className="lede">
            Last opp ett bilde. Velg hvor langt du vil gå — fra ny farge til full
            forvandling. Fotorealistisk svar på sekunder.
          </p>
          <Link className="btn stor" href="/ny">
            Prøv gratis nå →
          </Link>
          <div className="trust">
            <span>Ærlig før/etter-sammenligning</span>
            <span>Norske farger</span>
            <span>Grovt kostnadsestimat inkludert</span>
          </div>
        </div>
        <CompareSlider before="/styles/base.jpg" after="/styles/sort-minimalisme.jpg" />
      </div>

      <section className="sek" id="stiler">
        <span className="seklabel">01 / Stiler</span>
        <div>
          <h2 className="sekttl">Én bolig. Syv retninger.</h2>
          <p className="blokklede">
            Samme hus, syv norske stiler. Trykk på et bilde for å se det stort.
          </p>
          <StyleStrip />
        </div>
      </section>

      <section className="sek" id="slik">
        <span className="seklabel">02 / Slik virker det</span>
        <div>
          <h2 className="sekttl">Tre steg. Ferdig på minutter.</h2>
          <div className="radliste">
            <div className="rad">
              <span className="radnr">01</span>
              <b>Last opp et bilde</b>
              <p>Ett bilde av fasaden holder. Mobilbilde er godt nok.</p>
            </div>
            <div className="rad">
              <span className="radnr">02</span>
              <b>Velg nivå og stil</b>
              <p>Fra kun ny farge til arkitektonisk visjon — du styrer hvor langt vi går.</p>
            </div>
            <div className="rad">
              <span className="radnr">03</span>
              <b>Se, juster, planlegg</b>
              <p>Før/etter-glidebryter, justér med egne ord, fargeforslag og grovt prisestimat.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sek" id="priser">
        <span className="seklabel">03 / Priser</span>
        <div>
          <h2 className="sekttl">Gratis i beta. Rimelig etterpå.</h2>
          <p className="blokklede">
            Betalte planer lanseres snart — med god margin under utenlandske alternativer.
          </p>
          <div className="prices">
            <div className="price">
              <span className="seklabel">Gratis beta</span>
              <span className="amount">0 kr</span>
              <ul>
                <li>10 poeng hver dag</li>
                <li>Alle fire nivåer</li>
                <li>Ingen konto nødvendig</li>
              </ul>
              <Link className="btn" href="/ny">
                Prøv nå
              </Link>
            </div>
            <div className="price">
              <span className="seklabel">Basis</span>
              <span className="amount">
                99 kr<small>/mnd</small>
              </span>
              <ul>
                <li>50 poeng per måned</li>
                <li>Perfekt til boligjakten</li>
                <li>Avslutt når du vil</li>
              </ul>
              <span className="btn ghost kommer">Kommer snart</span>
            </div>
            <div className="price feat">
              <span className="anbefalt">Anbefalt</span>
              <span className="seklabel">Pro</span>
              <span className="amount">
                199 kr<small>/mnd</small>
              </span>
              <ul>
                <li>150 poeng per måned</li>
                <li>Prioritert kø og høyere oppløsning</li>
                <li>–20 % ved årlig betaling</li>
              </ul>
              <span className="btn ghost kommer">Kommer snart</span>
            </div>
            <div className="price">
              <span className="seklabel">Prosjekt</span>
              <span className="amount">399 kr</span>
              <ul>
                <li>Hele nivåstigen for én bolig</li>
                <li>Fargerapport og kostnadsestimat</li>
                <li>Del med håndverker</li>
              </ul>
              <span className="btn ghost kommer">Kommer snart</span>
            </div>
          </div>
          <div className="ventelinje">
            <span>Vil du ha beskjed når betalte planer lanseres?</span>
            <Waitlist />
          </div>
        </div>
      </section>

      <footer className="site">
        © Vøling · Alle bilder er visualiseringer (illustrasjon) · Tiltak kan være
        søknadspliktige
      </footer>
    </div>
  );
}
