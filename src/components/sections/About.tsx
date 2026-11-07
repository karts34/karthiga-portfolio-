import { ArrowUpRight, Compass, Orbit, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import '../../styles/sections.css';

export function About() {
  return <section id="about" className="section-shell about-section" aria-labelledby="about-title"><div className="container">
    <div className="about-grid">
      <div className="about-copy reveal-on-scroll"><p className="section-kicker">01 / A LITTLE ABOUT ME</p><h2 id="about-title" className="section-heading">The mind behind<br /><span>the universe.</span></h2><p className="about-lead">A curious mind. A builder at heart.</p><p className="section-intro">{personalInfo.intro}</p><p className="about-biography">{personalInfo.aboutLong}</p><a href="#experience" className="about-education"><span><small>MY CURRENT ORBIT</small>{personalInfo.education.institution}<em>CSE · Artificial Intelligence &amp; Machine Learning</em></span><ArrowUpRight size={20} /></a></div>
    </div>
    <div className="values-row">{personalInfo.values.map((value, index) => { const Icon = [Compass, Orbit, Sparkles][index]; return <div className="value-item reveal-on-scroll" key={value.title}><span className="value-number">0{index + 1}</span><Icon size={23} /><div><h3>{value.title}<span> / {value.tagline}</span></h3><p>{value.description}</p></div></div>; })}</div>
  </div></section>;
}
