import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { CompareSlider } from '@/components/CompareSlider';

export default function Landing() {
  return (
    <div className="wrap">
      <nav className="site">
        <Logo />
        <div className="links">
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
          <Link className="btn" href="/ny">
            Prøv gratis — ny farge på sekunder
          </Link>
          <div className="trust">
            <span>Ærlig før/etter-sammenligning</span>
            <span>Norske farger</span>
            <span>Grovt kostnadsestimat inkludert</span>
          </div>
        </div>
        <CompareSlider before="/demo/e7-for.jpg" after="/demo/e7-rod.jpg" />
      </div>

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
            <b>Velg nivå</b>
            Fra kun ny farge til arkitektonisk visjon — du styrer hvor langt vi går.
          </div>
          <div className="step">
            <span className="n">03</span>
            <b>Se, sammenlign, planlegg</b>
            Før/etter-glidebryter, fargeforslag med begrunnelse og grovt prisestimat.
          </div>
        </div>
      </section>

      <section className="block" id="priser">
        <h2>Priser</h2>
        <div className="prices">
          <div className="price">
            <span className="eyebrow">Gratis</span>
            <span className="amount">0 kr</span>
            <ul>
              <li>3 fargebytter (nivå 1)</li>
              <li>Svar på sekunder</li>
              <li>Ingen konto nødvendig</li>
            </ul>
            <Link className="btn ghost" href="/ny">
              Prøv nå
            </Link>
          </div>
          <div className="price feat">
            <span className="eyebrow">Boligjakt</span>
            <span className="amount">
              99 kr<small>/mnd</small>
            </span>
            <ul>
              <li>Ubegrenset fargebytte</li>
              <li>15 AI-renders per måned</li>
              <li>Perfekt mens du er på visning</li>
              <li>Avslutt når du vil</li>
            </ul>
            <Link className="btn" href="/ny">
              Start jakten
            </Link>
          </div>
          <div className="price">
            <span className="eyebrow">Prosjekt</span>
            <span className="amount">399 kr</span>
            <ul>
              <li>Hele nivåstigen for din bolig</li>
              <li>Fargerapport med begrunnelse</li>
              <li>Grovt kostnadsestimat</li>
              <li>Del med håndverker</li>
            </ul>
            <Link className="btn ghost" href="/ny">
              Start prosjekt
            </Link>
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
