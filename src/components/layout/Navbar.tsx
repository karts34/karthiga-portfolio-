import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-void/85 backdrop-blur-md border-b border-violet/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Wordmark Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet rounded-lg py-1 px-1.5"
          aria-label="Karthiga S. - Back to top"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cosmic-indigo to-violet flex items-center justify-center shadow-md shadow-violet/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-lavender transition-colors">
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-violet/20 border border-violet/40 shadow-sm shadow-violet/20'
                    : 'text-text-secondary hover:text-white hover:bg-surface/50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-lavender rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Social / Action Links (Desktop) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={personalInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface/80 hover:bg-surface-raised border border-border-subtle hover:border-violet text-text-secondary hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-surface/80 hover:bg-surface-raised border border-border-subtle hover:border-violet text-text-secondary hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="ml-1 px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-violet to-nebula hover:brightness-110 text-white transition-all shadow-sm shadow-violet/30"
          >
            Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-surface/90 border border-border-subtle text-white hover:bg-surface-raised focus:outline-none focus-visible:ring-2 focus-visible:ring-violet"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[61px] bg-void/95 backdrop-blur-xl border-b border-violet/20 p-6 shadow-2xl transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-violet/20 text-white border border-violet/40'
                    : 'text-text-secondary hover:text-white hover:bg-surface/50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 text-lavender" />}
              </a>
            );
          })}
        </nav>

        <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
          <span className="text-xs text-text-muted">Follow my universe</span>
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface text-text-secondary hover:text-white border border-border-subtle"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface text-text-secondary hover:text-white border border-border-subtle"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
