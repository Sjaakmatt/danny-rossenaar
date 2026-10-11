'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Button, Eyebrow } from './ui';
import styles from './hero.module.css';

export function CinematicHero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const manuallyStarted = useRef(false);
  const reduced = useReducedMotion();
  const visible = useInView(video, { amount: 0.2 });
  const { scrollYProgress: p } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });
  const [chapter, setChapter] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  useMotionValueEvent(p, 'change', (value) =>
    setChapter(value < 0.22 ? 0 : value < 0.62 ? 1 : 2),
  );
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const sync = () => {
      if (
        visible &&
        chapter < 2 &&
        !paused &&
        (!reduced || manuallyStarted.current) &&
        !document.hidden
      )
        void element.play().catch(() => setPlaying(false));
      else element.pause();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      element.pause();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [visible, chapter, paused, reduced]);

  const pointerX = useSpring(0, { stiffness: 80, damping: 22 });
  const pointerY = useSpring(0, { stiffness: 80, damping: 22 });
  const introX = useTransform(p, [0, 0.3], ['0%', '-40%']);
  const introOpacity = useTransform(p, [0, 0.13, 0.29], [1, 1, 0]);
  const lowerX = useTransform(p, [0, 0.3], ['0%', '20%']);
  const reelX = useTransform(p, [0, 0.32, 0.62], ['0%', '-85%', '-240%']);
  const reelY = useTransform(p, [0, 0.32, 0.62], ['0%', '7%', '-35%']);
  const reelRotate = useTransform(p, [0, 0.32, 0.62], [6, -7, -22]);
  const reelScale = useTransform(p, [0, 0.32, 0.62], [1, 1.12, 0.8]);
  const adX = useTransform(p, [0, 0.32, 0.62], ['0%', '-160%', '-280%']);
  const adY = useTransform(p, [0, 0.32, 0.62], ['0%', '-110%', '-230%']);
  const adRotate = useTransform(p, [0, 0.32, 0.62], [-12, -20, -40]);
  const photoX = useTransform(p, [0, 0.32, 0.62], ['0%', '-40%', '60%']);
  const photoY = useTransform(p, [0, 0.32, 0.62], ['0%', '30%', '-20%']);
  const photoRotate = useTransform(p, [0, 0.32, 0.62], [15, 8, 25]);
  const layersOpacity = useTransform(p, [0.48, 0.64], [1, 0]);
  const backOpacity = useTransform(p, [0.12, 0.28, 0.53, 0.63], [0, 1, 1, 0]);
  const backScale = useTransform(p, [0.2, 0.6], [0.8, 1.2]);
  const filmMask = useTransform(
    p,
    [0.48, 0.76],
    ['inset(35% 38% 8% 38% round 16px)', 'inset(0% 0% 0% 0% round 0px)'],
  );
  const filmOpacity = useTransform(p, [0.48, 0.55], [0, 1]);
  const filmScale = useTransform(p, [0.48, 0.85], [1.5, 1]);
  const filmCopyY = useTransform(p, [0.7, 0.85], [80, 0]);
  const filmCopyOpacity = useTransform(p, [0.7, 0.82], [0, 1]);

  return (
    <section
      ref={section}
      className={styles.hero}
      aria-label="Jouw verhaal in beweging"
    >
      <div
        ref={stage}
        className={styles.stage}
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== 'mouse') return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set((event.clientX - rect.left - rect.width / 2) * 0.012);
          pointerY.set((event.clientY - rect.top - rect.height / 2) * 0.012);
        }}
        onPointerLeave={() => {
          pointerX.set(0);
          pointerY.set(0);
        }}
      >
        <motion.div
          className={styles.backdrop}
          style={reduced ? {} : { opacity: introOpacity }}
          aria-hidden="true"
        >
          <span>persoonlijk werkt.</span>
        </motion.div>
        <motion.div
          className={styles.intro}
          style={reduced ? {} : { x: introX, opacity: introOpacity }}
          inert={!reduced && chapter > 0}
        >
          <Eyebrow>Marketing begint bij mensen.</Eyebrow>
          <h1>
            <span>Groot in</span>
            <span className={styles.titleSecond}>
              beeld<span className={styles.period}>.</span>
              <i aria-hidden="true">✳</i>
            </span>
            <motion.em style={reduced ? {} : { x: lowerX }}>
              Dichtbij jou.
            </motion.em>
          </h1>
          <div className={styles.introBottom}>
            <p>
              Jouw verhaal verdient meer dan een vluchtige blik.
              <br />
              Ik maak het zichtbaar. Samen met jou.
            </p>
            <div className={styles.actions}>
              <Button href="/contact">Laten we kennismaken</Button>
              <Link href="#content" className={styles.workLink}>
                Bekijk het werk <ArrowDown size={16} />
              </Link>
            </div>
          </div>
          <Link className={styles.signature} href="/over">
            <Image
              src="/assets/danny-hero.jpg"
              width={42}
              height={42}
              alt="Danny Rossenaar"
            />
            <span>
              Geen bureau op afstand.<strong>Gewoon Danny. Aangenaam.</strong>
            </span>
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>
        <motion.div
          className={styles.backtype}
          style={reduced ? {} : { opacity: backOpacity, scale: backScale }}
          aria-hidden="true"
        >
          Laat van
          <br />
          <em>je horen.</em>
        </motion.div>
        <motion.div
          className={styles.collage}
          style={
            reduced ? {} : { x: pointerX, y: pointerY, opacity: layersOpacity }
          }
          inert={!reduced && chapter === 2}
        >
          <motion.div
            className={styles.photo}
            style={reduced ? {} : { x: photoX, y: photoY, rotate: photoRotate }}
          >
            <Link href="/over" aria-label="Samen content maken op locatie">
              <Image
                src="/assets/op-locatie.webp"
                fill
                sizes="(max-width: 760px) 37vw, 22vw"
                alt="Danny maakt content bij de klant in de winkel"
                loading="eager"
              />
              <span>
                OP LOCATIE <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>
          <motion.div
            className={styles.reel}
            style={
              reduced
                ? {}
                : { x: reelX, y: reelY, rotate: reelRotate, scale: reelScale }
            }
          >
            <div className={styles.reelHeader}>
              <span>
                <i /> In beeld met Emiel
              </span>
              <span>01 — VIDEO</span>
            </div>
            <div className={styles.reelPicture}>
              <video
                ref={video}
                src="/media/emiel-buis.mp4"
                poster="/media/emiel-buis.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Emiel Buis vertelt over zijn zaak"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
              <button
                type="button"
                className={styles.play}
                aria-label={
                  playing ? 'Hero-video pauzeren' : 'Hero-video afspelen'
                }
                onClick={() => {
                  if (playing) {
                    setPaused(true);
                    video.current?.pause();
                  } else {
                    manuallyStarted.current = true;
                    setPaused(false);
                    void video.current?.play().catch(() => setPlaying(false));
                  }
                }}
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
            </div>
            <Link className={styles.reelFooter} href="#content">
              <span>Echte mensen. Eigen verhalen.</span>
              <ArrowUpRight size={20} />
            </Link>
          </motion.div>
          <motion.div
            className={styles.ad}
            style={reduced ? {} : { x: adX, y: adY, rotate: adRotate }}
          >
            <Link
              href="/werk/chocolate-planet"
              aria-label="Bekijk het werk voor Chocolate Planet"
            >
              <Image
                src="/media/chocolate-planet-bonbons.jpg"
                fill
                sizes="(max-width: 760px) 31vw, 19vw"
                alt="Chocolate Planet advertentie voor handgemaakte paasbonbons"
                loading="eager"
              />
            </Link>
            <span className={styles.adNote}>
              Klein gebaar.
              <br />
              <em>Groot effect.</em>
            </span>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.film}
          style={reduced ? {} : { clipPath: filmMask, opacity: filmOpacity }}
          inert={!reduced && chapter !== 2}
        >
          <motion.div
            className={styles.filmImage}
            style={reduced ? {} : { scale: filmScale }}
          >
            <Image
              src="/assets/op-locatie.webp"
              alt="Samen content maken in de winkel van een klant"
              fill
              sizes="100vw"
              loading="eager"
            />
          </motion.div>
          <div className={styles.filmShade} />
          <motion.div
            className={styles.filmCopy}
            style={reduced ? {} : { y: filmCopyY, opacity: filmCopyOpacity }}
          >
            <span>HET BESTE VERHAAL? DAT VAN JOU.</span>
            <h2>
              Werk dat
              <br />
              <em>blijft hangen.</em>
            </h2>
            <Link href="/werk">
              Ontdek de samenwerkingen <ArrowUpRight size={24} />
            </Link>
          </motion.div>
          <span className={styles.filmNote}>
            Op locatie · Samen content maken
          </span>
        </motion.div>
        <div className={`${styles.hud} ${chapter === 2 ? styles.onFilm : ''}`}>
          <span>
            <ArrowDown size={15} /> Scroll. Er zit meer achter.
          </span>
          <div>
            {['Het verhaal', 'In beweging', 'In beeld'].map((label, i) => (
              <span className={chapter === i ? styles.active : ''} key={label}>
                <b>0{i + 1}</b> {label}
              </span>
            ))}
          </div>
          <Link href="#verhaal">
            Verder <ArrowDown size={14} />
          </Link>
        </div>
        <motion.div
          className={styles.progress}
          style={{ scaleX: p }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
