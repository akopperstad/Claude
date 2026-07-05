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
          <span className="eyebrow">Visualiser før du pusser opp</span>
          <h1>Se huset ditt i ny drakt — før du løfter en pensel.</h1>
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

      <section className="block" id="stiler">
        <h2>Én bolig — syv retninger</h2>
        <p className="blokklede">
          Samme hus, syv norske stiler. Trykk på et bilde for å se det stort.
        </p>
        <StyleStrip />
      </section>

      <section className="block" id="slik">
        <h2>Slik virker det</h2>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <b>Last opp et bilde</b>
            Ett bilde av fasaden holder. Mobilbilde er godt nok.
          </div>
          <div className="step">
            <span className="n">02</span>
            <b>Velg nivå og stil</b>
            Fra kun ny farge til arkitektonisk visjon — du styrer hvor langt vi går.
          </div>
          <div className="step">
            <span className="n">03</span>
            <b>Se, juster, planlegg</b>
            Før/etter-glidebryter, justér med egne ord, fargeforslag og grovt prisestimat.
          </div>
        </div>
      </section>

      <section className="block" id="priser">
        <h2>Priser</h2>
        <p className="blokklede">
          Gratis mens vi er i beta. Betalte planer lanseres snart — med god margin under
          utenlandske alternativer.
        </p>
        <div className="prices">
          <div className="price">
            <span className="eyebrow">Gratis beta</span>
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
            <span className="eyebrow">Basis</span>
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
            <span className="eyebrow">Pro</span>
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
            <span className="eyebrow">Prosjekt</span>
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
      </section>

      <footer className="site">
        © Vøling · Alle bilder er visualiseringer (illustrasjon) · Tiltak kan være
        søknadspliktige
      </footer>
    </div>
  );
}
