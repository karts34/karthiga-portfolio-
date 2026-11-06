import React, { useState } from 'react';
import { Compass, Lightbulb, TrendingUp, Sparkles, Star, BookOpen } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

const constellationStars = [
  { id: 1, label: "Curiosity", x: 15, y: 35, role: "Exploring new AI paradigms" },
  { id: 2, label: "Logic", x: 30, y: 70, role: "Data structures & problem solving" },
  { id: 3, label: "AI Vision", x: 50, y: 25, role: "Computer vision & model inference" },
  { id: 4, label: "Code Craft", x: 65, y: 65, role: "Full-stack clean architecture" },
  { id: 5, label: "Resilience", x: 80, y: 30, role: "24-hr hackathon persistence" },
  { id: 6, label: "Creativity", x: 88, y: 75, role: "Game worlds & narrative mechanics" },
  { id: 7, label: "Synergy", x: 42, y: 85, role: "Collaborative teamwork & teaching" },
];

export const About: React.FC = () => {
  const [activeStar, setActiveStar] = useState<number | null>(null);

  const getPillarIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'explore':
        return <Compass className="w-5 h-5 text-violet" />;
      case 'create':
      case 'build':
        return <Lightbulb className="w-5 h-5 text-lavender" />;
      default:
        return <TrendingUp className="w-5 h-5 text-violet" />;
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden section-divider-mesh">
      {/* Subtle nebula glow */}
      <div
        className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(165,107,255,0.06)_0%,transparent_70%)] blur-[100px] pointer-events-none -z-1"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-xs font-semibold text-lavender uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Beyond the <span className="text-cosmic-shimmer">Code</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Rooted in curiosity and grounded by hands-on engineering.
          </p>
        </div>

        {/* Narrative & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

          {/* Main Story Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden reveal-on-scroll">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet/8 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-lavender" />
              <span>Engineering Journey & Passions</span>
            </h3>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
              I am currently in my second year pursuing Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at <strong className="text-white font-medium">AVS Engineering College</strong>.
            </p>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
              My engineering education is driven by practical execution. Rather than just studying theoretical algorithms, I actively test ideas: whether that involves training object detection pipelines with OpenCV and YOLO, exploring local language models through Ollama, programming full-stack responsive web systems, or designing interactive 3D game quests with Unity.
            </p>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              Hackathons have been my favorite proving ground—collaborating with peers under tight deadlines, architecting solutions from concept to functional build, and turning creative dreams into real software.
            </p>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-border-subtle">
              <div className="p-3 rounded-xl bg-surface/60 border border-border-subtle">
                <span className="text-[11px] text-text-muted block">Program</span>
                <span className="text-xs sm:text-sm font-semibold text-white">B.E. CSE (AI&ML)</span>
              </div>
              <div className="p-3 rounded-xl bg-surface/60 border border-border-subtle">
                <span className="text-[11px] text-text-muted block">Status</span>
                <span className="text-xs sm:text-sm font-semibold text-white">2nd Year Student</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-surface/60 border border-border-subtle">
                <span className="text-[11px] text-text-muted block">Core Approach</span>
                <span className="text-xs sm:text-sm font-semibold text-lavender">Build & Experiment</span>
              </div>
            </div>
          </div>

          {/* Constellation Widget */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between reveal-on-scroll">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-lavender" />
                  <span>The Seven-Star Constellation</span>
                </h3>
                <span className="text-[11px] text-violet font-mono px-2 py-0.5 rounded-full bg-violet/10 border border-violet/20">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-text-muted mb-4">
                Hover or tap any of the seven stars to reveal the values shaping my developer journey.
              </p>
            </div>

            <div className="relative w-full h-56 bg-surface/80 rounded-2xl border border-border-subtle p-3 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <line x1="15" y1="35" x2="30" y2="70" stroke="rgba(165, 107, 255, 0.35)" strokeWidth="0.8" strokeDasharray="1 1" />
                <line x1="30" y1="70" x2="42" y2="85" stroke="rgba(165, 107, 255, 0.35)" strokeWidth="0.8" strokeDasharray="1 1" />
                <line x1="15" y1="35" x2="50" y2="25" stroke="rgba(165, 107, 255, 0.35)" strokeWidth="0.8" strokeDasharray="1 1" />
                <line x1="50" y1="25" x2="65" y2="65" stroke="rgba(165, 107, 255, 0.35)" strokeWidth="0.8" strokeDasharray="1 1" />
                <line x1="65" y1="65" x2="80" y2="30" stroke="rgba(165, 107, 255, 0.35)" strokeWidth="0.8" strokeDasharray="1 1" />
                <line x1="80" y1="30" x2="88" y2="75" stroke="rgba(165, 107, 255, 0.35)" strokeWidth="0.8" strokeDasharray="1 1" />
                <line x1="42" y1="85" x2="65" y2="65" stroke="rgba(165, 107, 255, 0.25)" strokeWidth="0.6" strokeDasharray="2 2" />

                {constellationStars.map((star) => {
                  const isHovered = activeStar === star.id;
                  return (
                    <g
                      key={star.id}
                      className="cursor-pointer transition-transform"
                      onMouseEnter={() => setActiveStar(star.id)}
                      onMouseLeave={() => setActiveStar(null)}
                      onClick={() => setActiveStar(activeStar === star.id ? null : star.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${star.label}: ${star.role}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveStar(activeStar === star.id ? null : star.id);
                        }
                      }}
                    >
                      {isHovered && (
                        <circle cx={star.x} cy={star.y} r="6" fill="rgba(198, 167, 255, 0.3)" />
                      )}
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r={isHovered ? "3.2" : "2"}
                        fill={isHovered ? "#FFFFFF" : "#C6A7FF"}
                        className="transition-all"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-surface-raised/95 border border-violet/30 text-center transition-all">
                {activeStar ? (
                  <div>
                    <span className="text-xs font-bold text-lavender mr-1.5">
                      {constellationStars.find(s => s.id === activeStar)?.label}:
                    </span>
                    <span className="text-[11px] text-text-secondary">
                      {constellationStars.find(s => s.id === activeStar)?.role}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-text-muted italic">
                    ✦ Hover or select a star in the constellation
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
              <span>Seven Stars of Growth</span>
              <span className="text-lavender">Hidden Universe Symbol</span>
            </div>
          </div>

        </div>

        {/* Three Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {personalInfo.values.map((val, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 relative border border-border-subtle hover:border-violet/40 transition-all reveal-on-scroll"
            >
              <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-subtle flex items-center justify-center mb-4 shadow-sm">
                {getPillarIcon(val.title)}
              </div>
              <div className="text-xs font-semibold tracking-wider text-violet uppercase mb-1">
                {val.tagline}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {val.title}
              </h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
