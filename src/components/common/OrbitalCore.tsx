import { useRef } from 'react';
import { useCosmicRenderer } from '../cosmos/useCosmicRenderer';
import '../../styles/cosmos.css';

/** The portrait is a separate HTML image, so its identity and accessibility stay intact. */
export function OrbitalCore() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ready = useCosmicRenderer(canvas, 'orbital');

  return (
    <div className={`orbital-core${ready ? ' orbital-core--ready' : ''}`} aria-hidden="true">
      <div className="orbital-core__aura" />
      <div className="orbital-core__fallback">
        <span className="orbital-core__fallback-sphere" />
        <span className="orbital-core__fallback-ring orbital-core__fallback-ring--one" />
        <span className="orbital-core__fallback-ring orbital-core__fallback-ring--two" />
        <span className="orbital-core__fallback-ring orbital-core__fallback-ring--three" />
      </div>
      <canvas ref={canvas} className="orbital-core__canvas" />
    </div>
  );
}
