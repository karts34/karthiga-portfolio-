import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: "avs-campus-management",
    title: "AVS Campus Management System",
    subtitle: "Enterprise Campus Operations & Issue Resolution Platform",
    category: "Full Stack",
    description: "A comprehensive campus management application supporting student attendance tracking, campus issue reporting, role-based administration, internal messaging, broadcast announcements, and data onboarding.",
    detailedDescription: "Designed to streamline administrative workflows and student-campus grievance resolution. Employs micro-services architecture with robust background job processing for campus notifications and multi-role access controls.",
    technologies: ["Next.js", "React", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Redis / BullMQ"],
    repositoryUrl: "https://github.com/karts34/AVS-College-Management-Issues-APP",
    featured: true,
  },
  {
    id: "dragon-valley-rescue",
    title: "Dragon Valley Rescue — Adventure Quest",
    subtitle: "Storybook Third-Person Puzzle & Exploration Adventure",
    category: "Game Development",
    description: "A storybook-style third-person adventure in which players traverse seven mythical regions, interact with robotic mechanisms, solve environmental puzzles, and fulfill a mission to rescue the ancient dragon.",
    detailedDescription: "Built with Unity 6 and C#, featuring fluid character movement, regional puzzle triggers, interactive mechanisms, and cinematic atmospheric lighting.",
    technologies: ["Unity 6", "C#", "3D Level Design", "Environmental Puzzles"],
    repositoryUrl: "https://github.com/karts34/Dragon-valley-rescue-game",
    image: "/images/portfolio/dragon-valley-rescue-game-poster.jpg",
    regions: [
      "Grand Gateway",
      "Hidden Forest",
      "Rainbow Bridge",
      "Castle Place",
      "Mystery Cave",
      "Fairy Garden",
      "Dragon Valley"
    ],
    featured: true,
  },
  {
    id: "visionx-ai-analyzer",
    title: "VisionX AI Analyzer",
    subtitle: "Real-Time Computer Vision & Detection Dashboard",
    category: "AI & ML",
    description: "A computer-vision application combining a modern web dashboard with an asynchronous Python backend for real-time image analysis, multi-class object detection, webcam tracking, and video stream annotation.",
    detailedDescription: "Integrates Ultralytics YOLO detection pipelines with FastAPI endpoints to stream annotated frames and structured bounding-box inference data directly to the client interface.",
    technologies: ["React", "TypeScript", "Python", "FastAPI", "OpenCV", "Ultralytics YOLO"],
    repositoryUrl: "https://github.com/karts34/Build-visionX-AI-analyzer",
    featured: false,
  },
  {
    id: "offline-ai-chatbot",
    title: "Offline Multi-Model AI Chatbot",
    subtitle: "Zero-Cloud Local LLM Inference Engine",
    category: "Local AI",
    description: "A locally running chatbot powered by Ollama and a Python server, supporting selectable local language models such as Qwen, Llama, and Gemma. Once weights are downloaded, all inference runs entirely on-device without internet access.",
    detailedDescription: "Prioritizes user privacy, zero cloud API fees, and prompt engineering customization. Provides local session caching and model parameter switching on the fly.",
    technologies: ["Python", "Ollama", "Qwen", "Llama", "Gemma", "Local Inference"],
    repositoryUrl: "https://github.com/karts34/Qwen-Ai-chatbot-",
    featured: false,
  },
  {
    id: "apex-afterglow-racing",
    title: "APEX / Afterglow: Superhero City & Racing Game",
    subtitle: "Open-World Metropolis Driving & Track Circuit",
    category: "Game Development",
    description: "A standalone Windows game combining a superhero-style metropolis (Solstice City) with responsive movement mechanics, multi-car driving physics, vehicle selection, and a dedicated racing speedway circuit (Grand Tour).",
    detailedDescription: "Features custom vehicle suspension logic, urban navigation routes, and track-based checkpoint lap timing implemented in C# and Unity.",
    technologies: ["Unity", "C#", "Vehicle Physics", "Level Architecture"],
    repositoryUrl: "https://github.com/karts34/Multi-car-racing-selection-",
    featured: false,
  }
];

export const draftConcepts = [
  {
    id: "devicedna-ai",
    title: "DeviceDNA AI",
    status: "Concept / In Research",
    description: "Hardware telemetry profiling and intelligent predictive maintenance framework using lightweight edge ML."
  },
  {
    id: "skillcert360",
    title: "SkillCert360",
    status: "Concept / In Design",
    description: "Decentralized verification platform for technical credentials and student skill validations."
  },
  {
    id: "cr-attendance",
    title: "CR Attendance Manager",
    status: "Concept / In Progress",
    description: "Automated student class representative logging utility with instant timetable sync."
  },
  {
    id: "smart-energy-grid",
    title: "Smart Energy Grid + Digital Twin",
    status: "Concept / Research",
    description: "Simulation dashboard modeling micro-grid load distributions and renewable energy dispatch."
  }
];
