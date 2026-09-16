import type { FileCopy } from '../i18n/types';
import { GlareHover } from './reactbits';

export default function FileCard({ file }: { file: FileCopy }) {
  return (
    <GlareHover
      className="file-card"
      width="100%"
      height="auto"
      background="var(--card)"
      borderColor="var(--line)"
      borderRadius="var(--radius)"
      glareColor="#2f7d4f"
      glareOpacity={0.16}
      glareAngle={-30}
      glareSize={220}
      transitionDuration={720}
    >
      <div className="file-card__name">{file.name}</div>
      <p>{file.body}</p>
    </GlareHover>
  );
}
