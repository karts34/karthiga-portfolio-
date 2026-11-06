import { useCallback, useEffect, useState } from 'react';
import { CosmicBackground } from './components/common/CosmicBackground';
import { ImageLightbox } from './components/common/ImageLightbox';
import { EasterEggModal } from './components/common/EasterEggModal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Achievements } from './components/sections/Achievements';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';

export type OpenImage = (imageSrc: string, imageAlt: string, title?: string, description?: string) => void;

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [image, setImage] = useState({ isOpen: false, imageSrc: '', imageAlt: '', title: '', description: '' });
  const [easterEgg, setEasterEgg] = useState(false);
  const openLightbox: OpenImage = useCallback((imageSrc, imageAlt, title = '', description = '') => setImage({ isOpen: true, imageSrc, imageAlt, title, description }), []);
  const closeLightbox = useCallback(() => setImage(previous => ({ ...previous, isOpen: false })), []);
  const closeEasterEgg = useCallback(() => setEasterEgg(false), []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
    sections.forEach(section => { section.tabIndex = -1; });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); reveals.unobserve(entry.target); }
      });
    }, { threshold: .08 });
    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
      if (!reduced.matches) { element.classList.add('reveal-ready'); reveals.observe(element); }
    });
    const visibility = () => document.documentElement.classList.toggle('page-hidden', document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); reveals.disconnect(); document.removeEventListener('visibilitychange', visibility); document.documentElement.classList.remove('page-hidden'); };
  }, []);

  return <>
    <CosmicBackground />
    <div className="page-content">
      <Navbar activeSection={activeSection} />
      <main id="main-content" tabIndex={-1}>
        <Hero /><About /><Skills /><Projects onOpenLightbox={openLightbox} /><Achievements onOpenLightbox={openLightbox} /><Experience onOpenLightbox={openLightbox} /><Contact />
      </main>
      <Footer onOpenEasterEgg={() => setEasterEgg(true)} />
    </div>
    <ImageLightbox {...image} onClose={closeLightbox} />
    <EasterEggModal isOpen={easterEgg} onClose={closeEasterEgg} />
  </>;
}
