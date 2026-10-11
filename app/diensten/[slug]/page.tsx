import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { servicePages } from '@/lib/service-pages';
import { projects } from '@/lib/content';
import {
  absoluteUrl,
  organizationId,
  pageGraph,
  pageMetadata,
  serviceArea,
} from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button, Eyebrow } from '@/components/ui';
import { ServiceLinks } from '@/components/service-links';
import styles from './service.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(`/diensten/${slug}`, service.title, service.description);
}

export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();
  const path = `/diensten/${slug}`;
  const crumbs = [
    { name: 'Diensten', path: '/diensten' },
    { name: service.name, path },
  ];
  const relatedCases = projects.filter((project) =>
    service.cases.includes(project.slug),
  );
  return (
    <>
      <StructuredData
        nodes={[
          ...pageGraph(path, service.name, service.description, {
            crumbs,
            mainEntity: { '@id': absoluteUrl(`${path}#dienst`) },
          }),
          {
            '@type': 'Service',
            '@id': absoluteUrl(`${path}#dienst`),
            name: service.name,
            serviceType: service.name,
            description: service.intro,
            url: absoluteUrl(path),
            image: absoluteUrl(service.image),
            provider: { '@id': organizationId },
            areaServed: serviceArea,
            mainEntityOfPage: { '@id': absoluteUrl(`${path}#pagina`) },
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <article>
        <header className={`${styles.hero} wrap`}>
          <div>
            <Eyebrow>Enkhuizen · West-Friesland · daarbuiten</Eyebrow>
            <h1>
              {service.headline}
              <br />
              <em>{service.emphasis}</em>
            </h1>
            <p>{service.intro}</p>
            <Button
              href={`/contact?interesse=${encodeURIComponent(service.name)}`}
            >
              Bespreek jouw plannen
            </Button>
          </div>
          <figure>
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 760px) 90vw, 36vw"
            />
            <figcaption>Eigen werk. Echte mensen.</figcaption>
          </figure>
        </header>
        <div className={`${styles.body} wrap`}>
          <aside className={styles.overview}>
            <Eyebrow>Waar ik bij help</Eyebrow>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/over" className="text-link">
              Je werkt met Danny <ArrowUpRight size={17} />
            </Link>
          </aside>
          <div className={styles.copy}>
            {service.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <section>
              <h2>Zo pakken we het samen aan</h2>
              <ol className={styles.steps}>
                {service.steps.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2>Bekijk het werk in de praktijk</h2>
              <div className={styles.cases}>
                {relatedCases.map((project) => (
                  <Link href={`/werk/${project.slug}`} key={project.slug}>
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.category}</small>
                    </span>
                    <ArrowUpRight size={22} />
                  </Link>
                ))}
              </div>
              {slug === 'meta-advertenties' && (
                <p>
                  <Link className={styles.inlineLink} href="/inzicht">
                    Bekijk ook de interactieve rondleiding door het
                    klantportaal.
                  </Link>
                </p>
              )}
            </section>
          </div>
        </div>
        <section className="faq-section wrap">
          <div>
            <Eyebrow>Goede vraag</Eyebrow>
            <h2>
              Even <em>helder.</em>
            </h2>
            <p>
              Meer weten over {service.name.toLowerCase()}?<br />
              Je spreekt gewoon met mij.
            </p>
          </div>
          <div className="faq-list">
            {service.faqs.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>
      <ServiceLinks exclude={slug} />
    </>
  );
}
