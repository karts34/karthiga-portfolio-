import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: "aalan-techsoft-internship",
    role: "Python Full Stack Intern",
    organization: "Aalan Techsoft",
    duration: "1 Month Internship",
    type: "internship",
    description: "Completed a focused one-month internship centered on Python Full Stack Development. Acquired practical exposure to backend logic implementation, web service integration, and practical software development workflows.",
    highlights: [
      "Worked with Python programming fundamentals and full-stack development concepts.",
      "Gained hands-on experience structuring software components and API integrations.",
      "Collaborated in a professional development environment on structured project tasks."
    ],
    certificateSlot: {
      available: false,
      label: "Internship Certificate / Verification Slot"
    }
  },
  {
    id: "ai-tools-game-training",
    role: "AI Tools Training & Student Workshop Facilitator",
    organization: "Technical Learning Initiative",
    duration: "Completed Training & Teaching Session",
    type: "teaching",
    description: "Completed intensive hands-on AI tools training and subsequently guided and taught fellow students on utilizing modern AI tools to conceptualize, design, and create interactive games.",
    highlights: [
      "Completed hands-on practical training on contemporary AI tools and developer utilities.",
      "Facilitated interactive sessions mentoring peers on game mechanics and AI-assisted prototyping.",
      "Encouraged collaborative problem solving, creative thinking, and prompt-based asset generation."
    ],
    images: [
      "/images/portfolio/ai-tools-game-training-01.jpg",
      "/images/portfolio/ai-tools-game-training-02.jpg"
    ]
  }
];

export const symposiumsData = [
  {
    id: "symposium-1",
    event: "Inter-College Technical Symposium Participation",
    college: "Technical Institution (Details Editable)",
    category: "Technical Events & Paper Presentation",
    status: "Participant",
    notes: "Participated in regional technical symposiums engaging with student developers across peer engineering colleges."
  },
  {
    id: "symposium-2",
    event: "State-Level Technical Symposium & Coding Challenge",
    college: "Engineering College (Details Editable)",
    category: "Algorithm & Problem Solving Track",
    status: "Participant",
    notes: "Engaged in hands-on coding and technical problem-solving competitions."
  }
];
