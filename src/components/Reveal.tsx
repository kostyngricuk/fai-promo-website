import type { ReactNode } from 'react';
import { AnimatedContent, FadeContent } from './reactbits';
import { useDeck } from './DeckContext';

interface RevealProps {
  children: ReactNode;
  /** Slide-in distance in px. */
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  /** Slide in from the other side. */
  reverse?: boolean;
  delay?: number;
  className?: string;
}

/**
 * Project-wide wrapper around React Bits' `AnimatedContent`, so every slide
 * shares one entrance feel and reduced-motion is handled in a single place.
 */
export function Reveal({
  children,
  distance = 36,
  direction = 'vertical',
  reverse = false,
  delay = 0,
  className = ''
}: RevealProps) {
  const { reduceMotion } = useDeck();

  if (reduceMotion) return <div className={`reveal ${className}`}>{children}</div>;

  return (
    <AnimatedContent
      className={`reveal ${className}`}
      distance={distance}
      direction={direction}
      reverse={reverse}
      duration={0.7}
      ease="power3.out"
      delay={delay}
      threshold={0.05}
    >
      {children}
    </AnimatedContent>
  );
}

interface FadeProps {
  children: ReactNode;
  delay?: number;
  blur?: boolean;
  className?: string;
}

/** The quieter sibling — no travel, just opacity. Used for tables and lists. */
export function Fade({ children, delay = 0, blur = true, className = '' }: FadeProps) {
  const { reduceMotion } = useDeck();

  if (reduceMotion) return <div className={`reveal ${className}`}>{children}</div>;

  return (
    <FadeContent className={`reveal ${className}`} blur={blur} duration={700} delay={delay} threshold={0.05}>
      {children}
    </FadeContent>
  );
}
