import Heading from '../Heading';
import Kicker from '../Kicker';
import NoteCard from '../NoteCard';
import Terminal from '../Terminal';
import { Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function ReviewSlide({ dict }: SlideProps) {
  const t = dict.review;

  return (
    <>
      <Kicker text="/fai:review" />
      <div className="cols cols--narrow-left">
        <div>
          <Heading lines={[t.heading]} />
          <div className="stack">
            {t.notes.map((note, i) => (
              <Reveal key={note.title} delay={0.2 + i * 0.1}>
                <NoteCard note={note} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.45}>
            <p className="aside" style={{ marginTop: 16 }}>
              {t.body}
            </p>
          </Reveal>
        </div>
        <Reveal direction="horizontal" reverse distance={48} delay={0.15}>
          <Terminal path={t.path} script={t.script} />
        </Reveal>
      </div>
    </>
  );
}
