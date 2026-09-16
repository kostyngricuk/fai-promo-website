import type { StatCopy } from '../i18n/types';
import { CountUp } from './reactbits';
import { useDeck } from './DeckContext';

export default function Stats({ stats }: { stats: readonly StatCopy[] }) {
  const { reduceMotion } = useDeck();

  return (
    <ul className="stats">
      {stats.map(stat => (
        <li key={stat.label}>
          <div className="stats__value">
            {reduceMotion ? (
              <span>{stat.value}</span>
            ) : (
              <CountUp to={stat.value} duration={1.6} delay={0.25} />
            )}
            {stat.suffix && <span className="stats__suffix">{stat.suffix}</span>}
          </div>
          <div className="stats__label">{stat.label}</div>
        </li>
      ))}
    </ul>
  );
}
