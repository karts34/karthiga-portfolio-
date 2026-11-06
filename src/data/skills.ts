import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Fundamentals",
    description: "Core programming languages studied for problem-solving, algorithmic logic, and software development foundations.",
    iconName: "Code2",
    skills: [
      {
        name: "Python",
        description: "Core syntax, data structures, automation scripting, and backend prototyping.",
        levelTag: "Primary Focus"
      },
      {
        name: "C",
        description: "Procedural logic, memory concepts, algorithm foundations, and academic coursework.",
        levelTag: "Academic Core"
      },
      {
        name: "Java",
        description: "Object-oriented programming, class hierarchies, and software design principles.",
        levelTag: "Core Language"
      }
    ]
  },
  {
    title: "Web Basics",
    description: "Fundamental client-side building blocks for accessible, responsive user interfaces and interactive structures.",
    iconName: "Globe",
    skills: [
      {
        name: "HTML5",
        description: "Semantic document structure, accessibility conventions, forms, and responsive layouts.",
        levelTag: "Semantic Structure"
      },
      {
        name: "CSS3",
        description: "Modern layouts (Flexbox, Grid), responsive media queries, and visual design systems.",
        levelTag: "Visual Design"
      },
      {
        name: "JavaScript",
        description: "ES6+ fundamentals, DOM manipulation, asynchronous promises, and client-side logic.",
        levelTag: "Interactive Logic"
      }
    ]
  },
  {
    title: "Learning & Interests",
    description: "Current frontiers of exploration, creative experiments, and rapid prototyping workflows.",
    iconName: "Sparkles",
    skills: [
      {
        name: "AI / ML Concepts",
        description: "Foundational machine learning pipelines, model inference, computer vision concepts, and ongoing coursework.",
        levelTag: "Active Learning"
      },
      {
        name: "AI Tools & AI-Assisted Prototyping",
        description: "Leveraging generative AI workflows, prompt design, and AI developer tools for accelerated project development.",
        levelTag: "Exploration"
      },
      {
        name: "Python Full Stack Development",
        description: "Integrating Python backend services, database connections, and REST API endpoints with front-end interfaces.",
        levelTag: "Hands-on Focus"
      },
      {
        name: "Creative Game Development using AI Tools",
        description: "Experimenting with game design, Unity mechanics, and AI tools for asset and storyline prototyping.",
        levelTag: "Hackathon Tested"
      }
    ]
  }
];
