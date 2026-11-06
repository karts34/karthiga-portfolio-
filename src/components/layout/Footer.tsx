import { ArrowUpRight, Github, Linkedin, Star } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export function Footer({ onOpenEasterEgg }: { onOpenEasterEgg: () => void }) {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><a href="#home" className="footer-name">KARTHIGA S<span>.</span></a><p>Built with curiosity, creativity, and code.</p><a href="#home" className="back-top">Back to the stars <ArrowUpRight size={16} /></a></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Karthiga S.</span><span className="footer-note">ONE SMALL CORNER OF AN INFINITE UNIVERSE</span><div className="footer-socials">
      <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a><a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a><button type="button" onClick={onOpenEasterEgg} aria-label="Discover a hidden message from the cosmos"><Star size={16} /></button>
    </div></div>
  </div></footer>;
}
