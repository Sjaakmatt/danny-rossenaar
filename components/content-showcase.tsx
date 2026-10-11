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
} from 'lucide-react';
import { CampaignArt } from './campaign-art';
import { Eyebrow } from './ui';
import { showcase, type ShowcaseItem } from '@/lib/showcase';

const count = showcase.length;
const loopItems = [...showcase, ...showcase, ...showcase];
const itemIndex = (position: number) => ((position % count) + count) % count;

function ReelVideo({
  item,
  active,
}: {
  item: Extract<ShowcaseItem, { kind: 'video' }>;
  active: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(frame, { amount: 0.4 });
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState(false);
  const [manuallyStarted, setManuallyStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const loadVideo =
    active && inView && (manuallyStarted || (!reduced && !saveData));
  useEffect(() => {
    setSaveData(
      Boolean(
        (
          navigator as Navigator & {
            connection?: { saveData?: boolean };
          }
        ).connection?.saveData,
      ),
    );
  }, []);
  useEffect(() => {
    if (!active) {
      setManuallyStarted(false);
      setPaused(false);
      setError(false);
    }
  }, [active]);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const sync = () => {
      if (loadVideo && !paused && !document.hidden)
        void element.play().catch(() => setPlaying(false));
      else element.pause();
    };
    if (!loadVideo) {
      // Removing src and resetting the media element aborts outstanding video
      // transfers, including duplicate copies in the infinite carousel.
      element.removeAttribute('src');
      element.load();
      setMuted(true);
      setPlaying(false);
      setHasFrame(false);
    }
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => {
      element.pause();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [loadVideo, paused]);
  return (
    <div ref={frame} className="reel-video-frame">
      <Image
        src={item.poster}
        alt=""
        fill
        sizes="(max-width: 760px) 68vw, 340px"
        draggable={false}
      />
      <video
        ref={video}
        src={loadVideo ? item.src : undefined}
        muted={muted}
        loop
        playsInline
        preload="none"
        aria-label={item.alt}
        className={hasFrame ? 'has-video-frame' : undefined}
        onLoadedData={() => setHasFrame(true)}
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
              if (playing) {
                setPaused(true);
                video.current?.pause();
              } else {
                setManuallyStarted(true);
                setPaused(false);
                if (loadVideo)
                  void video.current?.play().catch(() => setPlaying(false));
              }
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
    </div>
  );
}
function Reel({
  item,
  index,
  active,
  loadMedia,
  step,
  scroll,
  choose,
}: {
  item: ShowcaseItem;
  index: number;
  active: boolean;
  loadMedia: boolean;
  step: number;
  scroll: MotionValue<number>;
  choose: () => void;
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
        aria-label={`${itemIndex(index) + 1} van ${count}: ${item.title}`}
        aria-hidden={!active}
      >
        {!loadMedia ? null : item.kind === 'art' ? (
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
          <ReelVideo item={item} active={active} />
        )}
        <div className="reel-shade" />
        <span className="reel-number" aria-hidden="true">
          {String(itemIndex(index) + 1).padStart(2, '0')}
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
  const section = useRef<HTMLElement>(null);
  const nearViewport = useInView(section, { margin: '300px 0px', once: true });
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(count + 2);
  const active = itemIndex(position);
  const [step, setStep] = useState(205);
  const stepRef = useRef(205);
  const reduced = useReducedMotion();
  const { scrollX } = useScroll({ container: track });
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(
    null,
  );
  const dragged = useRef(false);
  const activeRef = useRef(count + 2);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    const element = track.current;
    if (!element) return;
    const resize = () => {
      const width =
        element.querySelector<HTMLElement>('.reel-cell')?.offsetWidth ?? 205;
      stepRef.current = width;
      setStep(width);
      element.scrollTo({
        left: activeRef.current * width,
        behavior: 'instant',
      });
      scrollX.set(element.scrollLeft);
      initialized.current = true;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [scrollX]);

  // Rebase onto an identical middle copy after scrolling settles. The visual
  // neighbours stay the same, so crossing either boundary never reveals an end.
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let timer: ReturnType<typeof setTimeout>;
    const settle = () => {
      if (drag.current || !initialized.current) return;
      const width = stepRef.current;
      if (
        element.querySelector<HTMLElement>('.reel-cell')?.offsetWidth !== width
      )
        return;
      const current = Math.round(element.scrollLeft / width);
      if (current >= count && current < count * 2) return;
      const middle = count + itemIndex(current);
      const left = element.scrollLeft + (middle - current) * width;
      activeRef.current = middle;
      setPosition(middle);
      element.scrollTo({ left, behavior: 'instant' });
      scrollX.set(left);
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(settle, 160);
    };
    element.addEventListener('scrollend', settle);
    element.addEventListener('scroll', schedule, { passive: true });
    return () => {
      clearTimeout(timer);
      element.removeEventListener('scrollend', settle);
      element.removeEventListener('scroll', schedule);
    };
  }, [scrollX]);

  const choosePosition = (next: number) => {
    track.current?.scrollTo({
      left: next * stepRef.current,
      behavior: reduced ? 'instant' : 'smooth',
    });
  };
  const choose = (index: number) => {
    const current = activeRef.current;
    let delta = index - itemIndex(current);
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    choosePosition(current + delta);
  };
  const advance = (direction: number) =>
    choosePosition(activeRef.current + direction);
  const finishDrag = () => {
    const gesture = drag.current;
    drag.current = null;
    track.current?.removeAttribute('data-dragging');
    if (gesture?.moved)
      choosePosition(
        Math.round((track.current?.scrollLeft ?? 0) / stepRef.current),
      );
  };
  return (
    <section
      ref={section}
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
          aria-label="Doorlopende contentgalerij. Gebruik pijltjestoetsen of scroll horizontaal."
          onScroll={() => {
            if (!initialized.current || !track.current) return;
            // Native scroll anchoring may fire before ResizeObserver. Keep the
            // current item until the track has been measured at its new width.
            if (
              track.current.querySelector<HTMLElement>('.reel-cell')
                ?.offsetWidth !== stepRef.current
            )
              return;
            const next = Math.round(track.current.scrollLeft / stepRef.current);
            activeRef.current = next;
            setPosition(next);
          }}
          onKeyDown={(event) => {
            if (
              ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
            ) {
              event.preventDefault();
              if (event.key === 'Home') choose(0);
              else if (event.key === 'End') choose(count - 1);
              else advance(event.key === 'ArrowRight' ? 1 : -1);
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
          {loopItems.map((item, index) => (
            <Reel
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              active={index === position}
              loadMedia={nearViewport && Math.abs(index - position) <= 3}
              step={step}
              scroll={scrollX}
              choose={() => choosePosition(index)}
            />
          ))}
        </div>
        <div className="reel-arrows">
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Vorig beeld"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
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
    </section>
  );
}
