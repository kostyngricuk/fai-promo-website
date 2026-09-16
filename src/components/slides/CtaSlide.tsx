import Heading from '../Heading';
import { Fade, Reveal } from '../Reveal';
import { GradientText, StarBorder } from '../reactbits';
import { useDeck } from '../DeckContext';
import type { SlideProps } from './types';

export default function CtaSlide({ dict }: SlideProps) {
  const t = dict.cta;
  const { reduceMotion } = useDeck();

  const commands = (
    <p className="install">
      {t.commands.map(command => (
        <span key={command} style={{ display: 'block' }}>
          <span className="install__prompt">›</span> {command}
        </span>
      ))}
    </p>
  );

  return (
    <>
      <Heading lines={[t.heading]} />
      <Reveal delay={0.2}>
        {reduceMotion ? (
          <div className="install-wrap">{commands}</div>
        ) : (
          <StarBorder
            as="div"
            className="install-wrap"
            color="#4d9a6b"
            speed="7s"
            thickness={1}
            backgroundColor="var(--card)"
            textColor="var(--ink)"
            borderColor="var(--line)"
          >
            {commands}
          </StarBorder>
        )}
      </Reveal>
      <Fade delay={0.45}>
        <p className="lede" style={{ maxWidth: '52ch', marginTop: 24 }}>
          {t.lede}
        </p>
        {reduceMotion ? (
          <a className="footlink" href={`https://${t.link}`}>
            {t.link}
          </a>
        ) : (
          <a className="footlink" href={`https://${t.link}`}>
            <GradientText colors={['#2f7d4f', '#61806a', '#a9761b', '#2f7d4f']} animationSpeed={9}>
              {t.link}
            </GradientText>
          </a>
        )}
      </Fade>
    </>
  );
}
