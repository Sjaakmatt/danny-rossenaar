import { ServiceLinks } from '@/components/service-links';
import { pageGraph, pageMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  ArrowUpRight,
  Fingerprint,
  Focus,
  Megaphone,
  Route,
} from 'lucide-react';
import { services } from '@/lib/content';
import { Button, PageIntro } from '@/components/ui';
import { Spotlight } from '@/components/motion';
const pageTitle = 'Marketingdiensten voor ondernemers';
const description =
  'Social media, content, Meta-advertenties en strategie met Danny Rossenaar. Ontdek de mogelijkheden voor jouw bedrijf in Enkhuizen, West-Friesland en daarbuiten.';
const crumbs = [{ name: 'Diensten', path: '/diensten' }];
export const metadata = pageMetadata('/diensten', pageTitle, description);
const icons = [Fingerprint, Focus, Megaphone, Route];
export default function Diensten() {
  return (
    <>
      <StructuredData
        nodes={pageGraph('/diensten', pageTitle, description, { crumbs })}
      />
      <Breadcrumbs items={crumbs} />
      <PageIntro
        label="Wat ik doe"
        title="Marketing die past."
        italic="Bij jouw bedrijf."
        description="Van social media beheer en content tot Meta-advertenties en strategie. Ik help ondernemers in Enkhuizen, West-Friesland en daarbuiten met marketing die bij hen past."
      />
      <div className="wrap services-detail">
        {services.map((service, i) => {
          const Icon = icons[i];
          return (
            <section
              id={service.slug}
              key={service.slug}
              className={`service-detail service-${service.accent}`}
            >
              <Spotlight>
                <div className="service-detail-top">
                  <span>
                    0{i + 1} / {service.label}
                  </span>
                  <Icon size={60} strokeWidth={1} />
                </div>
                <div className="service-detail-body">
                  <h2>{service.name}</h2>
                  <div>
                    <p>{service.description}</p>
                    <ul>
                      {service.items.map((item) => (
                        <li key={item}>
                          {item}
                          <ArrowUpRight size={17} />
                        </li>
                      ))}
                    </ul>
                    <Button
                      href={`/contact?interesse=${encodeURIComponent(service.label)}`}
                      variant="outline"
                    >
                      Hier wil ik meer over weten
                    </Button>
                  </div>
                </div>
              </Spotlight>
            </section>
          );
        })}
      </div>
      <ServiceLinks />
      <section className="faq-section wrap">
        <div>
          <span className="eyebrow">GOEDE VRAAG</span>
          <h2>
            Even <em>helder.</em>
          </h2>
          <p>
            Staat jouw vraag er niet tussen?
            <br />
            Je mag me altijd bellen.
          </p>
        </div>
        <div className="faq-list">
          {[
            [
              'Waar beginnen we?',
              'Met een vrijblijvend gesprek. Ik luister naar je verhaal, je ambities en de dingen waar je tegenaan loopt. Daarna bepalen we samen of en hoe ik je kan helpen.',
            ],
            [
              'Werk je met vaste pakketten?',
              'Ik maak een voorstel dat past bij je doelen en budget. Zo kiezen we bewust wat er nodig is en weet je vooraf waar je aan toe bent.',
            ],
            [
              'Kan ik ook voor één onderdeel bij je terecht?',
              'Zeker. Je kunt bijvoorbeeld hulp zoeken bij een campagne, content of je merkverhaal. We hoeven niet meteen alles aan te pakken.',
            ],
            [
              'Hoe blijf ik op de hoogte?',
              'We houden persoonlijk contact en spreken af wanneer we de voortgang bespreken. Voor inzicht in je aanvragen en advertentieresultaten is er een klantportaal op uitnodiging.',
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
