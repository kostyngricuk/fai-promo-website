import Heading from '../Heading';
import Kicker from '../Kicker';
import Stats from '../Stats';
import Terminal from '../Terminal';
import { Fade, Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function TrainSlide({ dict }: SlideProps) {
  const t = dict.train;

  return (
    <>
      <Kicker text="/fai:train" />
      <div className="cols cols--narrow-left">
        <div>
          <Heading lines={[t.heading]} />
          <Fade delay={0.25}>
            <Stats stats={t.stats} />
          </Fade>
          <Reveal delay={0.35}>
            <p className="lede">{t.lede}</p>
            <p className="aside">{t.body}</p>
          </Reveal>
        </div>
        <Reveal direction="horizontal" reverse distance={48} delay={0.15}>
          <Terminal path={t.path} script={t.script} />
        </Reveal>
      </div>
    </>
  );
}
