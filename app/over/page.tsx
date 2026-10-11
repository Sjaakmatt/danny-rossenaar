import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button, Eyebrow } from '@/components/ui';
import { Reviews } from '@/components/reviews';
import { contact } from '@/lib/content';
export const metadata = {
  title: 'Over Danny',
  description:
    'Maak kennis met Danny Rossenaar. Jouw vaste aanspreekpunt voor eerlijke, persoonlijke marketing. Een goed gesprek is het begin.',
  alternates: { canonical: '/over' },
};
export default function Over() {
  return (
    <>
      <section className="about-hero wrap">
        <div>
          <Eyebrow>De mens achter Rossenaar Marketing</Eyebrow>
          <h1>
            Mijn naam
            <br />
            is Danny
            <br />
            <em>Rossenaar.</em>
          </h1>
          <p>
            En ik geloof dat goede marketing
            <br />
            begint met een goed gesprek.
          </p>
          <Button href="/contact">Aangenaam. Even kennismaken?</Button>
        </div>
        <div className="about-portrait">
          <Image
            src="/assets/danny-hero.jpg"
            alt="Danny Rossenaar, glimlachend in een crèmekleurige trui"
            fill
            priority
            sizes="(max-width: 760px) 90vw, 48vw"
          />
          <span className="about-portrait-note">
            Wel zo fijn.
            <br />
            <em>Een gezicht erbij.</em>
          </span>
        </div>
      </section>
      <section className="about-story wrap">
        <Eyebrow>Zo kijk ik ernaar</Eyebrow>
        <div>
          <h2>
            Achter elk bedrijf
            <br />
            zit een <em>verhaal.</em>
          </h2>
          <p>
            Ik geloof dat marketing geen kunstje is, maar een kwestie van goed
            luisteren. Achter elk bedrijf zit een mens met een verhaal, en dat
            verhaal verdient het om verteld te worden. Zonder poespas, zonder
            druktemakerij.
          </p>
          <p>
            Daarom werk ik niet met standaardpakketten of snelle trucs. Ik neem
            de tijd om jou en je bedrijf te leren kennen, en bouw van daaruit
            aan marketing die klopt. Marketing waar jij je goed bij voelt en
            waar je klanten warm van worden.
          </p>
          <a
            className="text-link"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Volg me op LinkedIn
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="about-values">
        <div className="wrap">
          <span className="eyebrow">DIT MAG JE VAN MIJ VERWACHTEN</span>
          <div>
            {[
              [
                '01',
                'Je hebt mij aan de lijn.',
                'Van de eerste kennismaking tot de volgende campagne. Je schakelt rechtstreeks met mij.',
              ],
              [
                '02',
                'Eerlijk is wel zo fijn.',
                'Ook als mijn advies is: dit heb je niet nodig. Ik denk mee vanuit jouw bedrijf.',
              ],
              [
                '03',
                'Afspraak is afspraak.',
                'We maken duidelijke afspraken over het werk, het budget en het contact. En houden ons daaraan.',
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Reviews />
    </>
  );
}
