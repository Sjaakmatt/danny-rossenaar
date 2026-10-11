import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects, reviews } from '@/lib/content';
import { ProjectCover } from '@/components/project-cover';
import { Button, Eyebrow } from '@/components/ui';
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
  return {
    title: project?.title ?? 'Project niet gevonden',
    description: project?.intro,
    alternates: { canonical: `/werk/${slug}` },
  };
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
  return (
    <>
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
          <ul>
            {project.scope.map((item) => (
              <li key={item}>
                {item}
                <ArrowUpRight size={16} />
              </li>
            ))}
          </ul>
          <Button href="/contact">Ook samen aan de slag?</Button>
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
