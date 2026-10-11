'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { reviews } from '@/lib/content';
import { Eyebrow } from './ui';
export function Reviews() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  return (
    <section className="reviews-section wrap" id="reviews">
      <div className="review-side">
        <Eyebrow>Van mens tot mens</Eyebrow>
        <h2>
          Dat zeggen
          <br />
          <em>zij ervan.</em>
        </h2>
        <p>
          Een paar woorden van de mensen
          <br />
          met wie ik samenwerk.
        </p>
        <div className="review-controls">
          <button
            aria-label="Vorige review"
            onClick={() =>
              setIndex((index + reviews.length - 1) % reviews.length)
            }
          >
            <ArrowLeft size={20} />
          </button>
          <span>{String(index + 1).padStart(2, '0')} / 04</span>
          <button
            aria-label="Volgende review"
            onClick={() => setIndex((index + 1) % reviews.length)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="review-content" aria-live="polite" aria-atomic="true">
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        <blockquote>{review.text}</blockquote>
        <div className="review-person">
          <span>{review.initials}</span>
          <div>
            <strong>{review.name}</strong>
            <p>{review.company}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
