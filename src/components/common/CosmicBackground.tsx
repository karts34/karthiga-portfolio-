import { useRef } from 'react';
import { useCosmicRenderer } from '../cosmos/useCosmicRenderer';
import '../../styles/cosmos.css';

/** Decorative only: the document never depends on a GPU or an animation. */
export function CosmicBackground() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ready = useCosmicRenderer(canvas, 'galaxy');

  return (
    <div className={`cosmic-environment${ready ? ' cosmic-environment--ready' : ''}`} aria-hidden="true">
      <div className="cosmic-fallback">
        <svg className="cosmic-fallback__cloud" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="galaxy-dust" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency=".007 .014" numOctaves="4" seed="34" />
              <feColorMatrix type="matrix" values="0 0 0 0 .40 0 0 0 0 .15 0 0 0 0 .65 0 0 0 1.5 -.5" />
            </filter>
            <radialGradient id="galaxy-cloud-mask">
              <stop offset="0" stopColor="white" />
              <stop offset="1" stopColor="black" />
            </radialGradient>
            <mask id="galaxy-cloud-area"><ellipse cx="860" cy="430" rx="680" ry="380" fill="url(#galaxy-cloud-mask)" /></mask>
          </defs>
          <rect width="1200" height="800" filter="url(#galaxy-dust)" mask="url(#galaxy-cloud-area)" opacity=".4" />
        </svg>
        <div className="cosmic-fallback__stars" />
      </div>
      <canvas ref={canvas} className="cosmic-environment__canvas" />
      <div className="cosmic-environment__veil" />
    </div>
  );
}
