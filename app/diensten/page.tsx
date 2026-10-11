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
export const metadata = {
  title: 'Wat ik doe',
  description:
    'Merkverhaal, content, social media, Meta-advertenties en marketingstrategie. Persoonlijk en op maat, samen met Danny Rossenaar.',
  alternates: { canonical: '/diensten' },
};
const icons = [Fingerprint, Focus, Megaphone, Route];
export default function Diensten() {
  return (
    <>
      <PageIntro
        label="Wat ik doe"
        title="Jouw ambities."
        italic="Onze volgende stap."
        description="Een sterk verhaal, goede content en de juiste mensen bereiken. We kijken samen wat jouw bedrijf nu nodig heeft."
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
