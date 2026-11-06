export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'AI & ML' | 'Full Stack' | 'Game Development' | 'Local AI';
  description: string;
  detailedDescription?: string;
  technologies: string[];
  repositoryUrl: string;
  liveDemoUrl?: string; // Only when verified
  featured?: boolean;
  image?: string;
  regions?: string[]; // for Dragon Valley Rescue
  isConcept?: boolean;
}

export interface AchievementItem {
  id: string;
  event: string;
  result: string;
  team: string;
  game: string;
  role: string;
  duration: string;
  reportedTeamPrize: string;
  description: string;
  ceremonyImage: string;
  posterImage: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  duration: string;
  type: 'internship' | 'training' | 'teaching';
  description: string;
  highlights?: string[];
  images?: string[];
  certificateSlot?: {
    available: boolean;
    url?: string;
    label?: string;
  };
}

export interface CertificateItem {
  id: string;
  title: string;
  category: string;
  status: 'Completed' | 'In Progress' | 'Verified';
  description: string;
  verificationUrl?: string;
  image?: string;
  skillsAcquired?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    description: string;
    levelTag?: string;
  }[];
}
