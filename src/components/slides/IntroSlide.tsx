import Heading from '../Heading';
import Kicker from '../Kicker';
import { Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function IntroSlide({ dict }: SlideProps) {
  const t = dict.intro;

  return (
    <>
      <Kicker text={t.kicker} dim={t.kickerDim} />
      <Heading lines={t.headline} level="h1" />
      <Reveal delay={0.35}>
        <p className="lede" style={{ maxWidth: '51ch' }}>
          {t.lede}
        </p>
        <p className="hint">{t.hint}</p>
      </Reveal>
    </>
  );
}
