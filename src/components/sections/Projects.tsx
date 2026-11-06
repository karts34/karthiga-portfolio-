import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  Layers,
  FolderGit2,
  Sparkles,
  Gamepad2,
  Cpu,
  Bot,
  Maximize2,
  CheckCircle2,
  MapPin,
  Eye
} from 'lucide-react';
import { projectsData, draftConcepts } from '../../data/projects';
import { ProjectItem } from '../../types';

interface ProjectsProps {
  onOpenLightbox: (src: string, alt: string, title?: string, desc?: string) => void;
}

type FilterCategory = 'All' | 'AI & ML' | 'Full Stack' | 'Game Development' | 'Local AI';

export const Projects: React.FC<ProjectsProps> = ({ onOpenLightbox }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [showConcepts, setShowConcepts] = useState(false);

  const filterOptions: FilterCategory[] = ['All', 'AI & ML', 'Full Stack', 'Game Development', 'Local AI'];

  // 3D Tilt Effect State & Logic
  const [tiltState, setTiltState] = useState<Record<string, { rotateX: number; rotateY: number; spotX: number; spotY: number }>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prefersReducedMotion = useRef(false);
  const isMobile = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isMobile.current = window.innerWidth < 768;

    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, projectId: string) => {
    if (prefersReducedMotion.current || isMobile.current) return;

    const card = cardRefs.current[projectId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    const spotX = (x / rect.width) * 100;
    const spotY = (y / rect.height) * 100;

    setTiltState((prev) => ({
      ...prev,
      [projectId]: { rotateX, rotateY, spotX, spotY },
    }));
  }, []);

  const handleCardMouseLeave = useCallback((projectId: string) => {
    setTiltState((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
  }, []);

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI & ML':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'Full Stack':
        return <Layers className="w-3.5 h-3.5" />;
      case 'Game Development':
        return <Gamepad2 className="w-3.5 h-3.5" />;
      case 'Local AI':
        return <Bot className="w-3.5 h-3.5" />;
      default:
        return <FolderGit2 className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden section-divider-mesh">
      {/* Dark depth layer */}
      <div className="absolute inset-0 bg-[#030208]/85 pointer-events-none -z-1" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,5,21,0.5)_0%,rgba(3,2,8,0.95)_75%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030208] to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030208] to-transparent opacity-90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-xs font-semibold text-lavender uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Repositories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Things I've <span className="text-cosmic-shimmer">Created</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Verified public repositories showcasing full-stack platforms, 3D game engines, computer vision, and offline AI inference.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 reveal-on-scroll">
          {filterOptions.map((cat) => {
            const count = cat === 'All' ? projectsData.length : projectsData.filter(p => p.category === cat).length;
            const isSelected = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setShowConcepts(false); }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet ${
                  isSelected && !showConcepts
                    ? 'bg-gradient-to-r from-violet to-nebula text-white shadow-md shadow-violet/30 border border-lavender/30'
                    : 'bg-surface/70 hover:bg-surface-raised text-text-secondary hover:text-white border border-border-subtle'
                }`}
                aria-pressed={isSelected}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-surface-raised text-text-muted'}`}>
                  {count}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => setShowConcepts(!showConcepts)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet ${
              showConcepts
                ? 'bg-violet/20 text-violet border border-violet/40'
                : 'bg-surface/50 hover:bg-surface-raised text-text-muted border border-dashed border-border-subtle'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Future Concepts ({draftConcepts.length})</span>
          </button>
        </div>

        {/* Draft Concepts */}
        {showConcepts ? (
          <div className="mb-16">
            <div className="p-4 rounded-2xl bg-surface/60 border border-violet/20 mb-6 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-violet flex-shrink-0" />
              <p className="text-xs sm:text-sm text-text-secondary">
                <strong className="text-white">Research & In-Progress Drafts:</strong> These represent concept architectures and upcoming project prototypes currently in active ideation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {draftConcepts.map((item) => (
                <div key={item.id} className="glass-panel rounded-2xl p-6 border border-border-subtle reveal-on-scroll">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-violet/15 text-violet border border-violet/25">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Project Cards */
          <div className="space-y-10">
            {filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  ref={(el) => { cardRefs.current[project.id] = el; }}
                  onMouseMove={(e) => handleCardMouseMove(e, project.id)}
                  onMouseLeave={() => handleCardMouseLeave(project.id)}
                  className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 lg:p-10 border border-border-subtle hover:border-violet/40 transition-all relative overflow-hidden reveal-on-scroll"
                  style={{
                    transform: tiltState[project.id]
                      ? `perspective(1000px) rotateX(${tiltState[project.id].rotateX}deg) rotateY(${tiltState[project.id].rotateY}deg)`
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                    transition: tiltState[project.id]
                      ? 'transform 0.1s ease-out'
                      : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                  }}
                >
                  {/* Tilt spotlight overlay */}
                  {tiltState[project.id] && (
                    <div
                      className="absolute inset-0 pointer-events-none z-[1]"
                      style={{
                        background: `radial-gradient(600px circle at ${tiltState[project.id].spotX}% ${tiltState[project.id].spotY}%, rgba(165, 107, 255, 0.07), transparent 60%)`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Visual Column */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      {project.image ? (
                        <div className="relative group rounded-2xl overflow-hidden border border-violet/30 bg-surface shadow-xl">
                          <img
                            src={project.image}
                            alt={`${project.title} official poster graphic`}
                            className="w-full h-auto aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <button
                            onClick={() => onOpenLightbox(project.image!, `${project.title} poster`, project.title, project.description)}
                            className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-sm cursor-pointer"
                            aria-label={`View full poster for ${project.title}`}
                          >
                            <Maximize2 className="w-4 h-4 text-lavender" />
                            <span>View Full Poster</span>
                          </button>
                        </div>
                      ) : project.id === 'avs-campus-management' ? (
                        <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#150C28] to-[#0a0515] border border-violet/30 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
                          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full bg-violet animate-pulse" />
                              <span className="text-xs font-mono font-semibold text-white">AVS_CAMPUS_PORTAL.v2</span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet/20 text-lavender">Next.js + NestJS</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 my-2">
                            <div className="p-2 rounded bg-surface/70 border border-border-subtle text-left">
                              <span className="text-[10px] text-text-muted block">Attendance</span>
                              <span className="text-xs font-bold text-violet">96.8% Sync</span>
                            </div>
                            <div className="p-2 rounded bg-surface/70 border border-border-subtle text-left">
                              <span className="text-[10px] text-text-muted block">Grievance Flow</span>
                              <span className="text-xs font-bold text-lavender">Role-Based</span>
                            </div>
                            <div className="p-2 rounded bg-surface/70 border border-border-subtle text-left">
                              <span className="text-[10px] text-text-muted block">Queues</span>
                              <span className="text-xs font-bold text-violet">BullMQ / Redis</span>
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-surface/90 border border-violet/20 flex items-center justify-between">
                            <span className="text-[11px] text-text-secondary flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-lavender" />
                              Issues Routing & Multi-Tenant Onboarding
                            </span>
                            <span className="text-[10px] font-mono text-text-muted">PostgreSQL</span>
                          </div>
                        </div>
                      ) : project.id === 'visionx-ai-analyzer' ? (
                        <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#120E24] to-[#080510] border border-violet/30 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
                          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                            <div className="flex items-center gap-2">
                              <Cpu className="w-3.5 h-3.5 text-violet" />
                              <span className="text-xs font-mono font-semibold text-white">VisionX_Pipeline [YOLO + OpenCV]</span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet/20 text-violet">FastAPI</span>
                          </div>
                          <div className="relative w-full h-24 border border-dashed border-violet/40 rounded-lg flex items-center justify-center bg-surface/30">
                            <div className="absolute top-2 left-4 px-1.5 py-0.5 rounded bg-violet text-[9px] font-mono text-white">
                              object_detect: 0.94
                            </div>
                            <div className="w-20 h-16 border-2 border-violet rounded flex items-center justify-center">
                              <Eye className="w-6 h-6 text-lavender opacity-60" />
                            </div>
                            <div className="absolute bottom-2 right-4 text-[9px] font-mono text-text-muted">
                              Annotated Video Stream
                            </div>
                          </div>
                          <div className="text-[11px] text-text-secondary flex items-center justify-between">
                            <span>Webcam Tracking & Annotation</span>
                            <span className="text-violet font-mono text-[10px]">Real-Time Service</span>
                          </div>
                        </div>
                      ) : project.id === 'offline-ai-chatbot' ? (
                        <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#140F29] to-[#080510] border border-violet/30 p-5 flex flex-col justify-between shadow-xl relative">
                          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                            <div className="flex items-center gap-2">
                              <Bot className="w-3.5 h-3.5 text-lavender" />
                              <span className="text-xs font-mono font-semibold text-white">LOCAL_OLLAMA_SERVER</span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet/20 text-lavender">Offline Ready</span>
                          </div>
                          <div className="space-y-1.5 my-2">
                            <div className="p-2 rounded bg-surface/80 border border-border-subtle flex items-center justify-between text-xs">
                              <span className="text-text-muted font-mono">Model:</span>
                              <span className="font-semibold text-lavender font-mono">Qwen 2.5 / Llama 3 / Gemma</span>
                            </div>
                            <div className="p-2 rounded bg-surface/40 text-[11px] text-text-secondary italic">
                              "Inference executed on-device without internet connection."
                            </div>
                          </div>
                          <div className="text-[11px] text-text-muted flex items-center justify-between pt-2 border-t border-border-subtle">
                            <span>Zero Cloud API Latency</span>
                            <span className="text-lavender font-mono text-[10px]">Privacy Preserved</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#1B1238] to-[#0a0515] border border-violet/30 p-5 flex flex-col justify-between shadow-xl relative">
                          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                            <div className="flex items-center gap-2">
                              <Gamepad2 className="w-3.5 h-3.5 text-lavender" />
                              <span className="text-xs font-mono font-semibold text-white">APEX: Solstice City</span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet/20 text-lavender">Unity / C#</span>
                          </div>
                          <div className="flex-1 flex flex-col justify-center items-center py-2 text-center">
                            <div className="w-12 h-12 rounded-full bg-violet/20 border border-violet/40 flex items-center justify-center mb-2">
                              <Gamepad2 className="w-6 h-6 text-lavender" />
                            </div>
                            <span className="text-xs font-semibold text-white">Metropolis Driving & Grand Tour Speedway</span>
                            <span className="text-[10px] text-text-muted mt-1">Superhero movement abilities & vehicle physics</span>
                          </div>
                          <div className="text-[11px] text-text-muted flex items-center justify-between pt-2 border-t border-border-subtle">
                            <span>Windows Standalone Build</span>
                            <span className="text-violet font-mono text-[10px]">C# Mechanics</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet/20 text-lavender border border-violet/30">
                            {getCategoryIcon(project.category)}
                            <span>{project.category}</span>
                          </span>
                          {project.featured && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-violet/20 text-violet border border-violet/30">
                              Featured Build
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>

                        {project.subtitle && (
                          <p className="text-xs sm:text-sm font-medium text-violet mb-4">
                            {project.subtitle}
                          </p>
                        )}

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {project.detailedDescription && (
                          <p className="text-xs text-text-muted leading-relaxed mb-5">
                            {project.detailedDescription}
                          </p>
                        )}

                        {project.regions && (
                          <div className="mb-5 p-3 rounded-xl bg-surface/50 border border-border-subtle">
                            <span className="text-[11px] font-semibold text-lavender block mb-2 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              Seven Storybook Quest Regions:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {project.regions.map((reg, rIdx) => (
                                <span key={rIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-raised text-text-secondary border border-border-subtle">
                                  {reg}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-raised/80 text-white border border-border-subtle font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border-subtle flex items-center gap-3">
                        <a
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet to-nebula hover:brightness-110 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-violet/20 flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                          aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
                        >
                          <Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                          <span>View Source Code</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                        </a>
                        <span className="text-[11px] text-text-muted">
                          Public Repository • karts34
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
