import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/common/CosmicBackground';
import { ImageLightbox } from './components/common/ImageLightbox';
import { EasterEggModal } from './components/common/EasterEggModal';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Achievements } from './components/sections/Achievements';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    title?: string;
    description?: string;
  }>({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    title: '',
    description: ''
  });

  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cursor glow effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(165, 107, 255, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(cursorGlow);

    const handleMouseMove = (e: MouseEvent) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (cursorGlow.parentNode) cursorGlow.parentNode.removeChild(cursorGlow);
    };
  }, []);

  // Active section observer
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'experience', 'contact'];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        revealObserver.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      revealObserver.disconnect();
    };
  }, []);

  // Show/hide scroll-to-top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (imageSrc: string, imageAlt: string, title?: string, description?: string) => {
    setLightboxState({ isOpen: true, imageSrc, imageAlt, title, description });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-void text-white selection:bg-violet/30 selection:text-lavender">
      <CosmicBackground />
      <Navbar activeSection={activeSection} />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects onOpenLightbox={openLightbox} />
        <Achievements onOpenLightbox={openLightbox} />
        <Experience onOpenLightbox={openLightbox} />
        <Contact />
      </main>

      <Footer onOpenEasterEgg={() => setIsEasterEggOpen(true)} />

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-30 p-3 rounded-full bg-violet/20 backdrop-blur-md border border-violet/30 text-lavender hover:text-white hover:bg-violet/40 transition-all shadow-lg shadow-violet/10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <ImageLightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        imageSrc={lightboxState.imageSrc}
        imageAlt={lightboxState.imageAlt}
        title={lightboxState.title}
        description={lightboxState.description}
      />

      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
    </div>
  );
};

export default App;
