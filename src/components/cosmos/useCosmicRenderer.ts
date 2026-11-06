import { useEffect, useState, type RefObject } from 'react';

export interface CosmicRenderer {
  resize(width: number, height: number): void;
  render(time: number, pointerX: number, pointerY: number): void;
  dispose(): void;
}

/** One capped loop per canvas; the loops sleep when the page or hero is hidden. */
export function useCosmicRenderer(canvasRef: RefObject<HTMLCanvasElement>, kind: 'galaxy' | 'orbital') {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let scene: CosmicRenderer | undefined;
    let disposed = false;
    let inView = kind === 'galaxy';
    let contextLost = false;
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let lastDraw = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const frameInterval = 1000 / (window.innerWidth < 768 ? 24 : 30);

    const draw = (now: number) => {
      frame = 0;
      if (!scene || disposed || contextLost || document.hidden || !inView) return;
      if (now - lastDraw >= frameInterval || motionQuery.matches) {
        elapsed += previous ? Math.min((now - previous) / 1000, .08) : 0;
        previous = now;
        lastDraw = now;
        pointerX += (targetX - pointerX) * .045;
        pointerY += (targetY - pointerY) * .045;
        scene.render(motionQuery.matches ? 0 : elapsed, motionQuery.matches ? 0 : pointerX, motionQuery.matches ? 0 : pointerY);
      }
      if (!motionQuery.matches) frame = window.requestAnimationFrame(draw);
    };

    const refresh = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      lastDraw = 0;
      if (scene && !document.hidden && inView && !contextLost) frame = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) scene?.resize(rect.width, rect.height);
      refresh();
    };

    const pointer = (event: PointerEvent) => {
      if (!finePointer.matches || motionQuery.matches) return;
      targetX = event.clientX / window.innerWidth * 2 - 1;
      targetY = event.clientY / window.innerHeight * 2 - 1;
    };

    const lost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      window.cancelAnimationFrame(frame);
      setReady(false);
    };
    const restored = () => {
      contextLost = false;
      setReady(true);
      resize();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    }, { rootMargin: '100px' });
    if (kind === 'orbital') intersection.observe(canvas);

    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('pointermove', pointer, { passive: true });
    motionQuery.addEventListener('change', refresh);
    canvas.addEventListener('webglcontextlost', lost);
    canvas.addEventListener('webglcontextrestored', restored);

    // Let the portrait, name and interactive navigation paint before loading Three.js.
    const deferred = window.setTimeout(async () => {
      try {
        const module = kind === 'galaxy'
          ? await import('./galaxyRenderer')
          : await import('./orbitalRenderer');
        if (disposed) return;
        scene = module.createRenderer(canvas);
        resize();
        scene.render(0, 0, 0);
        setReady(true);
      } catch {
        // A fully composed SVG/CSS environment remains when WebGL is unavailable.
        scene?.dispose();
        scene = undefined;
        if (!disposed) setReady(false);
      }
    }, kind === 'galaxy' ? 180 : 250);

    return () => {
      disposed = true;
      window.clearTimeout(deferred);
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', refresh);
      window.removeEventListener('pointermove', pointer);
      motionQuery.removeEventListener('change', refresh);
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.removeEventListener('webglcontextrestored', restored);
      scene?.dispose();
    };
  }, [canvasRef, kind]);

  return ready;
}
