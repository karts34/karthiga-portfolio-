import React from 'react';
import { Briefcase, GraduationCap, Maximize2, Users, Compass, Award, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { experienceData, symposiumsData } from '../../data/experience';
import { certificatesData } from '../../data/certificates';
import { personalInfo } from '../../data/personalInfo';

interface ExperienceProps {
  onOpenLightbox: (src: string, alt: string, title?: string, desc?: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onOpenLightbox }) => {
  return (
    <section id="experience" className="py-20 lg:py-28 relative overflow-hidden section-divider-mesh">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none -z-1 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(165,107,255,0.06)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-xs font-semibold text-lavender uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Growth Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Learning. Building. <span className="text-cosmic-shimmer">Growing.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Education, professional internship, certifications, teaching sessions, and technical symposium engagements.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet/40 via-violet/20 to-transparent" aria-hidden="true" />

          <div className="space-y-10 ml-10 md:ml-16">

            {/* 1. Education */}
            <div className="relative reveal-on-scroll">
              {/* Timeline dot */}
              <div className="absolute -left-[calc(1.5rem+6.5px)] md:-left-[calc(2rem+6.5px)] top-2 w-3.5 h-3.5 rounded-full bg-violet border-2 border-void shadow-lg shadow-violet/30" />

              <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-border-subtle">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-violet/20 border border-violet/40 flex items-center justify-center text-lavender">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {personalInfo.education.institution}
                      </h3>
                      <span className="text-sm font-medium text-violet">
                        {personalInfo.education.specialization}
                      </span>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-mono text-lavender font-semibold">
                    {personalInfo.education.status}
                  </span>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {personalInfo.education.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-subtle text-xs text-text-secondary">
                  <div>
                    <span className="text-[11px] text-text-muted block">Degree</span>
                    <strong className="text-white">{personalInfo.education.degree}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-text-muted block">Department</span>
                    <strong className="text-white">CSE (AI & ML)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Aalan Techsoft Internship */}
            <div className="relative reveal-on-scroll">
              <div className="absolute -left-[calc(1.5rem+6.5px)] md:-left-[calc(2rem+6.5px)] top-2 w-3.5 h-3.5 rounded-full bg-violet border-2 border-void shadow-lg shadow-violet/30" />

              <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-border-subtle">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-violet/20 border border-violet/40 flex items-center justify-center text-lavender">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Python Full Stack Intern</h3>
                      <span className="text-sm font-medium text-violet">Aalan Techsoft</span>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-mono text-lavender font-semibold">
                    1 Month Internship
                  </span>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Completed an intensive one-month internship focused on Python Full Stack Development. Acquired valuable practical exposure to backend logic implementation, web service integration, and practical software engineering workflows.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-border-subtle text-xs text-text-secondary">
                    <strong className="text-white block mb-1">Backend Fundamentals</strong>
                    Worked with Python programming fundamentals and full-stack architecture principles.
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-border-subtle text-xs text-text-secondary">
                    <strong className="text-white block mb-1">Service Integration</strong>
                    Gained hands-on experience structuring software components and API communication.
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface/70 border border-border-subtle text-xs text-text-secondary">
                    <strong className="text-white block mb-1">Collaborative Workflow</strong>
                    Collaborated in a professional development environment on structured project tasks.
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-border-subtle">
                  <span>Domain: Python Full Stack Development</span>
                  <span className="italic">Verification slot configurable in data/experience.ts</span>
                </div>
              </div>
            </div>

            {/* 3. AI Tools Training & Teaching */}
            <div className="relative reveal-on-scroll">
              <div className="absolute -left-[calc(1.5rem+6.5px)] md:-left-[calc(2rem+6.5px)] top-2 w-3.5 h-3.5 rounded-full bg-violet border-2 border-void shadow-lg shadow-violet/30" />

              <div className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-border-subtle">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-violet/20 border border-violet/40 flex items-center justify-center text-violet">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">AI Tools Training & Game Dev Facilitator</h3>
                      <span className="text-sm font-medium text-lavender">Hands-On Student Training Session</span>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-mono text-violet font-semibold">
                    Completed Training & Teaching
                  </span>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Completed specialized training on modern AI developer tools and subsequently conducted interactive mentoring sessions teaching fellow students how to leverage generative AI tools to conceptualize, design, and build interactive games.
                </p>

                {/* Photo Gallery */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider font-semibold text-text-muted block mb-3">
                    Activity Photography (Click to Inspect)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-md">
                      <img
                        src="/images/portfolio/ai-tools-game-training-01.jpg"
                        alt="Karthiga S. facilitating hands-on AI tools game development training session with students"
                        className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <button
                        onClick={() => onOpenLightbox(
                          "/images/portfolio/ai-tools-game-training-01.jpg",
                          "AI Tools Training Session 01",
                          "Interactive Student Workshop",
                          "Demonstrating generative AI tools and game prototyping logic to peer learners."
                        )}
                        className="absolute inset-0 bg-void/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-sm cursor-pointer"
                        aria-label="Enlarge training photo 1"
                      >
                        <Maximize2 className="w-4 h-4 text-lavender" />
                        <span>Enlarge Photo</span>
                      </button>
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-void/80 backdrop-blur-sm text-[11px] text-white font-medium text-center">
                        Hands-on Prototyping & Guidance
                      </div>
                    </div>

                    <div className="relative group rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-md">
                      <img
                        src="/images/portfolio/ai-tools-game-training-02.jpg"
                        alt="Students actively collaborating on game development using AI tools during training session"
                        className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <button
                        onClick={() => onOpenLightbox(
                          "/images/portfolio/ai-tools-game-training-02.jpg",
                          "AI Tools Training Session 02",
                          "Peer Mentorship & Game Design",
                          "Students building game ideas using AI-assisted creative workflows."
                        )}
                        className="absolute inset-0 bg-void/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-sm cursor-pointer"
                        aria-label="Enlarge training photo 2"
                      >
                        <Maximize2 className="w-4 h-4 text-lavender" />
                        <span>Enlarge Photo</span>
                      </button>
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-void/80 backdrop-blur-sm text-[11px] text-white font-medium text-center">
                        Peer Learning & Interactive Creation
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-border-subtle">
                  <span>Focus: AI-Assisted Creative Game Prototyping</span>
                  <span className="text-violet font-medium">Knowledge Sharing</span>
                </div>
              </div>
            </div>

            {/* 4. Certificates */}
            <div className="relative reveal-on-scroll">
              <div className="absolute -left-[calc(1.5rem+6.5px)] md:-left-[calc(2rem+6.5px)] top-2 w-3.5 h-3.5 rounded-full bg-violet border-2 border-void shadow-lg shadow-violet/30" />

              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-subtle">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-surface-raised flex items-center justify-center text-lavender">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Certificates & Coursework</h3>
                    <p className="text-xs text-text-muted">Completed technical certifications and specialized course trainings.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {certificatesData.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-2xl bg-surface/60 border border-border-subtle hover:border-violet/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-violet uppercase tracking-wider">
                          {cert.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-violet/15 text-lavender border border-violet/25">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{cert.status}</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2">{cert.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">{cert.description}</p>

                      {cert.skillsAcquired && (
                        <div className="flex flex-wrap gap-1">
                          {cert.skillsAcquired.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-surface/80 text-text-secondary border border-border-subtle font-mono">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-text-muted italic text-center">
                  ✦ All certificates represent verified coursework and training. PDF/image files and verification URLs can be attached in <code className="text-lavender">src/data/certificates.ts</code>.
                </p>
              </div>
            </div>

            {/* 5. Symposiums */}
            <div className="relative reveal-on-scroll">
              <div className="absolute -left-[calc(1.5rem+6.5px)] md:-left-[calc(2rem+6.5px)] top-2 w-3.5 h-3.5 rounded-full bg-violet border-2 border-void shadow-lg shadow-violet/30" />

              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-subtle">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-surface-raised flex items-center justify-center text-lavender">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Technical Symposiums & Competitions</h3>
                    <p className="text-xs text-text-muted">Inter-college academic symposium participation across peer engineering institutions.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {symposiumsData.map((sym) => (
                    <div key={sym.id} className="p-4 rounded-2xl bg-surface/60 border border-border-subtle">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white">{sym.event}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet/15 text-lavender">
                          {sym.status}
                        </span>
                      </div>
                      <span className="text-xs text-violet block mb-2">{sym.category}</span>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {sym.notes}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-text-muted italic mt-4 text-center">
                  * Specific host college names and certificate dates remain editable in `src/data/experience.ts`.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
