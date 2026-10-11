import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects, reviews } from '@/lib/content';
import { ProjectCover } from '@/components/project-cover';
import { Button, Eyebrow } from '@/components/ui';
import {
  absoluteUrl,
  organizationId,
  pageGraph,
  pageMetadata,
  projectImage,
  projectSearch,
} from '@/lib/seo';
import { servicePages } from '@/lib/service-pages';
import { StructuredData } from '@/components/structured-data';
import { Breadcrumbs } from '@/components/breadcrumbs';
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const search = projectSearch[slug];
  return pageMetadata(
    `/werk/${slug}`,
    search?.title ?? project.title,
    search?.description ?? project.description,
    projectImage(project),
  );
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const review =
    project.reviewIndex === undefined
      ? undefined
      : reviews[project.reviewIndex];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const crumbs = [
    { name: 'Werk', path: '/werk' },
    { name: project.title, path: `/werk/${slug}` },
  ];
  const relatedServices = servicePages.filter((service) =>
    service.cases.includes(slug),
  );
  return (
    <>
      <StructuredData
        nodes={pageGraph(`/werk/${slug}`, project.title, project.description, {
          crumbs,
          mainEntity: {
            '@type': 'CreativeWork',
            '@id': absoluteUrl(`/werk/${slug}#samenwerking`),
            name: `${project.title} – ${project.category}`,
            description: project.description,
            image: absoluteUrl(projectImage(project)),
            creator: { '@id': organizationId },
            about: {
              '@type': 'Organization',
              name: project.title,
              ...(project.website && { url: project.website.url }),
              ...(project.location && {
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: project.location,
                },
              }),
            },
            inLanguage: 'nl-NL',
          },
        })}
      />
      <Breadcrumbs items={crumbs} />
      <section className="project-intro wrap">
        <Link href="/werk" className="text-link">
          <ArrowLeft size={16} />
          Alle samenwerkingen
        </Link>
        <div>
          <Eyebrow>{project.category}</Eyebrow>
          <h1>{project.title}</h1>
          <p>{project.intro}</p>
        </div>
      </section>
      <section className="project-detail wrap">
        <div className="project-detail-art">
          <ProjectCover cover={project.cover} priority />
          <p>{project.mediaCaption}</p>
        </div>
        <div className="project-detail-copy">
          <Eyebrow>De samenwerking</Eyebrow>
          <h2>
            {project.approach?.title ?? 'Een verhaal.'}
            <br />
            <em>{project.approach?.emphasis ?? 'Een aanpak die past.'}</em>
          </h2>
          <p>{project.description}</p>
          {project.website && (
            <a href={project.website.url} className="text-link">
              {project.website.label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          <ul>
            {project.scope.map((item) => (
              <li key={item}>
                {item}
                <ArrowUpRight size={16} />
              </li>
            ))}
          </ul>
          <Button href="/contact">Ook samen aan de slag?</Button>
          {relatedServices.length > 0 && (
            <nav
              className="case-service-links"
              aria-label="Diensten bij deze samenwerking"
            >
              {relatedServices.map((service) => (
                <Link key={service.slug} href={`/diensten/${service.slug}`}>
                  {service.name} <ArrowUpRight size={14} />
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>
      {project.videos && project.videos.length > 0 && (
        <section
          className={`client-videos wrap ${project.videos.length === 1 ? 'client-videos-single' : ''}`}
          aria-label={`Video’s bij ${project.title}`}
        >
          {project.videos.map((video) => (
            <figure key={video.src}>
              <video
                controls
                playsInline
                preload="none"
                poster={video.poster}
                src={video.src}
                aria-label={video.title}
              />
              <figcaption>{video.title}</figcaption>
            </figure>
          ))}
        </section>
      )}
      {review && (
        <section className="project-quote wrap">
          <span aria-hidden="true">“</span>
          <blockquote>{review.text}</blockquote>
          <p>
            <strong>{review.name}</strong> · {review.company}
          </p>
        </section>
      )}
      <Link href={`/werk/${next.slug}`} className="next-project wrap">
        <span>Volgende samenwerking</span>
        <h2>{next.title}</h2>
        <ArrowUpRight />
      </Link>
    </>
  );
}
