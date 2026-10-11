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
import Link from 'next/link';
import { pageGraph, pageMetadata, site } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

export const metadata = pageMetadata(
  '/',
  'Social media marketing in Enkhuizen',
  site.description,
);
export default function Home() {
  return (
    <>
      <StructuredData
        nodes={pageGraph(
          '/',
          'Social media marketing in Enkhuizen',
          site.description,
        )}
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
      <section className="local-intro wrap">
        <div>
          <Eyebrow>Dichtbij begint hier</Eyebrow>
          <h2>
            Social media marketing
            <br />
            <em>uit Enkhuizen.</em>
          </h2>
        </div>
        <div>
          <p>
            Rossenaar Marketing is het bedrijf van Danny Rossenaar. Sinds juni
            2024 help ik ondernemers met hun verhaal, content en online
            campagnes. Vanuit Enkhuizen werk ik vooral in West-Friesland. Ook
            als je elders in Nederland onderneemt, kunnen we samenwerken.
          </p>
          <p>
            Je kunt bij mij terecht voor{' '}
            <Link href="/diensten/social-media-beheer">
              social media beheer
            </Link>
            , <Link href="/diensten/content-creatie">fotografie en video</Link>,{' '}
            <Link href="/diensten/meta-advertenties">Meta-advertenties</Link> en{' '}
            <Link href="/diensten/personeelswerving">
              personeelswerving via social media
            </Link>
            . We beginnen bij jouw bedrijf en kiezen wat daarbij past.
          </p>
          <Link href="/contact">Vertel me over jouw plannen</Link>
        </div>
      </section>
      <Reviews />
    </>
  );
}
