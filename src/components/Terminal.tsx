import { useEffect, useState } from 'react';
import type { TermScript, TermSpan } from '../i18n/term';
import { useDeck } from './DeckContext';

interface TerminalProps {
  /** Shown in the title bar — a working directory or a file path. */
  path: string;
  script: TermScript;
}

const TONE_CLASS = {
  green: 'tone-green',
  amber: 'tone-amber',
  red: 'tone-red',
  muted: 'tone-muted',
  bold: 'tone-bold'
} as const;

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

function Spans({ spans }: { spans: readonly TermSpan[] }) {
  return (
    <>
      {spans.map((span, i) =>
        span.tone ? (
          <span key={i} className={TONE_CLASS[span.tone]}>
            {span.text}
          </span>
        ) : (
          <span key={i}>{span.text}</span>
        )
      )}
    </>
  );
}

/**
 * Replays a transcript: typed commands run under a blinking caret, printed output
 * lands after its own delay. Remounted (via `key`) whenever the slide or the
 * language changes, so the state below always starts from zero.
 */
export default function Terminal({ path, script }: TerminalProps) {
  const { reduceMotion, sceneDone } = useDeck();
  const [revealed, setRevealed] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(script.length);
      sceneDone();
      return;
    }

    let cancelled = false;
    const tick = async (ms: number) => {
      await wait(ms);
      return !cancelled;
    };

    (async () => {
      if (!(await tick(260))) return;

      for (let i = 0; i < script.length; i++) {
        const line = script[i];

        if (line.kind === 'cmd') {
          for (let c = 1; c <= line.text.length; c++) {
            setTyped(line.text.slice(0, c));
            // Jitter the cadence so it reads as a person, not a marquee.
            if (!(await tick(34 + Math.random() * 30))) return;
          }
          if (!(await tick(320))) return;
        } else if (!(await tick(line.delay))) {
          return;
        }

        setTyped('');
        setRevealed(i + 1);
      }

      sceneDone();
    })();

    return () => {
      cancelled = true;
    };
  }, [script, reduceMotion, sceneDone]);

  return (
    <div className="term">
      <div className="term__bar">
        <span className="term__dot" />
        <span className="term__dot" />
        <span className="term__dot" />
        <span className="term__path">{path}</span>
      </div>
      <pre className="term__body">
        {script.map((line, i) => {
          const done = i < revealed;
          const current = i === revealed;

          if (line.kind === 'cmd') {
            return (
              <span key={i} className="term__line term__line--cmd">
                {done ? line.text : current ? typed : ''}
                {current && <span className="caret" />}
              </span>
            );
          }

          return (
            <span key={i} className={`term__line${done ? '' : ' term__line--hidden'}`}>
              <Spans spans={line.spans} />
            </span>
          );
        })}
      </pre>
    </div>
  );
}
