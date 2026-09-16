import Heading from '../Heading';
import Terminal from '../Terminal';
import { Fade, Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function InstallSlide({ dict }: SlideProps) {
  const t = dict.install;

  return (
    <div className="cols cols--narrow-left">
      <div>
        <Heading lines={[t.heading]} />
        <Reveal delay={0.2}>
          <p className="lede">{t.lede}</p>
        </Reveal>
        <Fade delay={0.4}>
          <div className="chips">
            {t.chips.map(chip => (
              <span key={chip.label} className={`chip${chip.on ? ' is-on' : ''}`}>
                {chip.label}
              </span>
            ))}
          </div>
          <p className="aside" style={{ marginTop: 16 }}>
            {t.note}
          </p>
        </Fade>
      </div>
      <Reveal direction="horizontal" reverse distance={48} delay={0.15}>
        <Terminal path={t.path} script={t.script} />
      </Reveal>
    </div>
  );
}
