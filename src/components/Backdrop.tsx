import { Component, useEffect, useState, type ReactNode } from 'react';
import { Threads } from './reactbits';

/** #2f7d4f, the deck's green, expressed as the 0–1 floats the shader wants. */
const GREEN: [number, number, number] = [0.184, 0.49, 0.31];

/**
 * A quick capability check. `getContext` returning something is necessary but
 * not sufficient — a software rasteriser can hand back a context and then fail
 * to allocate a real one — so `Guard` below catches whatever slips through.
 */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    // Hand the probe's context straight back; contexts are a scarce resource.
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * `Threads` assumes a WebGL context is always available and throws from its
 * mount effect if it is not. That happens on blocklisted drivers, in locked-down
 * remote sessions and in headless browsers. The deck reads fine without the
 * backdrop, so swallow the failure and render nothing.
 */
class Guard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * The ambient WebGL layer behind the whole deck. Deliberately slow and faint —
 * `.backdrop` holds it at low opacity and takes it out of the hit-testing path,
 * so it never competes with the type or swallows a click.
 */
export default function Backdrop() {
  const [supported, setSupported] = useState(false);

  useEffect(() => setSupported(hasWebGL()), []);

  if (!supported) return null;

  return (
    <Guard>
      <div className="backdrop" aria-hidden="true">
        <Threads color={GREEN} amplitude={0.9} distance={0.35} enableMouseInteraction={false} />
      </div>
    </Guard>
  );
}
