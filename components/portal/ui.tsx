// Adapted from Ads-manager- c0739d7; UI retained, data isolated to this public demo.
'use client';

import { PIcon } from './icons';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`p-skeleton ${className}`} aria-hidden="true" />;
}

export function ErrorState({
  message,
  onRetry,
  compact = false,
}: {
  message: string;
  onRetry: () => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`p-error ${compact ? 'is-compact' : 'p-glass'}`}
      role="alert"
    >
      <span className="p-error-icon">
        <PIcon name="alert" size={compact ? 18 : 24} />
      </span>
      <div>
        {!compact && <h2>Dat lukte even niet</h2>}
        <p>{message}</p>
      </div>
      <button type="button" className="p-btn p-btn-secondary" onClick={onRetry}>
        <PIcon name="refresh" size={18} /> Opnieuw proberen
      </button>
    </div>
  );
}
