import Image from 'next/image';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Eyebrow } from '@/components/ui';
import { contact } from '@/lib/content';
export const metadata = {
  title: 'Even koffie? | Contact',
  description:
    'Maak vrijblijvend kennis met Danny Rossenaar. Mail, bel of stuur een bericht over jouw bedrijf en plannen.',
  alternates: { canonical: '/contact' },
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ interesse?: string }>;
}) {
  const { interesse } = await searchParams;
  return (
    <section className="contact-page wrap">
      <div className="contact-copy">
        <Eyebrow>Een goed gesprek is het begin</Eyebrow>
        <h1>
          De koffie
          <br />
          staat <em>klaar.</em>
        </h1>
        <p>
          Vertel me waar je mee bezig bent. Ik luister, denk met je mee en kijk
          wat ik voor je kan betekenen.
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
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            <ArrowUpRight />
            Of vind me op LinkedIn
          </a>
        </div>
        <p className="contact-small">
          Vrijblijvend kennismaken. Ik reageer binnen één werkdag.
        </p>
      </div>
      <ContactForm interest={interesse} />
    </section>
  );
}
