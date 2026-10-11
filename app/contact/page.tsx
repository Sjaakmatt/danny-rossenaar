import { pageGraph, pageMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { Breadcrumbs } from '@/components/breadcrumbs';
import Image from 'next/image';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Eyebrow } from '@/components/ui';
import { contact } from '@/lib/content';
const pageTitle = 'Contact met Danny Rossenaar';
const description =
  'Bespreek jouw marketing met Danny Rossenaar uit Enkhuizen. Voor ondernemers in West-Friesland en daarbuiten. Bel, mail of plan een vrijblijvende kennismaking.';
const crumbs = [{ name: 'Contact', path: '/contact' }];
export const metadata = pageMetadata('/contact', pageTitle, description);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ interesse?: string }>;
}) {
  const { interesse } = await searchParams;
  return (
    <>
      <StructuredData
        nodes={pageGraph('/contact', pageTitle, description, {
          crumbs,
          type: 'ContactPage',
        })}
      />
      <Breadcrumbs items={crumbs} />
      <section className="contact-page wrap">
        <div className="contact-copy">
          <Eyebrow>Een goed gesprek is het begin</Eyebrow>
          <h1>
            De koffie
            <br />
            staat <em>klaar.</em>
          </h1>
          <p>
            Vertel me waar je mee bezig bent. Ik luister, denk met je mee en
            kijk wat ik voor je kan betekenen.
          </p>
          <div className="contact-person">
            <Image
              src="/assets/danny-hero.jpg"
              width={58}
              height={58}
              alt="Danny Rossenaar"
            />
            <div>
              <strong>Danny Rossenaar</strong>
              <span>Je spreekt gewoon met mij.</span>
            </div>
          </div>
          <div className="contact-links">
            <a href={`mailto:${contact.email}`}>
              <Mail />
              {contact.email}
            </a>
            <a href={`tel:${contact.tel}`}>
              <Phone />
              {contact.phone}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight />
              Of vind me op LinkedIn
            </a>
          </div>
          <p className="contact-small">
            Vanuit Enkhuizen, voor West-Friesland en heel Nederland.
            Vrijblijvend kennismaken. Ik reageer binnen één werkdag.
          </p>
        </div>
        <ContactForm interest={interesse} />
      </section>
    </>
  );
}
