import Image from 'next/image';
import type { Project } from '@/lib/content';
import { CampaignArt } from './campaign-art';
import styles from './project-cover.module.css';

export function ProjectCover({
  cover,
  priority = false,
}: {
  cover: Project['cover'];
  priority?: boolean;
}) {
  if (cover.art) return <CampaignArt type={cover.art} priority={priority} />;
  return (
    <div className={styles.image}>
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes="(max-width: 760px) 90vw, 48vw"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}
