import { SplitText } from './reactbits';
import { useDeck } from './DeckContext';

interface HeadingProps {
  /** One entry per visual line. Each line gets its own stagger. */
  lines: readonly string[];
  level?: 'h1' | 'h2';
  className?: string;
}

/**
 * Slide headings, revealed word by word with React Bits' `SplitText`.
 * `SplitText` needs plain text (it re-splits the DOM), so headlines are stored
 * in the dictionaries as arrays of lines rather than as markup with `<br>`.
 */
export default function Heading({ lines, level = 'h2', className = '' }: HeadingProps) {
  const { reduceMotion } = useDeck();
  const Tag = level;

  if (reduceMotion) {
    return (
      <Tag className={`headline ${className}`}>
        {lines.map((line, i) => (
          <span key={i} className="headline__line">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={`headline ${className}`}>
      {lines.map((line, i) => (
        // SplitText sets `display: inline-block` inline; the wrapper is what
        // guarantees each authored line keeps its own row.
        <span key={i} className="headline__line">
          <SplitText
            text={line}
            tag="span"
            splitType="words"
            delay={38}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 34 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.05}
            rootMargin="0px"
            textAlign="left"
          />
        </span>
      ))}
    </Tag>
  );
}
