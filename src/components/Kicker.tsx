import { ShinyText } from './reactbits';
import { useDeck } from './DeckContext';

interface KickerProps {
  text: string;
  /** Secondary, dimmed half — a repo URL or a command name. */
  dim?: string;
}

export default function Kicker({ text, dim }: KickerProps) {
  const { reduceMotion } = useDeck();

  return (
    <p className="kicker">
      {reduceMotion ? (
        <span>{text}</span>
      ) : (
        <ShinyText text={text} color="#2f7d4f" shineColor="#a9d6b6" speed={3.2} spread={110} />
      )}
      {dim && <span className="kicker__dim">· {dim}</span>}
    </p>
  );
}
