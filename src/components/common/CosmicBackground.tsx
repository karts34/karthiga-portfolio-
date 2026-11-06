import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface FloatingParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile = width < 768;
    const starCount = isMobile ? 80 : 200;
    const particleCount = isMobile ? 15 : 35;

    const stars: Star[] = [];
    const particles: FloatingParticle[] = [];

    // Initialize twinkling stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Initialize floating particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.2 + 0.05,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Draw twinkling stars
      for (const s of stars) {
        let currentAlpha = s.alpha;
        if (!prefersReducedMotion) {
          currentAlpha = s.alpha + Math.sin(time * 2 + s.pulsePhase) * 0.2;
          currentAlpha = Math.max(0.03, Math.min(0.8, currentAlpha));
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();

        // Soft glow for brighter stars
        if (s.radius > 0.8 && currentAlpha > 0.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(198, 167, 255, ${currentAlpha * 0.08})`;
          ctx.fill();
        }
      }

      // Draw floating particles
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -5) p.x = width + 5;
          if (p.x > width + 5) p.x = -5;
          if (p.y < -5) p.y = height + 5;
          if (p.y > height + 5) p.y = -5;
        }

        let currentAlpha = p.alpha;
        if (!prefersReducedMotion) {
          currentAlpha = p.alpha + Math.sin(time * 1.2 + p.pulsePhase) * 0.08;
          currentAlpha = Math.max(0.02, Math.min(0.3, currentAlpha));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 107, 255, ${currentAlpha})`;
        ctx.fill();

        // Soft aura for larger particles
        if (p.radius > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(165, 107, 255, ${currentAlpha * 0.06})`;
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Redistribute stars on resize
      stars.forEach(s => {
        s.x = Math.random() * width;
        s.y = Math.random() * height;
      });
      particles.forEach(p => {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      });

      render();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* LAYER 1 — Deep Black Foundation */}
      <div className="absolute inset-0 bg-[#030208]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#160B27_0%,#080510_40%,#030208_85%)] opacity-90" />

      {/* LAYER 2 — Animated Volumetric Nebula Orbs */}
      {/* Orb 1: Upper-left purple nebula */}
      <div
        className="absolute -top-[10%] -left-[8%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full animate-nebula-drift-1"
        style={{
          background: 'radial-gradient(circle, rgba(99, 48, 160, 0.2) 0%, rgba(50, 16, 82, 0.1) 45%, transparent 72%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Orb 2: Upper-right violet glow */}
      <div
        className="absolute top-[8%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full animate-nebula-drift-2"
        style={{
          background: 'radial-gradient(circle, rgba(165, 107, 255, 0.12) 0%, rgba(99, 48, 160, 0.06) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Orb 3: Mid-left deep purple */}
      <div
        className="absolute top-[40%] -left-[12%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full animate-nebula-drift-3"
        style={{
          background: 'radial-gradient(circle, rgba(50, 16, 82, 0.15) 0%, rgba(22, 11, 39, 0.06) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Orb 4: Bottom-right nebula glow */}
      <div
        className="absolute bottom-[5%] -right-[6%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full animate-nebula-drift-1"
        style={{
          background: 'radial-gradient(circle, rgba(99, 48, 160, 0.18) 0%, rgba(165, 107, 255, 0.06) 48%, transparent 70%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Orb 5: Center hero accent glow */}
      <div
        className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full animate-hero-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(165, 107, 255, 0.08) 0%, rgba(99, 48, 160, 0.04) 50%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* LAYER 3 — Canvas Star Field & Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* LAYER 4 — Shooting Stars */}
      <div className="shooting-star star-1" />
      <div className="shooting-star star-2" />

      {/* LAYER 5 — Radial Light Accents */}
      <div
        className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[60vw] h-[50vh] max-w-[800px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(165, 107, 255, 0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Bottom ambient horizon */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30vh]"
        style={{
          background: 'linear-gradient(to top, rgba(3, 2, 8, 0.5) 0%, transparent 100%)',
        }}
      />

      {/* LAYER 6 — Decorative Geometric Elements */}
      <svg
        className="absolute top-12 right-8 w-[400px] h-[400px] hidden md:block opacity-[0.03]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="rgba(165,107,255,1)" strokeWidth="0.8" strokeDasharray="6 12" />
        <circle cx="200" cy="200" r="130" stroke="rgba(198,167,255,1)" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="80" stroke="rgba(99,48,160,1)" strokeWidth="0.5" strokeDasharray="4 8" />
      </svg>

      <svg
        className="absolute bottom-20 -left-16 w-[350px] h-[350px] hidden lg:block opacity-[0.025]"
        viewBox="0 0 350 350"
        fill="none"
      >
        <circle cx="175" cy="175" r="155" stroke="rgba(165,107,255,1)" strokeWidth="0.6" strokeDasharray="5 10" />
        <circle cx="175" cy="175" r="100" stroke="rgba(99,48,160,1)" strokeWidth="0.5" />
      </svg>

      {/* LAYER 7 — Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(3, 2, 8, 0.4) 100%)',
        }}
      />
    </div>
  );
};
