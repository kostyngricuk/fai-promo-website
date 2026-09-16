import type { NoteCopy } from '../i18n/types';
import { SpotlightCard } from './reactbits';

interface NoteCardProps {
  note: NoteCopy;
  /** Amber accent — used for the "here is what goes wrong" list. */
  warn?: boolean;
}

export default function NoteCard({ note, warn = false }: NoteCardProps) {
  return (
    <SpotlightCard
      className={`note${warn ? ' note--warn' : ''}`}
      spotlightColor={warn ? 'rgba(169, 118, 27, 0.14)' : 'rgba(47, 125, 79, 0.14)'}
    >
      <h3>{note.title}</h3>
      <p>{note.body}</p>
    </SpotlightCard>
  );
}
