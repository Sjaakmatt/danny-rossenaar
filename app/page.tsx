import { ContentShowcase } from '@/components/content-showcase';
import { CinematicHero } from '@/components/hero';
import { Coffee } from 'lucide-react';
import { Eyebrow } from '@/components/ui';
import { Reveal } from '@/components/motion';
import {
  ManifestoScene,
  ServicesScene,
  PersonalScene,
  PortalScene,
} from '@/components/cinematic-home';
import { Reviews } from '@/components/reviews';
import { Dashboard } from '@/components/dashboard';
import { contact } from '@/lib/content';

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
      <CinematicHero />
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
      <ManifestoScene />
      <ContentShowcase />
      <ServicesScene />
      <PersonalScene />
      <PortalScene>
        <Dashboard compact />
      </PortalScene>
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
