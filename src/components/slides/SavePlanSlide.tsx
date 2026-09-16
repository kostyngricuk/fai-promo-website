import Heading from '../Heading';
import Kicker from '../Kicker';
import Terminal from '../Terminal';
import { Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function SavePlanSlide({ dict }: SlideProps) {
  const t = dict.savePlan;

  return (
    <>
      <Kicker text="/fai:save-plan" />
      <div className="cols cols--narrow-left">
        <div>
          <Heading lines={[t.heading]} />
          <Reveal delay={0.25}>
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
