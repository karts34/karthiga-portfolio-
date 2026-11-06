import { ArrowDown, ArrowUpRight, Github, Linkedin, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { OrbitalCore } from '../common/OrbitalCore';
import { MagneticLink } from '../common/MagneticLink';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="section-kicker hero-enter"><span className="status-star">✦</span> WELCOME TO MY UNIVERSE</p>
          <h1 id="hero-title" className="hero-name hero-enter">KARTHIGA <span>S.</span></h1>
          <div className="hero-identity hero-enter"><span className="identity-line" />AI &amp; ML Engineer <span className="role-dot">/</span> Full Stack Developer</div>
          <p className="hero-statement hero-enter">A universe built<br />with <em>code &amp; curiosity.</em></p>
          <p className="hero-tagline hero-enter">{personalInfo.tagline}</p>
          <div className="hero-actions hero-enter">
            <MagneticLink href="#projects" className="button button-primary">Explore my projects <ArrowUpRight size={17} /></MagneticLink>
            <a href="#contact" className="button button-secondary">Let’s connect <ArrowUpRight size={17} /></a>
          </div>
          <div className="hero-social hero-enter">
            <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" aria-label="Karthiga on GitHub (opens in a new tab)"><Github size={17} /> GitHub <ArrowUpRight size={12} /></a>
            <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="Karthiga on LinkedIn (opens in a new tab)"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={12} /></a>
            <span className="hero-social-line" />
          </div>
        </div>
        <div className="hero-art hero-enter">
          <span className="orbit-coordinate" aria-hidden="true">THE VIOLET ORBITAL CORE <span>01 — ∞</span></span>
          <OrbitalCore />
          <div className="hero-portrait"><img src="/images/portfolio/profile-karthiga.jpg" alt="Karthiga S., Computer Science and Engineering student" width="1254" height="1254" fetchPriority="high" /></div>
          <div className="orbit-caption"><Sparkles size={16} /><span>Imagination in orbit.<br /><strong>Ideas into existence.</strong></span></div>
          <span className="orbit-marker" aria-hidden="true">CURIOSITY / CREATIVITY / CODE</span>
        </div>
      </div>
      <div className="container hero-foot">
        <a href="#about" className="scroll-cue"><span className="scroll-orbit"><ArrowDown size={14} /></span> SCROLL TO EXPLORE</a>
        <div className="hero-traits"><span>Problem Solver</span><span className="little-star" aria-hidden="true">✦</span><span>Hackathon Enthusiast</span></div>
        <span className="hero-foot-note">ALWAYS CURIOUS. ALWAYS BUILDING.</span>
      </div>
    </section>
  );
}
