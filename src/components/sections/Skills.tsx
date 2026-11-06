import { useState } from 'react';
import { ArrowUpRight, Code2, Orbit } from 'lucide-react';
import { skillsData } from '../../data/skills';

const positions = [[21, 24], [49, 14], [78, 27], [14, 54], [83, 58], [26, 80], [60, 84], [47, 49], [55, 65], [68, 46]];
const labels = ['Python', 'C', 'Java', 'HTML5', 'CSS3', 'JavaScript', 'AI / ML', 'AI Tools', 'Python Full Stack', 'Game Development'];
const skills = skillsData.flatMap(category => category.skills);

export function Skills() {
  const [selected, setSelected] = useState(0);
  return <section id="skills" className="section-shell skills-section" aria-labelledby="skills-title"><div className="container">
    <div className="skills-heading reveal-on-scroll"><div><p className="section-kicker">02 / MY TOOLKIT</p><h2 id="skills-title" className="section-heading">My technology<br /><span>constellation.</span></h2></div><p className="section-intro">Different tools. Connected ideas.<br />A growing collection of skills for turning<br className="desktop-break" /> curiosity into things that work.</p></div>
    <div className="skills-layout">
      <div className="constellation-panel reveal-on-scroll"><div className="constellation-label"><Orbit size={14} /><span>EXPLORE THE CONNECTIONS</span></div>
        <div className="constellation-map"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="skillGlow"><stop stopColor="#9333ea" stopOpacity=".18" /><stop offset="1" stopColor="#9333ea" stopOpacity="0" /></radialGradient></defs><circle cx="50" cy="50" r="48" fill="url(#skillGlow)" /><g stroke="#c4b5fd" strokeOpacity=".2" strokeWidth=".2"><path d="M21 24L49 14L78 27L83 58L60 84L26 80L14 54Z M21 24L47 49L78 27 M14 54L47 49L55 65L60 84 M83 58L68 46L47 49 M26 80L55 65" fill="none" /></g><circle cx="50" cy="50" r="44" fill="none" stroke="#c4b5fd" strokeOpacity=".1" strokeWidth=".15" strokeDasharray="1 2" /></svg>
          {skills.map((skill, index) => <button type="button" className={'skill-star' + (selected === index ? ' selected' : '')} key={skill.name} style={{ left: `${positions[index][0]}%`, top: `${positions[index][1]}%` }} onClick={() => setSelected(index)} onFocus={() => setSelected(index)} onPointerEnter={event => { if (event.pointerType === 'mouse') setSelected(index); }} aria-pressed={selected === index} aria-controls="skill-detail"><span className="skill-point" /><span>{labels[index]}</span></button>)}
        </div>
        <div id="skill-detail" className="skill-detail" aria-live="polite"><Code2 size={20} /><div><h3>{skills[selected].name}<span>{skills[selected].levelTag}</span></h3><p>{skills[selected].description}</p></div></div>
      </div>
      <div className="skills-categories">{skillsData.map((category, index) => <div className="skill-category reveal-on-scroll" key={category.title}><div className="skill-category-title"><span>0{index + 1}</span><h3>{category.title}</h3><ArrowUpRight size={16} /></div><p>{category.description}</p><div className="skill-tags">{category.skills.map(skill => <button type="button" key={skill.name} className={'tag' + (skills[selected].name === skill.name ? ' active' : '')} onClick={() => setSelected(skills.indexOf(skill))}>{skill.name}</button>)}</div><div className="mobile-skill-details">{category.skills.map(skill => <p key={skill.name}><strong>{skill.name}</strong> {skill.description}</p>)}</div></div>)}</div>
    </div>
  </div></section>;
}
