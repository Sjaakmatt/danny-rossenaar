import { pageGraph, pageMetadata, personId } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { Breadcrumbs } from '@/components/breadcrumbs';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button, Eyebrow } from '@/components/ui';
import { Reviews } from '@/components/reviews';
import { contact } from '@/lib/content';
import styles from './story.module.css';
const pageTitle = 'Danny Rossenaar, marketeer uit Enkhuizen';
const description =
  'Van acht jaar in de zorg naar Rossenaar Marketing. Ontmoet Danny, social media marketeer uit Enkhuizen. Lees zijn verhaal en maak vrijblijvend kennis.';
const crumbs = [{ name: 'Over Danny', path: '/over' }];
export const metadata = pageMetadata('/over', pageTitle, description);
export default function Over() {
  return (
    <>
      <StructuredData
        nodes={pageGraph('/over', pageTitle, description, {
          crumbs,
          type: 'AboutPage',
          mainEntity: { '@id': personId },
        })}
      />
      <Breadcrumbs items={crumbs} />
      <section className={`about-hero wrap ${styles.hero}`}>
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
            Ik ben geboren en getogen in Enkhuizen. En nee, het is geen dorp:
            het is een stad. Daar ben ik een trotse Enkhuizer in.
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
        <Eyebrow>Wat ik uit de zorg meeneem</Eyebrow>
        <div>
          <h2>
            Geen mens is
            <br />
            <em>standaard.</em>
          </h2>
          <p>
            Acht jaar lang werkte ik in de zorg, op een sociale werkplaats. Ik
            begeleidde cliënten bij opdrachten voor bedrijven en ondernemers uit
            de regio. Daar leerde ik het belangrijkste wat ik nu nog elke dag
            gebruik: niemand heeft baat bij een standaardaanpak. Iedere cliënt
            werd geholpen op zijn eigen niveau, met wat voor hém het beste
            werkte. Precies zo kijk ik nu naar bedrijven.
          </p>
          <p>Eén cliënt zei het vaak tegen me:</p>
          <blockquote className={styles.quote}>
            “Jij zegt altijd niet opgeven, dus dat doe ik dan ook niet.”
          </blockquote>
          <p>
            Die zin draag ik nog steeds met me mee. Ook als het even niet loopt,
            gaan we door.
          </p>
        </div>
      </section>
      <section className="about-story wrap">
        <Eyebrow>Een eigen weg</Eyebrow>
        <div>
          <h2>
            Niet te lang denken.
            <br />
            <em>Gewoon doen.</em>
          </h2>
          <p>
            Op de werkplaats had ik veel contact met ondernemers. Ik merkte hoe
            graag ik hen wilde helpen groeien. Tijdens een reis van vier maanden
            door Zuidoost-Azië heb ik goed nagedacht: blijf ik in de zorg, of
            bouw ik iets van mezelf op? Het werd het tweede.
          </p>
          <p>
            Ik ging leren bij de Social Secrets Academy en de community
            daaromheen. Daar leerde ik de techniek achter goede marketing.
            Luisteren naar het verhaal van een ondernemer kon ik al. Bovenal
            leerde ik daar: niet te lang denken, gewoon doen. Mijn eerste klant
            kwam trouwens uit mijn oude werk. Wij vouwden hele partijen doosjes
            voor zijn productie, en nu help ik hem online.
          </p>
        </div>
      </section>
      <section className="about-on-location wrap">
        <figure>
          <div className="about-location-image">
            <Image
              src="/assets/op-locatie.webp"
              alt="Content maken bij een klant in de winkel"
              fill
              sizes="(max-width: 760px) 90vw, 50vw"
            />
          </div>
          <figcaption>Op locatie bij een klant.</figcaption>
        </figure>
        <div>
          <Eyebrow>Rossenaar Marketing · sinds juni 2024</Eyebrow>
          <h2>
            Mensen kopen
            <br />
            <em>van mensen.</em>
          </h2>
          <p>
            In juni 2024 begon ik Rossenaar Marketing. Wat ik vaak zie: social
            media is voor veel ondernemers een ondergeschoven kindje, gevuld met
            snelle AI-plaatjes. Maar mensen kopen van mensen. Je Instagram is je
            visitekaartje, en bijna iedereen zit erop. Laat dus zien wie je
            bent. Daar help ik je bij.
          </p>
          <Button href="/contact" variant="outline">
            Vertel me over jouw bedrijf
          </Button>
        </div>
      </section>
      <section className="about-story wrap">
        <Eyebrow>Buiten werktijd</Eyebrow>
        <div>
          <h2>
            Ook gewoon <em>Danny.</em>
          </h2>
          <p>
            Als ik niet werk, sta ik in de sportschool, kijk of speel ik
            voetbal, luister ik muziek of zit ik in een boek. Ik leer een nieuwe
            taal en ik spreek graag af met familie en vrienden. Die mensen om me
            heen steunen me in dit avontuur.
          </p>
          <p>Ik ben pas tevreden als jij blij bent met het resultaat.</p>
          <div className={styles.actions}>
            <Button href="/contact">Zullen we koffie drinken?</Button>
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
        </div>
      </section>
      <Reviews />
    </>
  );
}
