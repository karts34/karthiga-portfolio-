import React from 'react';
import { Trophy, Award, Users, Clock, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { achievementsData } from '../../data/achievements';

interface AchievementsProps {
  onOpenLightbox: (src: string, alt: string, title?: string, desc?: string) => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ onOpenLightbox }) => {
  return (
    <section id="achievements" className="py-20 lg:py-28 relative overflow-hidden section-divider-mesh">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none -z-1 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full bg-[radial-gradient(circle,rgba(165,107,255,0.08)_0%,rgba(10,5,21,0.04)_50%,transparent_75%)] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Hackathon Victory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Milestones of My <span className="text-cosmic-shimmer">Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Honoring first-place victory in game development at the MAAYA'26 24-hour national hackathon.
          </p>
        </div>

        {/* Featured Achievement Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl shadow-violet/20 relative overflow-hidden reveal-on-scroll">

          {/* Golden Corner Aura */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-amber-500/15 via-violet/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Trophy className="w-6 h-6 text-void" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">
                  1st Place Winner • Game Development
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {achievementsData.event}
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-surface-raised border border-amber-500/30 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block">Award Prize</span>
                <span className="text-xs sm:text-sm font-bold text-amber-300">{achievementsData.reportedTeamPrize}</span>
              </div>
            </div>
          </div>

          {/* Two Column: Images & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">

            {/* Images */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-md">
                <img
                  src={achievementsData.ceremonyImage}
                  alt="MAAYA'26 Award Ceremony victory presentation with Team Crust Innovators"
                  className="w-full h-56 sm:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  onClick={() => onOpenLightbox(
                    achievementsData.ceremonyImage,
                    "MAAYA'26 Award Ceremony Photo",
                    "Award Ceremony Presentation",
                    "Karthiga S. with team Crust Innovators receiving the 1st Place Game Development Award."
                  )}
                  className="absolute inset-0 bg-void/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-sm cursor-pointer"
                  aria-label="Enlarge ceremony photo"
                >
                  <Maximize2 className="w-4 h-4 text-lavender" />
                  <span>Enlarge Ceremony Photo</span>
                </button>
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-void/80 backdrop-blur-sm text-[11px] text-white font-medium text-center">
                  Award Ceremony Presentation
                </div>
              </div>

              <div className="relative group rounded-2xl overflow-hidden border border-border-subtle bg-surface shadow-md">
                <img
                  src={achievementsData.posterImage}
                  alt="MAAYA'26 official 1st place announcement poster"
                  className="w-full h-56 sm:h-64 object-contain bg-black/50 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <button
                  onClick={() => onOpenLightbox(
                    achievementsData.posterImage,
                    "MAAYA'26 Winning Announcement Poster",
                    "Official Winning Poster",
                    "Official announcement poster celebrating Crust Innovators' 1st Place win in Game Development with Dragon Valley Rescue."
                  )}
                  className="absolute inset-0 bg-void/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-sm cursor-pointer"
                  aria-label="Enlarge official winning poster"
                >
                  <Maximize2 className="w-4 h-4 text-lavender" />
                  <span>View Full Poster</span>
                </button>
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-void/80 backdrop-blur-sm text-[11px] text-white font-medium text-center">
                  Official Award Poster
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-lavender" />
                  <span>Hackathon Execution Highlights</span>
                </h4>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  {achievementsData.description}
                </p>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-surface/70 border border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted flex items-center gap-2">
                      <Users className="w-4 h-4 text-lavender" />
                      Team Name:
                    </span>
                    <span className="font-semibold text-white">{achievementsData.team}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-surface/70 border border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted flex items-center gap-2">
                      <Clock className="w-4 h-4 text-violet" />
                      Hackathon Duration:
                    </span>
                    <span className="font-semibold text-white">{achievementsData.duration}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-surface/70 border border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-lavender" />
                      Winning Title:
                    </span>
                    <span className="font-semibold text-lavender">{achievementsData.game}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-surface/70 border border-border-subtle flex items-center justify-between text-xs">
                    <span className="text-text-muted flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      Assigned Role:
                    </span>
                    <span className="font-semibold text-white">{achievementsData.role}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Note */}
          <div className="pt-4 border-t border-border-subtle text-center text-xs text-text-muted">
            ✦ Recognition presented to team <strong className="text-text-secondary">Crust Innovators</strong> in game development. Both official ceremony photography and original poster are preserved above.
          </div>

        </div>

      </div>
    </section>
  );
};
