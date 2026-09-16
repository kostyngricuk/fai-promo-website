import type { LocaleCode } from '../i18n';
import type { UiCopy } from '../i18n/types';
import LangSwitch from './LangSwitch';
import { Magnet } from './reactbits';
import { useDeck } from './DeckContext';

interface RailProps {
  ui: UiCopy;
  index: number;
  total: number;
  autoplay: boolean;
  locale: LocaleCode;
  onGo: (index: number) => void;
  onToggleAuto: () => void;
  onLocale: (next: LocaleCode) => void;
}

export default function Rail({
  ui,
  index,
  total,
  autoplay,
  locale,
  onGo,
  onToggleAuto,
  onLocale
}: RailProps) {
  const { reduceMotion } = useDeck();

  // The magnet pull is pure decoration; skip it when motion is unwelcome.
  const pull = (node: React.ReactNode) =>
    reduceMotion ? node : <Magnet padding={70} magnetStrength={4}>{node}</Magnet>;

  return (
    <nav className="rail" aria-label={ui.navLabel}>
      {pull(
        <button className="rail__btn" type="button" aria-label={ui.prev} onClick={() => onGo(index - 1)}>
          ←
        </button>
      )}
      {pull(
        <button className="rail__btn" type="button" aria-label={ui.next} onClick={() => onGo(index + 1)}>
          →
        </button>
      )}

      <div className="rail__marks">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`rail__mark${i < index ? ' is-done' : ''}${i === index ? ' is-now' : ''}`}
            aria-label={ui.slide(i + 1)}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => onGo(i)}
          />
        ))}
      </div>

      <span className="rail__count">
        {index + 1} / {total}
      </span>

      <button className="rail__btn" type="button" aria-pressed={autoplay} onClick={onToggleAuto}>
        {autoplay ? ui.pause : ui.play}
      </button>

      <LangSwitch locale={locale} label={ui.languageLabel} onChange={onLocale} />
    </nav>
  );
}
