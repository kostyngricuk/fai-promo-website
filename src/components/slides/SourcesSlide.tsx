import Heading from '../Heading';
import { Fade, Reveal } from '../Reveal';
import type { SlideProps } from './types';

export default function SourcesSlide({ dict }: SlideProps) {
  const t = dict.sources;

  return (
    <>
      <Heading lines={[t.heading]} />
      <Reveal delay={0.2}>
        <p className="lede">{t.lede}</p>
      </Reveal>
      <Fade delay={0.35}>
        <table className="table">
          <thead>
            <tr>
              <th>{t.thReads}</th>
              <th>{t.thLearns}</th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map(row => (
              <tr key={row.key}>
                <td className="key">{row.key}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fade>
    </>
  );
}
