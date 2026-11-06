import React, { useEffect } from 'react';
import { Sparkles, X, Star } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/85 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-gradient-to-b from-[#150C28] to-[#0a0515] border border-violet/40 rounded-3xl p-8 text-center shadow-2xl shadow-violet/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-text-muted hover:text-white bg-surface/60 hover:bg-surface-raised border border-border-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
          aria-label="Close message"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-violet/30 to-nebula/20 border border-violet/40 flex items-center justify-center mb-6 shadow-inner relative">
          <Star className="w-8 h-8 text-lavender animate-pulse" fill="#C6A7FF" />
          <Sparkles className="w-4 h-4 text-violet absolute -top-1 -right-1" />
        </div>

        <span className="text-xs uppercase tracking-widest font-semibold text-violet mb-2 block">
          A Celestial Discovery
        </span>
        <h3 id="easter-egg-title" className="text-xl sm:text-2xl font-heading font-bold text-white mb-4">
          A Message from the Cosmos
        </h3>

        <blockquote className="italic text-base sm:text-lg text-lavender font-medium leading-relaxed my-6 px-4 py-3 bg-surface/50 rounded-2xl border border-violet/20">
          "{personalInfo.easterEgg.quote}"
        </blockquote>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
          Thank you for exploring this corner of the digital cosmos. Every line of code, project experiment, and creative prototype is a step in crafting an expansive future.
        </p>

        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet to-nebula hover:brightness-110 text-white font-medium text-sm transition-all shadow-md shadow-violet/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );
};
