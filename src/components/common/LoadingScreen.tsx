import React, { useState, useEffect, useRef, useCallback } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [phase, setPhase] = useState<'entering' | 'visible' | 'exiting' | 'done'>('entering');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    pulse: number;
  }>>([]);

  // Skip animations for reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('done');
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  // Phase transitions via timers
  useEffect(() => {
    if (phase === 'done') return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (phase === 'entering') {
      timers.push(setTimeout(() => setPhase('visible'), 100));
    } else if (phase === 'visible') {
      timers.push(setTimeout(() => setPhase('exiting'), 2200));
    } else if (phase === 'exiting') {
      timers.push(setTimeout(() => {
        setPhase('done');
        onLoadingComplete();
      }, 600));
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, onLoadingComplete]);

  // Particle canvas animation
  const initParticles = useCallback((width: number, height: number) => {
    const particles: typeof particlesRef.current = [];
    const count = Math.min(40, Math.floor((width * height) / 25000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    if (phase === 'done') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Central purple glow
      const glowRadius = Math.min(canvas.width, canvas.height) * 0.35;
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, glowRadius
      );
      const glowPulse = 0.08 + Math.sin(elapsed * 1.2) * 0.03;
      gradient.addColorStop(0, `rgba(165, 107, 255, ${glowPulse})`);
      gradient.addColorStop(0.5, `rgba(99, 48, 160, ${glowPulse * 0.4})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198, 167, 255, ${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [phase, initParticles]);

  if (phase === 'done') return null;

  const isExiting = phase === 'exiting';
  const isVisible = phase === 'visible' || phase === 'exiting';

  return (
    <div
      className={`loading-screen ${isExiting ? 'loading-screen-exit' : ''}`}
      aria-live="polite"
      aria-label="Loading portfolio"
      role="status"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Name */}
        <h1
          className={`font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cosmic-shimmer loading-name ${
            isVisible ? 'loading-name-visible' : ''
          }`}
        >
          Karthiga S.
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-4 text-sm sm:text-base tracking-[0.25em] uppercase loading-subtitle ${
            isVisible ? 'loading-subtitle-visible' : ''
          }`}
          style={{ color: 'var(--text-muted)' }}
        >
          Initializing Universe...
        </p>

        {/* Progress indicator — thin line */}
        <div className="mt-10 w-48 sm:w-56 h-[1px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full loading-progress ${
              isVisible ? 'loading-progress-active' : ''
            }`}
            style={{
              background: 'linear-gradient(90deg, transparent, var(--violet), var(--lavender), transparent)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
