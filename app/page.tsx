import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, Coffee } from 'lucide-react';
import { Button, Eyebrow } from '@/components/ui';
import { Reveal, Spotlight, Unfold } from '@/components/motion';
import { ScrollGallery } from '@/components/scroll-gallery';
import { Reviews } from '@/components/reviews';
import { Dashboard } from '@/components/dashboard';
import { services, contact } from '@/lib/content';

export const metadata = { alternates: { canonical: '/' } };
export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Rossenaar Marketing',
    url: 'https://www.rossenaarmarketing.nl',
    email: contact.email,
    telephone: contact.tel,
    founder: {
      '@type': 'Person',
      name: 'Danny Rossenaar',
      sameAs: contact.linkedin,
    },
    areaServed: 'Nederland',
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero wrap">
        <div className="hero-kicker">
          <span className="status-dot" />
          Persoonlijke marketing. Samen met Danny.
        </div>
        <h1>
          Groot in beeld.
          <br />
          Dichtbij <em>jou.</em>
          <span className="hero-spark" aria-hidden="true">
            ✳
          </span>
        </h1>
        <p>
          Jij hebt een verhaal dat mensen moeten horen.
          <br /> Ik help je het te vertellen. En de juiste mensen te bereiken.
        </p>
        <div className="hero-actions">
          <Button href="/contact">Laten we kennismaken</Button>
          <Link href="#verhaal" className="text-link">
            Ontdek mijn aanpak <ArrowDown size={16} />
          </Link>
        </div>
        <span className="hero-margin-note">
          STRATEGIE · CONTENT · CAMPAGNES
        </span>
      </section>
      <ScrollGallery />
      <div className="client-strip wrap">
        <span>Al mooie gesprekken mee gevoerd</span>
        <div>
          <strong className="client-retro">
            retro<span>CAFÉ & EVENTS</span>
          </strong>
          <strong className="client-chocolate">
            Chocolate
            <br />
            <span>Planet</span>
          </strong>
          <strong className="client-factum">
            FactumAI<span>TECHNOLOGIE MET IMPACT</span>
          </strong>
        </div>
      </div>
      <section className="manifesto-section" id="verhaal">
        <div className="wrap manifesto-layout">
          <Eyebrow light>Aandacht maakt het verschil</Eyebrow>
          <div>
            <Reveal>
              <h2>
                Je hoeft niet harder
                <br />
                te roepen.
                <br />
                Wel <em>meer jezelf</em>
                <br />
                te zijn.
              </h2>
            </Reveal>
            <div className="manifesto-bottom">
              <p>
                Je hebt iemand nodig die luistert, je verhaal begrijpt en met je
                meedenkt. Ik vertaal wie jij bent naar marketing die opvalt én
                bij je past.
              </p>
              <span className="handwritten">
                Gewoon, samen.
                <svg viewBox="0 0 140 35" aria-hidden="true">
                  <path d="M4 10c35 24 79 25 121 0m-15 0h17l-3 17" />
                </svg>
              </span>
            </div>
            <Button href="/over" variant="lime">
              De mens achter de marketing
            </Button>
          </div>
        </div>
      </section>
      <section className="services-section wrap" id="diensten">
        <div className="section-heading">
          <div>
            <Eyebrow>Wat we samen kunnen doen</Eyebrow>
            <h2>
              Goed verhaal.
              <br />
              <em>Sterk naar buiten.</em>
            </h2>
          </div>
          <p>
            Van dat eerste idee tot de campagne
            <br />
            die mensen in beweging brengt.
          </p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <Spotlight className="service-row">
                <Link href={`/diensten#${service.slug}`}>
                  <span className="service-index">{service.number}</span>
                  <h3>{service.label}</h3>
                  <p>{service.description}</p>
                  <span className="circle-arrow">
                    <ArrowUpRight />
                  </span>
                </Link>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="personal-section wrap" id="over">
        <Reveal className="personal-photo">
          <Image
            src="/assets/danny.jpg"
            alt="Danny Rossenaar, jouw vaste aanspreekpunt"
            fill
            sizes="(max-width: 760px) 90vw, 45vw"
          />
          <div className="photo-note">
            Aangenaam.
            <br />
            <em>Ik ben Danny.</em>
            <span>↗</span>
          </div>
        </Reveal>
        <div className="personal-copy">
          <Eyebrow>Geen bureau op afstand</Eyebrow>
          <h2>
            Iemand die
            <br />
            jouw bedrijf
            <br />
            <em>leert kennen.</em>
          </h2>
          <p>
            Ik geloof dat marketing begint bij goed luisteren. Achter elk
            bedrijf zit een mens met een verhaal. Dat verhaal verdient aandacht.
          </p>
          <ul className="check-list">
            <li>
              <Check size={17} />
              Je schakelt altijd rechtstreeks met mij
            </li>
            <li>
              <Check size={17} />
              Eerlijk advies, in begrijpelijke taal
            </li>
            <li>
              <Check size={17} />
              Een plan dat bij jou en je budget past
            </li>
          </ul>
          <Button href="/over" variant="outline">
            Meer over Danny
          </Button>
        </div>
      </section>
      <section className="insight-section" id="inzicht">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>Jij kijkt gewoon mee</Eyebrow>
              <h2>
                Mooi werk.
                <br />
                <em>Helder resultaat.</em>
              </h2>
            </div>
            <div>
              <p>
                Wat leveren je advertenties op? Welke aanvragen
                <br />
                komen binnen? Je ziet het in je eigen klantportaal.
              </p>
              <Link href="/inzicht" className="text-link">
                Ontdek jouw inzicht <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <Unfold>
            <Dashboard compact />
          </Unfold>
          <p className="demo-caption">
            Interactief voorbeeld met fictieve gegevens. Je eigen portaal is
            alleen toegankelijk op uitnodiging.
          </p>
        </div>
      </section>
      <section className="process-section wrap" id="werkwijze">
        <div className="section-heading">
          <div>
            <Eyebrow>Zo eenvoudig kan het zijn</Eyebrow>
            <h2>
              Een goed begin.
              <br />
              <em>Een fijne samenwerking.</em>
            </h2>
          </div>
          <Coffee className="coffee-illustration" strokeWidth={0.8} />
        </div>
        <div className="process-grid">
          {[
            [
              '01',
              'Eerst even koffie.',
              'Wie ben je? Wat drijft je? Waar wil je naartoe? We beginnen met een goed gesprek, bij jou op de zaak of ergens met goede koffie.',
            ],
            [
              '02',
              'Een plan dat klopt.',
              'Ik vertaal jouw ambities naar haalbare stappen. Je weet wat we gaan doen, waarom en wat het kost.',
            ],
            [
              '03',
              'Samen in beweging.',
              'We maken, delen en verbeteren. Jij blijft betrokken, ziet wat er gebeurt en hebt mij gewoon onder de knop.',
            ],
          ].map(([n, title, body]) => (
            <Reveal key={n}>
              <span className="process-number">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Reviews />
    </>
  );
}
