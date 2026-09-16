import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, getDictionary, getHtmlLang, type LocaleCode } from '../i18n';
import { DeckContext } from './DeckContext';
import Rail from './Rail';
import { ClickSpark } from './reactbits';
import { SLIDES } from './slides';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** How long a finished slide stays on screen during auto-play. */
const DWELL_TERMINAL = 2600;
const DWELL_PLAIN = 4200;
/** Beat allowed for the entrance reveals of a slide that has no terminal. */
const REVEAL_BEAT = 1400;

export default function Deck() {
  const [index, setIndex] = useState(0);
  const [locale, setLocale] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [autoplay, setAutoplay] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const dict = useMemo(() => getDictionary(locale), [locale]);
  const slide = SLIDES[index];

  const sceneDone = useCallback(() => setSceneReady(true), []);

  const go = useCallback((next: number) => {
    setIndex(current => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
      return clamped === current ? current : clamped;
    });
  }, []);

  /** Any manual navigation cancels auto-play, matching the original deck. */
  const goManually = useCallback(
    (next: number) => {
      setAutoplay(false);
      go(next);
    },
    [go]
  );

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(locale);
  }, [locale]);

  // A new slide (or a new language) restarts the entrance choreography.
  useEffect(() => {
    setSceneReady(false);
    if (slide.hasTerminal && !reduceMotion) return; // the terminal reports for itself
    const timer = window.setTimeout(() => setSceneReady(true), reduceMotion ? 0 : REVEAL_BEAT);
    return () => window.clearTimeout(timer);
  }, [index, locale, slide.hasTerminal, reduceMotion]);

  // Auto-play only counts down once the slide has finished introducing itself.
  useEffect(() => {
    if (!autoplay || !sceneReady) return;
    const timer = window.setTimeout(
      () => {
        if (index < SLIDES.length - 1) go(index + 1);
        else setAutoplay(false);
      },
      slide.hasTerminal ? DWELL_TERMINAL : DWELL_PLAIN
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, sceneReady, index, slide.hasTerminal, go]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          event.preventDefault();
          goManually(index + 1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault();
          goManually(index - 1);
          break;
        case 'Home':
          goManually(0);
          break;
        case 'End':
          goManually(SLIDES.length - 1);
          break;
        case 'p':
        case 'P':
          setAutoplay(value => !value);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, goManually]);

  /** Clicking the slide surface advances, but never when a control was hit. */
  const onDeckClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a, button, input, select, textarea')) return;
    goManually(index + 1);
  };

  const context = useMemo(() => ({ reduceMotion, sceneDone }), [reduceMotion, sceneDone]);
  const Slide = slide.Component;

  return (
    <DeckContext.Provider value={context}>
      <ClickSpark
        sparkColor="#2f7d4f"
        sparkSize={8}
        sparkRadius={16}
        sparkCount={8}
        duration={420}
        easing="ease-out"
      >
        <div className="deck" onClick={onDeckClick}>
          {/*
            Keyed on both slide and locale: remounting is what replays every
            entrance animation, including the ones React Bits drives with GSAP.
          */}
          <section className="slide" key={`${locale}-${slide.id}`} aria-roledescription="slide">
            <Slide dict={dict} />
          </section>
        </div>

        <Rail
          ui={dict.ui}
          index={index}
          total={SLIDES.length}
          autoplay={autoplay}
          locale={locale}
          onGo={goManually}
          onToggleAuto={() => setAutoplay(value => !value)}
          onLocale={next => {
            setAutoplay(false);
            setLocale(next);
          }}
        />
      </ClickSpark>
    </DeckContext.Provider>
  );
}
