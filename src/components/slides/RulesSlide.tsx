import Heading from '../Heading';
import NoteCard from '../NoteCard';
import { Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function RulesSlide({ dict }: SlideProps) {
  const t = dict.rules;
  // Three rules on the left, two on the right — the split the original deck used.
  const columns = [t.notes.slice(0, 3), t.notes.slice(3)];

  return (
    <>
      <Heading lines={[t.heading]} />
      <div className="cols cols--top" style={{ marginTop: 6 }}>
        {columns.map((column, c) => (
          <div className="stack" key={c}>
            {column.map((note, i) => (
              <Reveal key={note.title} delay={0.2 + (c * 3 + i) * 0.08}>
                <NoteCard note={note} />
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
