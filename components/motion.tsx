'use client';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef, type ReactNode, type PointerEvent } from 'react';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [24, 0], opacity: [0.35, 1] }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Spotlight({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
    ref.current?.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
  }
  return (
    <div ref={ref} onPointerMove={move} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}

export function Unfold({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'center center'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  return (
    <div ref={target} className="unfold-frame">
      <motion.div
        style={reduced ? {} : { rotateX, scale, transformOrigin: 'center top' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
