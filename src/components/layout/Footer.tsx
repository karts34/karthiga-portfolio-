import React from 'react';
import { ArrowUp, Github, Linkedin, Sparkles, Star } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

interface FooterProps {
  onOpenEasterEgg: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEasterEgg }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative border-t border-violet/15 bg-gradient-to-b from-[#080510] via-[#050310] to-[#030208] pt-16 pb-12 overflow-hidden">
      {/* Quiet glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[65vw] h-24 bg-[radial-gradient(ellipse_at_top,rgba(165,107,255,0.08)_0%,transparent_75%)] blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-40 bg-violet/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-border-subtle/60">

          {/* Brand Info */}
          <div className="md:col-span-5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cosmic-indigo to-violet flex items-center justify-center shadow-md shadow-violet/30">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary italic mb-2">
              "{personalInfo.tagline}"
            </p>
            <p className="text-xs text-text-muted">
              CSE (AI&ML) • AVS Engineering College
            </p>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-text-secondary">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-lavender transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-wrap items-center justify-center md:justify-end gap-2.5">
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface hover:bg-surface-raised border border-border-subtle hover:border-violet text-text-secondary hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface hover:bg-surface-raised border border-border-subtle hover:border-violet text-text-secondary hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-surface hover:bg-surface-raised border border-border-subtle hover:border-violet text-text-secondary hover:text-lavender transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted text-center sm:text-left">
          <div>
            © {currentYear} {personalInfo.name}. All rights reserved. Built with precision and passion.
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-muted/80">Hidden Universe:</span>
            <button
              onClick={onOpenEasterEgg}
              className="group relative p-1.5 rounded-full text-lavender hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet cursor-pointer"
              title="A celestial whisper among the stars..."
              aria-label="Discover a hidden message from the cosmos"
            >
              <Star
                className="w-4 h-4 fill-violet/30 group-hover:fill-lavender text-lavender group-hover:scale-125 transition-transform"
              />
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-surface border border-violet/30 text-[10px] text-lavender opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                ✦ Celestial Secret
              </span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
