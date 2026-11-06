import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, ChevronDown, Compass } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Hero Atmosphere Glow */}
      <div className="absolute inset-0 pointer-events-none -z-1 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[950px] max-h-[950px] rounded-full bg-[radial-gradient(circle,rgba(165,107,255,0.12)_0%,rgba(99,48,160,0.06)_38%,rgba(50,16,82,0.03)_65%,transparent_82%)] blur-[140px] animate-hero-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className={`lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-raised/80 border border-violet/30 shadow-inner mb-6">
              <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-lavender uppercase">
                {personalInfo.eyebrow}
              </span>
            </div>

            {/* Main Name */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold font-heading tracking-tight text-white mb-4">
              <span className="text-cosmic-shimmer">{personalInfo.name}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-violet mb-3">
              AI & ML Engineer | Full Stack Developer
            </p>

            {/* Role Rotation */}
            <div className="h-9 sm:h-11 flex items-center mb-5" aria-live="polite">
              <span className="text-lg sm:text-2xl font-medium text-lavender/90 font-heading">
                {personalInfo.roles[currentRoleIndex]}
              </span>
            </div>

            {/* Headline */}
            <p className="text-xl sm:text-2xl font-heading font-semibold text-white/90 mb-4 max-w-xl leading-tight">
              Creating Intelligent Experiences Beyond Imagination.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-xl">
              I build intelligent applications, explore emerging technologies and transform creative ideas into meaningful digital experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet via-[#8a4af0] to-nebula hover:brightness-110 text-white font-semibold text-sm transition-all shadow-lg shadow-violet/25 flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-raised/80 hover:bg-surface-raised border border-border-subtle hover:border-violet text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              >
                <span>Let's Connect</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-text-muted">
              <span className="text-xs uppercase tracking-wider font-medium">Profiles:</span>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/70 hover:bg-surface-raised border border-border-subtle hover:border-violet text-text-secondary hover:text-white text-xs transition-colors"
                aria-label="GitHub Profile (opens in new tab)"
              >
                <Github className="w-3.5 h-3.5 text-lavender" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/70 hover:bg-surface-raised border border-border-subtle hover:border-violet text-text-secondary hover:text-white text-xs transition-colors"
                aria-label="LinkedIn Profile (opens in new tab)"
              >
                <Linkedin className="w-3.5 h-3.5 text-violet" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column — Profile */}
          <div className={`lg:col-span-5 flex justify-center items-center relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative w-64 sm:w-80 md:w-96 aspect-square">

              {/* Orbit Rings */}
              <div className="absolute inset-0 -m-5 rounded-full border border-violet/20 border-dashed animate-spin" style={{ animationDuration: '30s' }} aria-hidden="true" />
              <div className="absolute inset-0 -m-10 rounded-full border border-nebula/10 hidden sm:block" aria-hidden="true" />

              {/* Glow Behind */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet/30 via-nebula/25 to-cosmic-indigo/15 blur-2xl -z-10" aria-hidden="true" />

              {/* Portrait */}
              <div className="w-full h-full rounded-3xl overflow-hidden p-1.5 bg-gradient-to-br from-violet/40 via-nebula/25 to-cosmic-deep/30 border border-violet/35 shadow-2xl shadow-violet/20">
                <img
                  src="/images/portfolio/profile-karthiga.jpg"
                  alt="Portrait of Karthiga S., CSE AI&ML engineering student"
                  className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
                  loading="eager"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 px-4 py-2 rounded-xl bg-surface/90 backdrop-blur-md border border-violet/30 shadow-xl flex items-center gap-2">
                <Compass className="w-4 h-4 text-lavender" />
                <div className="text-left">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Department</p>
                  <p className="text-xs font-semibold text-white">CSE (AI & ML) • 2nd Year</p>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-2 right-8 w-2 h-2 rounded-full bg-violet/60 animate-float-slow" aria-hidden="true" />
              <div className="absolute top-1/4 -right-3 w-1.5 h-1.5 rounded-full bg-lavender/40 animate-pulse-slow" aria-hidden="true" />
              <div className="absolute bottom-1/4 -left-2 w-1 h-1 rounded-full bg-violet/50 animate-float-slow" aria-hidden="true" />
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 lg:mt-20 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="group flex flex-col items-center gap-2 text-text-muted hover:text-lavender transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet p-2 rounded-lg"
            aria-label="Scroll to About section"
          >
            <span className="text-[11px] tracking-widest uppercase font-medium">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
