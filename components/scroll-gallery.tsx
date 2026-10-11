'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CampaignArt, type ArtType } from './campaign-art';

const panels: { type: ArtType; href: string; label: string }[] = [
  { type: 'story', href: '/diensten', label: 'Ontdek wat ik doe' },
  {
    type: 'cafe',
    href: '/werk/cafe-retro',
    label: 'Café Retro, bekijk de samenwerking en het conceptbeeld',
  },
  {
    type: 'chocolate',
    href: '/werk/chocolate-planet',
    label: 'Chocolate Planet, bekijk de samenwerking en het conceptbeeld',
  },
  { type: 'danny', href: '/over', label: 'Maak kennis met Danny' },
  {
    type: 'factum',
    href: '/werk/factumai',
    label: 'Bekijk de samenwerking met FactumAI',
  },
];
function Panel({
  panel,
  index,
  active,
  progress,
}: {
  panel: (typeof panels)[number];
  index: number;
  active: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const offset = ((index - active + 7) % 5) - 2;
  const x = useTransform(
    progress,
    [0, 0.6, 1],
    [`${offset * 88 - 50}%`, `${offset * 112 - 50}%`, `${offset * 125 - 50}%`],
  );
  const y = useTransform(
    progress,
    [0, 0.6, 1],
    [Math.abs(offset) * 35, Math.abs(offset) * 4, Math.abs(offset) * -12],
  );
  const rotate = useTransform(
    progress,
    [0, 0.6, 1],
    [offset * 9, offset * 1.5, offset * -3],
  );
  const rotateY = useTransform(
    progress,
    [0, 0.6, 1],
    [offset * -9, 0, offset * 6],
  );
  const smoothX = useSpring(x, { stiffness: 130, damping: 27 });
  return (
    <motion.div
      className={`gallery-panel ${Math.abs(offset) === 2 ? 'gallery-outer' : ''}`}
      style={
        reduced
          ? {
              x: `${offset * 105 - 50}%`,
              rotate: offset * 3,
              zIndex: 5 - Math.abs(offset),
            }
          : { x: smoothX, y, rotate, rotateY, zIndex: 5 - Math.abs(offset) }
      }
    >
      <Link href={panel.href} aria-label={panel.label}>
        <CampaignArt type={panel.type} priority={index < 4} />
        <span className="gallery-open">
          <ArrowUpRight size={22} />
        </span>
      </Link>
    </motion.div>
  );
}
export function ScrollGallery() {
  const target = useRef<HTMLElement>(null);
  const [active, setActive] = useState(2);
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });
  return (
    <section
      ref={target}
      className="gallery-section"
      aria-label="Verhalen in beeld"
      aria-roledescription="carrousel"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          setActive((active + (event.key === 'ArrowRight' ? 1 : 4)) % 5);
        }
      }}
    >
      <div className="gallery-sticky">
        <div className="gallery-stage">
          {panels.map((panel, index) => (
            <Panel
              key={panel.type}
              panel={panel}
              index={index}
              active={active}
              progress={scrollYProgress}
            />
          ))}
        </div>
        <div className="gallery-controls">
          <button
            aria-label="Vorig verhaal"
            onClick={() => setActive((active + 4) % 5)}
          >
            <ArrowLeft size={17} />
          </button>
          <span aria-live="polite">
            {String(active + 1).padStart(2, '0')} / 05
          </span>
          <button
            aria-label="Volgend verhaal"
            onClick={() => setActive((active + 1) % 5)}
          >
            <ArrowRight size={17} />
          </button>
        </div>
        <div className="gallery-caption wrap">
          <span>
            <ArrowDown size={15} /> Scroll. Ontdek. Blijf even hangen.
          </span>
          <span>Campagnebeelden zijn creatieve concepten.</span>
          <Link href="/werk">
            Meer over het werk <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
