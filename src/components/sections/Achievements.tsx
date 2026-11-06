import { ArrowUpRight, Trophy } from 'lucide-react';
import { achievementsData as achievement } from '../../data/achievements';
import type { OpenImage } from '../../App';

export function Achievements({ onOpenLightbox }: { onOpenLightbox: OpenImage }) {
  return <section id="achievements" className="section-shell achievements-section" aria-labelledby="achievements-title"><div className="container">
    <p className="section-kicker reveal-on-scroll">04 / A MOMENT AMONG THE STARS</p>
    <div className="achievement-feature"><div className="achievement-copy reveal-on-scroll"><div className="achievement-award"><Trophy size={20} /><span>MAAYA’26 · GAME DEVELOPMENT</span></div><h2 id="achievements-title" className="section-heading">One idea.<br />24 hours.<br /><span>First place.</span></h2><p className="section-intro">{achievement.description}</p><div className="achievement-facts"><div><small>THE TEAM</small><strong>{achievement.team}</strong></div><div><small>THE PROJECT</small><strong>{achievement.game}</strong></div></div><button type="button" className="text-action" onClick={() => onOpenLightbox(achievement.posterImage, 'MAAYA26 first-place announcement poster', achievement.event, achievement.reportedTeamPrize)}>View the winning moment <ArrowUpRight size={16} /></button></div>
      <button type="button" className="achievement-photo reveal-on-scroll" onClick={() => onOpenLightbox(achievement.ceremonyImage, 'Karthiga and team Crust Innovators at the MAAYA26 award ceremony', achievement.result)}><img src={achievement.ceremonyImage} alt="Team Crust Innovators receiving the MAAYA26 first-place award" loading="lazy" width="1200" height="900" /><span className="achievement-photo-caption"><span>CRUST INNOVATORS / MAAYA’26</span><ArrowUpRight size={19} /></span><span className="award-seal"><Trophy size={20} /><strong>1<sup>ST</sup></strong><small>PLACE</small></span></button></div>
  </div></section>;
}
