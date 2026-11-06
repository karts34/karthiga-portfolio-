import { useState, type PointerEvent } from 'react';
import { ArrowUpRight, Bot, Braces, Car, Cpu, Github, Scan, Sparkles } from 'lucide-react';
import { projectsData, draftConcepts } from '../../data/projects';
import type { OpenImage } from '../../App';
import type { ProjectItem } from '../../types';
import '../../styles/projects.css';

const filters = ['All projects', 'AI & ML', 'Full Stack', 'Game Development'] as const;
const artwork = { 'avs-campus-management': { label: 'CAMPUS / CONNECTED', Icon: Braces }, 'visionx-ai-analyzer': { label: 'VISION / INTELLIGENCE', Icon: Scan }, 'offline-ai-chatbot': { label: 'LOCAL / INTELLIGENCE', Icon: Bot }, 'apex-afterglow-racing': { label: 'MOTION / PLAY', Icon: Car } };
function ProjectCard({ project, index, onOpenLightbox }: { project: ProjectItem; index: number; onOpenLightbox: OpenImage }) {
  const art = artwork[project.id as keyof typeof artwork];
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 2}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 2}deg`);
  };
  return <article className={`pg-card pg-${project.id}`} onPointerMove={tilt} onPointerLeave={event => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg'); }}>
    {project.image ? <button type="button" className="pg-cover pg-photo" onClick={() => onOpenLightbox(project.image!, `${project.title} project poster`, project.title)}><img src={project.image} alt={`${project.title} official poster`} width="900" height="600" loading="lazy" /><span className="pg-image-label">PROJECT POSTER <ArrowUpRight size={15} /></span></button> : <div className="pg-cover pg-artwork" aria-label={`Abstract project artwork for ${project.title}`}><div className="pg-art-grid" /><div className="pg-art-orbit pg-art-orbit-one" /><div className="pg-art-orbit pg-art-orbit-two" /><div className="pg-art-center">{art && <art.Icon size={51} strokeWidth={1} />}</div><span className="pg-art-label">{art?.label}</span><span className="pg-art-caption">PROJECT ARTWORK</span></div>}
    <div className="pg-card-body"><div className="pg-meta"><span>{project.category}</span><span>0{index + 1}</span></div><h3>{project.id === 'apex-afterglow-racing' ? 'Multi Car Racing Selection' : project.title}</h3>{project.id === 'apex-afterglow-racing' && <p className="pg-subtitle">APEX / Afterglow · Superhero City &amp; Racing</p>}<p className="pg-description">{project.description}</p><div className="pg-tags">{project.technologies.map(technology => <span className="tag" key={technology}>{technology}</span>)}</div><div className="pg-actions"><a href={project.repositoryUrl} target="_blank" rel="noreferrer"><Github size={15} />View source<ArrowUpRight size={15} /></a>{project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">Live demo<ArrowUpRight size={15} /></a>}<details><summary>Details <span>+</span></summary><p>{project.detailedDescription}</p>{project.regions && <p>Explore: {project.regions.join(' · ')}.</p>}</details></div></div>
  </article>;
}
export function Projects({ onOpenLightbox }: { onOpenLightbox: OpenImage }) {
  const [filter, setFilter] = useState<string>('All projects');
  const visible = projectsData.filter(project => filter === 'All projects' || project.category === filter || (filter === 'AI & ML' && project.category === 'Local AI'));
  return <section id="projects" className="section-shell projects-section" aria-labelledby="projects-title"><div className="container">
    <div className="pg-heading reveal-on-scroll"><div><p className="section-kicker">03 / SELECTED WORK</p><h2 id="projects-title" className="section-heading">Universes<br /><span>I’ve created.</span></h2></div><p className="section-intro">Exploring ideas, engineering solutions,<br />and turning imagination into reality.</p></div>
    <div className="pg-filters" role="group" aria-label="Filter projects">{filters.map(item => <button type="button" key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? 'active' : ''}>{item}</button>)}</div>
    <p className="sr-only" role="status">{visible.length} projects shown</p>
    <div className="pg-grid">{visible.map(project => <ProjectCard key={project.id} project={project} index={projectsData.indexOf(project)} onOpenLightbox={onOpenLightbox} />)}</div>
    <div className="pg-lab"><div className="pg-lab-heading"><div><p className="section-kicker"><Sparkles size={13} /> WHAT’S NEXT</p><h3>Ideas in orbit.</h3></div><p>Concepts and works in progress.<br />A little glimpse of the next frontier.</p></div><div className="pg-concepts">{draftConcepts.map((concept, index) => <details className="pg-concept" key={concept.id}><summary><span className="pg-concept-number">0{index + 1}</span><span className="pg-concept-name">{concept.title}<small>{concept.status}</small></span><span className="pg-concept-plus">+</span></summary><p>{concept.description}</p></details>)}</div></div>
    <a href="https://github.com/karts34" target="_blank" rel="noreferrer" className="pg-github">More from my corner of the internet <span>Explore GitHub <ArrowUpRight size={16} /></span></a>
  </div></section>;
}
