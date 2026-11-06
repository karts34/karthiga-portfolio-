import React from 'react';
import { Code2, Globe, Sparkles, Terminal, Layers } from 'lucide-react';
import { skillsData } from '../../data/skills';

export const Skills: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-lavender" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-violet" />;
      default:
        return <Sparkles className="w-5 h-5 text-violet" />;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative overflow-hidden section-divider-mesh">
      <div
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(165,107,255,0.06)_0%,transparent_70%)] blur-[90px] pointer-events-none -z-1"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-xs font-semibold text-lavender uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Toolset</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            My Technical <span className="text-cosmic-shimmer">Universe</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Honest foundations, essential web capabilities, and continuous areas of active exploration.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 stagger-children">
          {skillsData.map((category, catIdx) => (
            <div
              key={catIdx}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border-subtle relative overflow-hidden reveal-on-scroll"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-violet/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-raised border border-border-subtle flex items-center justify-center shadow-sm">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  {category.description}
                </p>

                <div className="space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-surface/70 border border-border-subtle hover:border-violet/40 hover:bg-surface-raised transition-all group"
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-white group-hover:text-lavender transition-colors">
                          {skill.name}
                        </span>
                        {skill.levelTag && (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-violet/15 text-lavender border border-violet/25">
                            {skill.levelTag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle/60 flex items-center gap-2 text-[11px] text-text-muted">
                <Terminal className="w-3.5 h-3.5 text-violet" />
                <span>Project-applied & academic coursework</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-text-muted max-w-2xl mx-auto italic">
            * Specific libraries and database frameworks (e.g., OpenCV, FastAPI, NestJS, Prisma, Unity 6) are demonstrated through individual repository projects below rather than claimed as standalone masteries.
          </p>
        </div>

      </div>
    </section>
  );
};
