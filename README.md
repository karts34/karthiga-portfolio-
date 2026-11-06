# Karthiga S. — Hidden Universe Portfolio

> *“Creating my own universe with code, creativity, and dreams.”*

A personal, responsive portfolio for **Karthiga S.**, second-year Computer Science and Engineering (Artificial Intelligence and Machine Learning) student at **AVS Engineering College**.

Built with an original cosmic noir aesthetic—featuring deep violet nebula gradients, starry constellations, responsive UI, accessible keyboard navigation, and verified project records.

---

## 🌌 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + Custom Cosmic Design Tokens & Glassmorphism
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Cinzel](https://fonts.google.com/specimen/Cinzel)

---

## 🚀 How to Run Locally

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173/` (or `http://127.0.0.1:5173/`).

3. **Create a production build**:
   ```bash
   npm run build
   ```
   The optimized production bundle is generated in the `dist/` directory.

4. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
├── public/
│   └── images/
│       └── portfolio/
│           ├── profile-karthiga.jpg                 # Portrait photo
│           ├── maaya26-award-ceremony.jpg           # MAAYA'26 1st Place ceremony photo
│           ├── maaya26-first-place-poster.jpg       # MAAYA'26 winning announcement poster
│           ├── dragon-valley-rescue-game-poster.jpg # Dragon Valley Rescue game poster
│           ├── ai-tools-game-training-01.jpg        # AI tools teaching activity photo 1
│           └── ai-tools-game-training-02.jpg        # AI tools teaching activity photo 2
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── GalaxyBackground.tsx                 # Twinkling stars, nebulae, & orbital curves
│   │   │   ├── ImageLightbox.tsx                    # Full-screen accessible image zoom
│   │   │   └── EasterEggModal.tsx                   # Hidden star celestial quote modal
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                           # Sticky translucent navigation & mobile drawer
│   │   │   └── Footer.tsx                           # Brand, navigation anchors, & hidden star
│   │   └── sections/
│   │       ├── Hero.tsx                             # Portrait halo, rotating roles, & CTAs
│   │       ├── About.tsx                            # Narrative & interactive 7-star constellation
│   │       ├── Skills.tsx                           # Verified programming, web, & learning toolset
│   │       ├── Projects.tsx                         # 5 verified GitHub repositories & filter buttons
│   │       ├── Achievements.tsx                     # MAAYA'26 First Place hackathon showcase
│   │       ├── Experience.tsx                       # Aalan Techsoft internship & teaching gallery
│   │       ├── Certificates.tsx                     # Python, Full Stack, & AI tools coursework
│   │       ├── Education.tsx                        # AVS Engineering College (CSE AI&ML)
│   │       └── Contact.tsx                          # Accessible form, validation, & honest fallback
│   ├── data/
│   │   ├── personalInfo.ts                          # Name, roles, intro, education, & socials
│   │   ├── projects.ts                              # Verified project repositories & details
│   │   ├── achievements.ts                          # MAAYA'26 hackathon victory records
│   │   ├── experience.ts                            # Internship details & symposiums
│   │   ├── certificates.ts                          # Coursework & certification records
│   │   └── skills.ts                                # Organized skill definitions
│   ├── types/
│   │   └── index.ts                                 # Shared TypeScript interfaces
│   ├── App.tsx                                      # Root application & intersection observers
│   ├── main.tsx                                     # React 18 DOM mount point
│   └── index.css                                    # Cosmic design tokens & animation keyframes
├── tailwind.config.js                               # Cosmic color tokens & theme extensions
└── vite.config.ts                                   # Vite bundler configuration
```

---

## 🎨 How to Edit & Customize

All data is strictly decoupled from the UI components:

1. **Personal Information, Contact Number & Social URLs**:
   - Edit [src/data/personalInfo.ts](file:///e:/karthiga%20portfolio/src/data/personalInfo.ts).
   - Update `contact.phone` and `contact.phoneTel` for the direct call card and footer link.
   - Set `email` in `socialLinks` when ready for direct `mailto:` form launches.

2. **Project Repositories & Tech Stacks**:
   - Edit [src/data/projects.ts](file:///e:/karthiga%20portfolio/src/data/projects.ts).
   - Add new verified repositories or update descriptions.

3. **Achievements & Hackathon Awards**:
   - Edit [src/data/achievements.ts](file:///e:/karthiga%20portfolio/src/data/achievements.ts).

4. **Certificates & Experience**:
   - Edit [src/data/certificates.ts](file:///e:/karthiga%20portfolio/src/data/certificates.ts) and [src/data/experience.ts](file:///e:/karthiga%20portfolio/src/data/experience.ts).

5. **Replacing Portfolio Images**:
   - Simply drop new photos into `public/images/portfolio/` with the corresponding filenames or update paths in the data files.

---

## 🌟 Verified Repositories Included

1. [AVS-College-Management-Issues-APP](https://github.com/karts34/AVS-College-Management-Issues-APP) (Full Stack)
2. [Dragon-valley-rescue-game](https://github.com/karts34/Dragon-valley-rescue-game) (Game Development - Unity 6 / C#)
3. [Multi-car-racing-selection-](https://github.com/karts34/Multi-car-racing-selection-) (Game Development - APEX Racing)
4. [Build-visionX-AI-analyzer](https://github.com/karts34/Build-visionX-AI-analyzer) (AI & ML - YOLO / OpenCV)
5. [Qwen-Ai-chatbot-](https://github.com/karts34/Qwen-Ai-chatbot-) (Local AI - Ollama / On-device Inference)

---

## 🛡️ Privacy & Authenticity Guarantees

- **No Invented Facts**: Zero fabricated professional years, fake GPA, or simulated test scores.
- **No Private Credentials**: No API keys, passwords, or private environment variables are included.
- **True Image Fidelity**: Original photos and posters are preserved with natural tones, high contrast, and full uncropped lightbox zoom.
