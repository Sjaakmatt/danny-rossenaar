'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { CampaignArt } from './campaign-art';
import { Eyebrow } from './ui';
import { showcase, type ShowcaseItem } from '@/lib/showcase';

function ReelVideo({
  item,
  active,
}: {
  item: Extract<ShowcaseItem, { kind: 'video' }>;
  active: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(video, { amount: 0.4 });
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (active && inView && !reduced)
      void element.play().catch(() => setPlaying(false));
    else {
      element.pause();
      setMuted(true);
    }
  }, [active, inView, reduced]);
  return (
    <>
      <video
        ref={video}
        src={item.src}
        poster={item.poster}
        muted={muted}
        loop
        playsInline
        preload={active ? 'metadata' : 'none'}
        aria-label={item.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setError(true)}
      />
      {active && !error && (
        <div className="reel-video-controls">
          <button
            type="button"
            className="reel-media-control"
            aria-label={playing ? 'Video pauzeren' : 'Video afspelen'}
            onClick={() => {
              if (playing) video.current?.pause();
              else void video.current?.play().catch(() => setPlaying(false));
            }}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
          {item.hasAudio && (
            <button
              type="button"
              className="reel-media-control"
              aria-label={muted ? 'Geluid aanzetten' : 'Geluid uitzetten'}
              aria-pressed={!muted}
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          )}
        </div>
      )}
      {error && active && (
        <span className="reel-video-error">Video kan niet worden geladen.</span>
      )}
    </>
  );
}
function Reel({
  item,
  index,
  active,
  step,
  scroll,
  choose,
  suspended,
}: {
  item: ShowcaseItem;
  index: number;
  active: boolean;
  step: number;
  scroll: MotionValue<number>;
  choose: () => void;
  suspended: boolean;
}) {
  const reduced = useReducedMotion();
  const distance = useTransform(scroll, (x) => (index * step - x) / step);
  const scale = useTransform(distance, (d) =>
    reduced ? 1 : 1 - Math.min(Math.abs(d), 3) * 0.095,
  );
  const rotateY = useTransform(distance, (d) =>
    reduced ? 0 : Math.sign(d) * -Math.min(Math.abs(d) * 13, 27),
  );
  const depth = useTransform(distance, (d) =>
    reduced ? 0 : -Math.min(Math.abs(d), 3) * 75,
  );
  const blur = useTransform(
    distance,
    (d) => `blur(${reduced ? 0 : Math.min(Math.abs(d) * 0.85, 2.5)}px)`,
  );
  const opacity = useTransform(distance, (d) =>
    Math.abs(d) <= 2
      ? 1 - Math.abs(d) * 0.18
      : Math.max(0, 0.64 - (Math.abs(d) - 2) * 0.64),
  );
  const layer = useTransform(distance, (d) => 20 - Math.round(Math.abs(d) * 4));
  return (
    <motion.div className="reel-cell" style={{ zIndex: layer }}>
      <motion.article
        className={`reel-card ${item.fit === 'contain' ? 'reel-contain' : ''} ${active ? 'is-active' : ''}`}
        style={{
          scale,
          rotateY,
          z: depth,
          filter: blur,
          opacity,
          zIndex: layer,
        }}
        aria-roledescription="dia"
        aria-label={`${index + 1} van ${showcase.length}: ${item.title}`}
        aria-hidden={!active}
      >
        {item.kind === 'art' ? (
          <CampaignArt type={item.art} />
        ) : item.kind === 'image' ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 760px) 68vw, 340px"
            draggable={false}
          />
        ) : (
          <ReelVideo item={item} active={active && !suspended} />
        )}
        <div className="reel-shade" />
        <span className="reel-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="reel-label">{item.label}</span>
        {!active && (
          <button
            type="button"
            className="reel-select"
            tabIndex={-1}
            aria-label={`Toon ${item.title}`}
            onClick={choose}
          />
        )}
      </motion.article>
    </motion.div>
  );
}
export function ContentShowcase() {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [instagram, setInstagram] = useState<string | null>(null);
  useEffect(() => {
    if (instagram) dialog.current?.showModal();
  }, [instagram]);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(2);
  const [step, setStep] = useState(205);
  const reduced = useReducedMotion();
  const { scrollX } = useScroll({ container: track });
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(
    null,
  );
  const dragged = useRef(false);
  const activeRef = useRef(2);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    const element = track.current;
    if (!element) return;
    const resize = () => {
      const width =
        element.querySelector<HTMLElement>('.reel-cell')?.offsetWidth ?? 205;
      setStep(width);
      element.scrollTo({
        left: activeRef.current * width,
        behavior: 'instant',
      });
      initialized.current = true;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const choose = (index: number) => {
    const next = Math.max(0, Math.min(showcase.length - 1, index));
    track.current?.scrollTo({
      left: next * step,
      behavior: reduced ? 'instant' : 'smooth',
    });
  };
  const finishDrag = () => {
    const gesture = drag.current;
    drag.current = null;
    track.current?.removeAttribute('data-dragging');
    if (gesture?.moved)
      choose(Math.round((track.current?.scrollLeft ?? 0) / step));
  };
  return (
    <section
      id="content"
      className="content-showcase"
      aria-labelledby={id}
      aria-roledescription="carrousel"
    >
      <div className="showcase-head wrap">
        <div>
          <Eyebrow>Verhalen om bij stil te staan</Eyebrow>
          <h2 id={id}>
            Niet zomaar content.
            <br />
            <em>Een wereld om in te stappen.</em>
          </h2>
        </div>
        <p>
          Een gezicht. Een moment. Een eigen verhaal.
          <br />
          Blader door het beeld.
        </p>
      </div>
      <div className="showcase-shell">
        <span className="showcase-backtype" aria-hidden="true">
          in beeld.
        </span>
        <div
          ref={track}
          className="reel-track"
          tabIndex={0}
          aria-label="Contentgalerij. Gebruik pijltjestoetsen of scroll horizontaal."
          onScroll={() => {
            if (!initialized.current || !track.current) return;
            const next = Math.max(
              0,
              Math.min(
                showcase.length - 1,
                Math.round(track.current.scrollLeft / step),
              ),
            );
            activeRef.current = next;
            setActive(next);
          }}
          onKeyDown={(event) => {
            if (
              ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
            ) {
              event.preventDefault();
              choose(
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? showcase.length - 1
                    : active + (event.key === 'ArrowRight' ? 1 : -1),
              );
            }
          }}
          onPointerDown={(event) => {
            if (
              event.pointerType !== 'mouse' ||
              event.button !== 0 ||
              (event.target as HTMLElement).closest('.reel-media-control')
            )
              return;
            dragged.current = false;
            drag.current = {
              x: event.clientX,
              scroll: event.currentTarget.scrollLeft,
              moved: false,
            };
          }}
          onPointerMove={(event) => {
            const gesture = drag.current;
            if (!gesture) return;
            const delta = event.clientX - gesture.x;
            if (Math.abs(delta) > 6) {
              gesture.moved = true;
              dragged.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.setAttribute('data-dragging', 'true');
            }
            if (gesture.moved)
              event.currentTarget.scrollLeft = gesture.scroll - delta;
          }}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onClickCapture={(event) => {
            if (dragged.current) {
              event.preventDefault();
              event.stopPropagation();
              dragged.current = false;
            }
          }}
        >
          {showcase.map((item, index) => (
            <Reel
              key={item.title}
              item={item}
              index={index}
              active={index === active}
              suspended={Boolean(instagram)}
              step={step}
              scroll={scrollX}
              choose={() => choose(index)}
            />
          ))}
        </div>
        <div className="reel-arrows">
          <button
            type="button"
            onClick={() => choose(active - 1)}
            disabled={active === 0}
            aria-label="Vorig beeld"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => choose(active + 1)}
            disabled={active === showcase.length - 1}
            aria-label="Volgend beeld"
          >
            <ArrowRight />
          </button>
        </div>
        <div className="reel-dots" aria-label="Kies een beeld">
          {showcase.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => choose(index)}
              aria-label={`Beeld ${index + 1}: ${item.title}`}
              aria-pressed={index === active}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
      <div className="showcase-caption wrap">
        <div aria-live="polite" aria-atomic="true">
          <span>
            {String(active + 1).padStart(2, '0')} /{' '}
            {String(showcase.length).padStart(2, '0')} —{' '}
            {showcase[active].label}
          </span>
          <h3>{showcase[active].title}</h3>
        </div>
        {showcase[active].href && (
          <Link
            className="text-link"
            href={showcase[active].href!}
            target={
              showcase[active].href!.startsWith('https:') ? '_blank' : undefined
            }
            rel={
              showcase[active].href!.startsWith('https:')
                ? 'noreferrer'
                : undefined
            }
          >
            {showcase[active].linkLabel ?? 'Leer Danny kennen'}{' '}
            <ArrowUpRight size={19} />
          </Link>
        )}
        <small>Sleep of swipe · scroll opzij</small>
      </div>
      <div className="instagram-reels wrap">
        <span>Ook in beeld bij Chikado</span>
        <button type="button" onClick={() => setInstagram('DXrT7lHCJUX')}>
          <Play size={15} /> De klantervaring <ArrowUpRight size={16} />
        </button>
        <button type="button" onClick={() => setInstagram('DXjFIFhjoc6')}>
          <Play size={15} /> In de winkel <ArrowUpRight size={16} />
        </button>
        <small>Bekijk via Instagram</small>
      </div>
      <dialog
        className="reel-dialog"
        ref={dialog}
        onClose={() => setInstagram(null)}
        aria-label="Chikado op Instagram"
      >
        <div className="reel-dialog-head">
          <span>Chikado · Instagram</span>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Reel sluiten"
          >
            <X size={22} />
          </button>
        </div>
        {instagram && (
          <iframe
            title="Chikado Instagram-reel"
            src={`https://www.instagram.com/reel/${instagram}/embed/`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        )}
        {instagram && (
          <a
            href={`https://www.instagram.com/reel/${instagram}/`}
            target="_blank"
            rel="noreferrer"
          >
            Open op Instagram <ArrowUpRight size={15} />
          </a>
        )}
      </dialog>
    </section>
  );
}
