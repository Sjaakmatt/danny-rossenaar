'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/content';
import { ProjectCover } from './project-cover';
import { Reveal } from './motion';
export function WorkGrid() {
  const [filter, setFilter] = useState('Alles');
  return (
    <>
      <div
        className="work-filters"
        role="group"
        aria-label="Filter samenwerkingen"
      >
        {['Alles', ...new Set(projects.map((project) => project.filter))].map(
          (f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={filter === f ? 'active' : ''}
            >
              {f}
              <span>
                {f === 'Alles'
                  ? projects.length
                  : projects.filter((p) => p.filter === f).length}
              </span>
            </button>
          ),
        )}
      </div>
      <div className="work-grid" aria-live="polite">
        {projects
          .filter((p) => filter === 'Alles' || p.filter === filter)
          .map((project, index) => (
            <Reveal key={project.slug}>
              <Link href={`/werk/${project.slug}`} className="project-card">
                <div className="project-art">
                  <ProjectCover cover={project.cover} priority={index === 0} />
                  <span className="project-view">
                    <ArrowUpRight />
                  </span>
                  <span className="concept-tag">
                    {project.cover.src || project.cover.art === 'chocolate'
                      ? 'KLANTCONTENT'
                      : 'SAMENWERKING'}
                  </span>
                </div>
                <div className="project-card-title">
                  <h2>{project.title}</h2>
                  <ArrowUpRight size={25} />
                </div>
                <p>{project.category}</p>
              </Link>
            </Reveal>
          ))}
      </div>
    </>
  );
}
