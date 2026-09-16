import Heading from '../Heading';
import NoteCard from '../NoteCard';
import { Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function ProblemSlide({ dict }: SlideProps) {
  const t = dict.problem;

  return (
    <div className="cols">
      <div>
        <Heading lines={[t.heading]} />
        <Reveal delay={0.25}>
          <p className="lede">{t.lede}</p>
        </Reveal>
      </div>
      <div className="stack">
        {t.notes.map((note, i) => (
          <Reveal key={note.title} direction="horizontal" reverse distance={40} delay={0.2 + i * 0.09}>
            <NoteCard note={note} warn />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
