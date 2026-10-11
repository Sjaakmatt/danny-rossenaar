'use client';

import {
  useReducedMotion,
  useScroll,
  useSpring,
  type UseScrollOptions,
} from 'motion/react';

export function useSceneProgress(options: UseScrollOptions) {
  const { scrollYProgress } = useScroll(options);
  const reduced = useReducedMotion();
  // Damping above the critical value prevents bounce on a fast scroll or
  // direction change. Tight rest thresholds avoid snapping normalized progress.
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.6,
    restDelta: 0.00001,
    restSpeed: 0.0001,
  });
  return reduced ? scrollYProgress : progress;
}
