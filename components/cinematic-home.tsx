'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowDown, ArrowUpRight, Check, Mouse, Sparkles } from 'lucide-react';
import { CampaignArt, type ArtType } from './campaign-art';
import { Button, Eyebrow } from './ui';
import { services } from '@/lib/content';
import { demoMonthLeads } from '@/lib/demo';

const stories: { art: ArtType; href: string; label: string }[] = [
  { art: 'kingma', href: '/#content', label: 'La Kingma advertentie' },
  {
    art: 'chocolate',
    href: '/werk/chocolate-planet',
    label: 'Chocolate Planet',
  },
  { art: 'location', href: '/#content', label: 'Content maken op locatie' },
  { art: 'danny', href: '/over', label: 'Maak kennis met Danny' },
  { art: 'emiel', href: '/#content', label: 'Videoportret van Emiel Buis' },
];

function HeroCard({
  item,
  index,
  progress,
}: {
  item: (typeof stories)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const d = index - 2;
  const x = useTransform(
    progress,
    [0, 0.22, 0.43, 0.65],
    [
      `${d * 94 - 50}%`,
      `${d * 54 - 50}%`,
      `${d * 125 - 50}%`,
      `${d * 230 - 50}%`,
    ],
  );
  const y = useTransform(
    progress,
    [0, 0.24, 0.47, 0.7],
    [
      `${Math.abs(d) * 10}%`,
      `${-72 + Math.abs(d) * 5}%`,
      `${-56 + Math.abs(d) * -30}%`,
      `${d === 0 ? -80 : -160}%`,
    ],
  );
  const rotate = useTransform(
    progress,
    [0, 0.22, 0.48, 0.7],
    [d * 12, d * 5, d * -10, d * -22],
  );
  const rotateY = useTransform(progress, [0, 0.22, 0.48], [-d * 9, d * 14, 0]);
  const scale = useTransform(
    progress,
    [0, 0.25, 0.48, 0.69],
    [0.9, 1.02, d === 0 ? 1.25 : 0.95, d === 0 ? 2.3 : 0.7],
  );
  const opacity = useTransform(progress, [0.45, 0.58, 0.69], [1, 1, 0]);
  return (
    <motion.div
      className="cinema-card"
      style={
        reduced
          ? {}
          : { x, y, rotate, rotateY, scale, opacity, zIndex: 10 - Math.abs(d) }
      }
    >
      <Link href={item.href} aria-label={item.label}>
        <CampaignArt type={item.art} priority />
        <span className="cinema-card-open">
          <ArrowUpRight />
        </span>
      </Link>
    </motion.div>
  );
}

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [chapter, setChapter] = useState(0);
  useMotionValueEvent(p, 'change', (v) =>
    setChapter(v < 0.24 ? 0 : v < 0.62 ? 1 : 2),
  );
  const titleX = useTransform(p, [0, 0.25], ['0%', '-26%']);
  const secondX = useTransform(p, [0, 0.25], ['0%', '26%']);
  const titleY = useTransform(p, [0, 0.34], ['0%', '-65%']);
  const titleOpacity = useTransform(p, [0, 0.16, 0.31], [1, 1, 0]);
  const captionOpacity = useTransform(p, [0, 0.08, 0.19], [1, 1, 0]);
  const backgroundY = useTransform(p, [0, 0.55], ['40%', '-12%']);
  const backgroundOpacity = useTransform(p, [0.15, 0.3, 0.58], [0, 1, 0]);
  const mask = useTransform(
    p,
    [0.47, 0.73],
    ['inset(36% 39% 12% 39% round 14px)', 'inset(0% 0% 0% 0% round 0px)'],
  );
  const filmOpacity = useTransform(p, [0.46, 0.53], [0, 1]);
  const filmScale = useTransform(p, [0.47, 0.85], [1.55, 1]);
  const filmTextY = useTransform(p, [0.68, 0.86], [100, 0]);
  const filmTextOpacity = useTransform(p, [0.68, 0.82], [0, 1]);
  const paperY = useTransform(p, [0.9, 1], ['100%', '88%']);
  return (
    <section
      ref={ref}
      className={`cinema-hero ${reduced ? 'cinema-reduced' : ''}`}
      aria-label="Jouw verhaal in beweging"
    >
      <div className="cinema-stage">
        <motion.div
          className="cinema-intro"
          style={reduced ? {} : { y: titleY, opacity: titleOpacity }}
          inert={!reduced && chapter > 0}
        >
          <div className="cinema-intro-top">
            <Eyebrow>Persoonlijke marketing. Samen met Danny.</Eyebrow>
            <span>
              Een goed verhaal
              <br />
              verdient aandacht.
            </span>
          </div>
          <h1>
            <motion.span style={reduced ? {} : { x: titleX }}>
              Groot in beeld.
            </motion.span>
            <motion.span style={reduced ? {} : { x: secondX }}>
              Dichtbij <em>jou.</em>
              <i aria-hidden="true">✳</i>
            </motion.span>
          </h1>
          <motion.div
            className="cinema-intro-bottom"
            style={reduced ? {} : { opacity: captionOpacity }}
          >
            <p>
              Ik breng jouw verhaal naar buiten.
              <br />
              Met aandacht. Met karakter. Samen.
            </p>
            <Button href="/contact">Laten we kennismaken</Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="cinema-backtype"
          aria-hidden="true"
          style={{ y: backgroundY, opacity: backgroundOpacity }}
        >
          Laat van
          <br />
          <em>je horen.</em>
        </motion.div>
        <div className="cinema-deck" inert={!reduced && chapter === 2}>
          {stories.map((item, index) => (
            <HeroCard key={item.art} item={item} index={index} progress={p} />
          ))}
        </div>
        <motion.div
          className="cinema-film"
          style={reduced ? {} : { clipPath: mask, opacity: filmOpacity }}
          inert={!reduced && chapter !== 2}
        >
          <motion.div
            className="cinema-film-image"
            style={reduced ? {} : { scale: filmScale }}
          >
            <Image
              src="/assets/op-locatie.webp"
              alt="Content maken bij een klant in de winkel"
              fill
              sizes="100vw"
              loading="eager"
            />
          </motion.div>
          <div className="cinema-film-shade" />
          <motion.div
            className="cinema-film-copy"
            style={reduced ? {} : { y: filmTextY, opacity: filmTextOpacity }}
          >
            <span>VAN EEN GOED VERHAAL NAAR EEN GOED GEVOEL</span>
            <h2>
              Werk dat
              <br />
              <em>blijft hangen.</em>
            </h2>
            <Link href="/werk">
              Ontdek de samenwerkingen <ArrowUpRight size={24} />
            </Link>
          </motion.div>
          <span className="cinema-concept">
            Op locatie · Samen content maken
          </span>
        </motion.div>
        <div className={`cinema-hud ${chapter === 2 ? 'on-film' : ''}`}>
          <span>
            <Mouse size={15} /> Scroll om te ontdekken
          </span>
          <div>
            {['Het verhaal', 'In beweging', 'In beeld'].map((label, i) => (
              <span className={chapter === i ? 'active' : ''} key={label}>
                <b>0{i + 1}</b> {label}
              </span>
            ))}
          </div>
          <Link href="#verhaal" className="cinema-skip">
            Verder <ArrowDown size={14} />
          </Link>
        </div>
        <motion.div
          className="cinema-paper-edge"
          style={{ y: paperY }}
          aria-hidden="true"
        />
        <motion.div
          className="cinema-progress"
          style={{ scaleX: p }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function Word({
  children,
  index,
  count,
  progress,
}: {
  children: ReactNode;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const start = 0.08 + (index / count) * 0.65;
  const opacity = useTransform(progress, [start, start + 0.14], [0.16, 1]);
  return (
    <motion.span style={reduced ? {} : { opacity }}>{children} </motion.span>
  );
}
export function ManifestoScene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(p, [0, 1], ['-18%', '12%']);
  const rotate = useTransform(p, [0, 1], [-35, 55]);
  const words = [
    'Je',
    'hoeft',
    'niet',
    'harder',
    'te',
    'roepen.',
    'Wel',
    'meer',
    'jezelf',
    'te',
    'zijn.',
  ];
  return (
    <section ref={ref} className="manifesto-scene" id="verhaal">
      <motion.div
        className="manifesto-ribbon"
        style={reduced ? {} : { x }}
        aria-hidden="true"
      >
        AANDACHT MAAKT HET VERSCHIL · AANDACHT MAAKT HET VERSCHIL ·
      </motion.div>
      <div className="wrap manifesto-scene-content">
        <Eyebrow light>Niet meer lawaai. Wel meer betekenis.</Eyebrow>
        <h2 aria-label="Je hoeft niet harder te roepen. Wel meer jezelf te zijn.">
          {words.map((word, i) => (
            <Word key={i} index={i} count={words.length} progress={p}>
              {i > 6 ? <em>{word}</em> : word}
            </Word>
          ))}
        </h2>
        <div className="manifesto-scene-bottom">
          <motion.span style={reduced ? {} : { rotate }} aria-hidden="true">
            ✳
          </motion.span>
          <p>
            Je hebt iemand nodig die luistert, je verhaal begrijpt en met je
            meedenkt. Ik vertaal wie jij bent naar marketing die opvalt én bij
            je past.
          </p>
          <Button href="/over" variant="lime">
            De mens achter de marketing
          </Button>
        </div>
      </div>
    </section>
  );
}

const serviceArts: ArtType[] = ['story', 'emiel', 'kingma', 'factum'];
function ServiceChapter({
  index,
  progress,
  active,
  reduced,
}: {
  index: number;
  progress: MotionValue<number>;
  active: number;
  reduced: boolean | null;
}) {
  const service = services[index];
  const start = index === 0 ? 0 : (index - 0.72) / 4;
  const end = index === 0 ? 0.01 : index / 4;
  const y = useTransform(
    progress,
    [start, end],
    index === 0 ? ['0%', '0%'] : ['112%', '0%'],
  );
  const rotation = useTransform(
    progress,
    [start, end],
    index === 0 ? [0, 0] : [8, 0],
  );
  const scale = useTransform(progress, [index / 4, (index + 1) / 4], [1, 0.91]);
  const artY = useTransform(
    progress,
    [start, end, (index + 1) / 4],
    ['18%', '0%', '-8%'],
  );
  const artRotate = useTransform(
    progress,
    [start, end, (index + 1) / 4],
    [18, -5, -10],
  );
  return (
    <motion.article
      className={`chapter-panel chapter-${service.accent}`}
      style={reduced ? {} : { y, rotate: rotation, scale, zIndex: index + 1 }}
      inert={!reduced && active !== index}
    >
      <div className="chapter-copy">
        <span className="chapter-label">
          {service.number} / {service.label}
        </span>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <Link href={`/diensten#${service.slug}`} className="chapter-link">
          Ontdek{' '}
          {index === 0
            ? 'jouw verhaal'
            : index === 1
              ? 'de mogelijkheden'
              : index === 2
                ? 'jouw kansen'
                : 'de aanpak'}
          <ArrowUpRight />
        </Link>
      </div>
      <div className="chapter-visual">
        <span className="chapter-giant" aria-hidden="true">
          {service.number}
        </span>
        <motion.div
          className="chapter-art"
          style={reduced ? {} : { y: artY, rotate: artRotate }}
        >
          <CampaignArt type={serviceArts[index]} />
        </motion.div>
        <span className="chapter-art-tag">
          {index === 0
            ? 'Jouw verhaal, herkenbaar in beeld.'
            : index === 1
              ? 'Emiel Buis · videoportret'
              : index === 2
                ? 'La Kingma · social advertentie'
                : 'Persoonlijk contact maakt verschil.'}
        </span>
      </div>
    </motion.article>
  );
}
export function ServicesScene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, 'change', (v) =>
    setActive(Math.min(3, Math.floor(v * 4 + 0.4))),
  );
  return (
    <section
      className={`services-scene ${reduced ? 'cinema-reduced' : ''}`}
      ref={ref}
      id="diensten"
      aria-label="Wat we samen kunnen doen"
    >
      <div className="services-scene-stage">
        <div className="chapter-heading">
          <Eyebrow>Goed verhaal. Sterk naar buiten.</Eyebrow>
          <span>
            Wat we samen kunnen doen <ArrowDown size={16} />
          </span>
        </div>
        <h2 className="sr-only">Wat ik voor je kan doen</h2>
        <div className="chapter-stack">
          {services.map((s, i) => (
            <ServiceChapter
              key={s.slug}
              index={i}
              progress={p}
              active={active}
              reduced={reduced}
            />
          ))}
        </div>
        <div className="chapter-rail" aria-hidden="true">
          {services.map((s, i) => (
            <span key={s.slug} className={active === i ? 'active' : ''}>
              <b>{s.number}</b>
              {s.label}
            </span>
          ))}
        </div>
        <Link className="scene-skip" href="#over">
          Verder naar Danny <ArrowDown size={14} />
        </Link>
      </div>
    </section>
  );
}

export function PersonalScene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const clip = useTransform(
    p,
    [0.12, 0.55],
    [
      'inset(14% 25% 14% 25% round 46% 46% 4px 4px)',
      'inset(0% 0% 0% 0% round 4px 4px 4px 4px)',
    ],
  );
  const scale = useTransform(p, [0.1, 0.7], [1.3, 1]);
  const noteY = useTransform(p, [0, 1], [100, -80]);
  const wordX = useTransform(p, [0, 1], ['-12%', '10%']);
  return (
    <section ref={ref} className="personal-cinema" id="over">
      <motion.div
        className="personal-backtype"
        style={reduced ? {} : { x: wordX }}
        aria-hidden="true"
      >
        Aangenaam.
      </motion.div>
      <div className="wrap personal-cinema-grid">
        <div className="personal-cinema-picture">
          <motion.div
            className="portrait-mask"
            style={reduced ? {} : { clipPath: clip }}
          >
            <motion.div
              className="portrait-inner"
              style={reduced ? {} : { scale }}
            >
              <Image
                src="/assets/op-locatie.webp"
                alt="Content maken op locatie bij een klant, in de winkel"
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="portrait-note"
            style={reduced ? {} : { y: noteY }}
          >
            <span className="status-dot" />
            Op locatie.
            <br />
            <em>Samen maken.</em>
            <ArrowUpRight />
          </motion.div>
        </div>
        <div className="personal-cinema-copy">
          <Eyebrow>Geen bureau op afstand</Eyebrow>
          <h2>
            Groot genoeg
            <br />
            voor jouw plannen.
            <br />
            <em>
              Dichtbij genoeg
              <br />
              om je te kennen.
            </em>
          </h2>
          <p>
            Achter elk bedrijf zit een mens met een verhaal. Ik neem de tijd om
            jou te leren kennen. En blijf betrokken, van eerste idee tot
            volgende stap.
          </p>
          <ul className="check-list">
            <li>
              <Check size={17} />
              Altijd rechtstreeks contact met mij
            </li>
            <li>
              <Check size={17} />
              Eerlijk advies, in begrijpelijke taal
            </li>
            <li>
              <Check size={17} />
              Een aanpak die bij jou past
            </li>
          </ul>
          <Button href="/over" variant="outline">
            Meer over Danny
          </Button>
        </div>
      </div>
    </section>
  );
}

function FloatingResult({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const positions = [
    [-125, -35, -14],
    [115, -48, 11],
    [110, 90, -8],
  ];
  const [sx, sy, r] = positions[index];
  const x = useTransform(
    progress,
    [0.06, 0.48, 0.72],
    [`${sx}%`, `${sx * 0.55}%`, '0%'],
  );
  const y = useTransform(
    progress,
    [0.06, 0.48, 0.72],
    [`${sy}%`, `${sy * 0.3}%`, '0%'],
  );
  const rotate = useTransform(progress, [0.06, 0.65], [r, 0]);
  const opacity = useTransform(progress, [0, 0.1, 0.48, 0.66], [0, 1, 1, 0]);
  return (
    <motion.div
      className={`floating-result result-${index}`}
      style={{ x, y, rotate, opacity }}
      aria-hidden="true"
    >
      <span>
        {['Nieuwe aanvragen', 'Jouw campagne', 'Samen vooruit'][index]}
      </span>
      <strong>
        {[String(demoMonthLeads), 'In beeld.', 'Elke dag.'][index]}
      </strong>
      {index === 0 ? (
        <div className="mini-bars">
          {[25, 40, 31, 63, 44, 76, 55, 92, 72, 100].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      ) : index === 1 ? (
        <Sparkles size={42} />
      ) : (
        <ArrowUpRight size={48} />
      )}
      <small>Voorbeeldgegevens</small>
    </motion.div>
  );
}
export function PortalScene({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const [ready, setReady] = useState(false);
  useMotionValueEvent(p, 'change', (v) => setReady(v > 0.78));
  const titleY = useTransform(p, [0, 0.5], ['0%', '-135%']);
  const titleOpacity = useTransform(p, [0.12, 0.45], [1, 0]);
  const rotateX = useTransform(p, [0.06, 0.7], [64, 0]);
  const scale = useTransform(p, [0, 0.35, 0.78], [0.46, 0.58, 1]);
  const y = useTransform(p, [0, 0.35, 0.78], ['40%', '25%', '0%']);
  const opacity = useTransform(p, [0, 0.15], [0.2, 1]);
  return (
    <section
      ref={ref}
      className={`portal-scene ${reduced ? 'cinema-reduced' : ''}`}
      id="inzicht"
    >
      <div className="portal-scene-stage">
        <motion.div
          className="portal-scene-title"
          style={reduced ? {} : { y: titleY, opacity: titleOpacity }}
        >
          <Eyebrow>Jij kijkt gewoon mee</Eyebrow>
          <h2>
            Van groot in beeld.
            <br />
            Naar <em>helder inzicht.</em>
          </h2>
          <p>
            Campagnes, cijfers en gesprekken.
            <br />
            Alles komt samen in jouw eigen overzicht.
          </p>
        </motion.div>
        <div className="portal-scene-perspective">
          <motion.div
            className="portal-scene-screen"
            style={reduced ? {} : { rotateX, scale, y, opacity }}
            inert={!reduced && !ready}
          >
            {children}
          </motion.div>
          {!reduced &&
            [0, 1, 2].map((i) => (
              <FloatingResult key={i} index={i} progress={p} />
            ))}
        </div>
        <div className="portal-scene-footer">
          <span>Interactief voorbeeld · fictieve gegevens</span>
          <Link href="/inzicht">
            Ontdek jouw klantportaal <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
