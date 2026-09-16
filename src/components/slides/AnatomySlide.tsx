import FileCard from '../FileCard';
import Heading from '../Heading';
import { Fade, Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function AnatomySlide({ dict }: SlideProps) {
  const t = dict.anatomy;
  const hot = new Set(t.highlight);

  return (
    <div className="cols">
      <div>
        <Heading lines={[t.heading]} />
        <div className="stack" style={{ marginBottom: 18 }}>
          {t.files.map((file, i) => (
            <Reveal key={file.name} delay={0.2 + i * 0.12}>
              <FileCard file={file} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <p className="aside">{t.note}</p>
        </Reveal>
      </div>
      <Fade delay={0.3}>
        <ul className="sections">
          {t.sections.map((section, i) => (
            <li key={section} className={hot.has(i + 1) ? 'is-hot' : undefined}>
              <span className="n">{i + 1}</span>
              <span>{section}</span>
            </li>
          ))}
        </ul>
        <p className="sections__foot">{t.foot}</p>
      </Fade>
    </div>
  );
}
