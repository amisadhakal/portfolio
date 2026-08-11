import React from "react";
import { Mail, Github, Linkedin, ArrowUpRight, Code2, Sparkles, Send } from "lucide-react";

/* ----------------------------------------------------------------------
   PORTFOLIO CONFIG & DATA
   - Update your photo URL, links, and project info here
---------------------------------------------------------------------- */
const PROFILE = {
  name: "Amisa",
  fullName: "Amisa Dhakal",
  title: "Full-Stack & Computer Vision Developer",
  bio: "CS & IT student at ASMT. I build high-performance web apps and explore practical applications in computer vision, taking ideas from concept to deployed code.",
  // Replace with your image link (e.g., "/my-photo.jpg" or a hosted URL)
  photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
};

const CONTACT = {
  email: "amisadhakal1@gmail.com",
  github: "https://github.com/amisadhakal",
  linkedin: "https://www.linkedin.com/in/amisa-dhakal-1192b42a0",
};

const SKILLS = [
  { name: "React.js", category: "frontend" },
  { name: "JavaScript (ES6+)", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Python", category: "backend" },
  { name: "Flask", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "OpenCV", category: "vision" },
  { name: "MediaPipe", category: "vision" },
  { name: "REST APIs", category: "tech" },
  { name: "Git & GitHub", category: "tools" },
];

const PROJECTS = [
  {
    title: "Drape",
    subtitle: "Virtual Try-On System",
    role: "Lead Developer",
    image: "/imag.png",
    description:
      "A full-stack virtual try-on application. Uses MediaPipe and OpenCV for real-time body-landmark tracking and garment alignment, backed by Flask and MongoDB.",
    tech: ["React", "Flask", "MongoDB", "MediaPipe", "OpenCV"],
    githubUrl: CONTACT.github,
    featured: true,
  },
  {
    title: "Care Path",
    subtitle: "Healthcare Appointment Portal",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    description:
      "A mobile-first appointment booking platform built around reusable React component architectures and robust REST API integrations.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "REST APIs"],
    githubUrl: CONTACT.github,
    featured: false,
  },
];

/* ----------------------------------------------------------------------
   SUB-COMPONENTS
---------------------------------------------------------------------- */

function Navbar() {
  return (
    <nav className="site-nav">
      <div className="nav-logo">
        <span className="dot" />
        <span className="name">{PROFILE.fullName}</span>
      </div>
      <div className="nav-menu">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#work">Projects</a>
        <a href={`mailto:${CONTACT.email}`} className="nav-cta">
          Get in Touch
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero-section" id="about">
      {/* Left Column: Text & Intro */}
      <div className="hero-content">
        <div className="badge-pill">
          <Sparkles size={14} className="icon" /> Available for Internships & Projects
        </div>
        <h1 className="hero-heading">
          Hello, <br />
          I am <span className="highlight-text">{PROFILE.name}</span>, <br />
          Frontend & CV Engineer
        </h1>
        <p className="hero-description">{PROFILE.bio}</p>

        <div className="hero-actions">
          <a href={`mailto:${CONTACT.email}`} className="btn-primary">
            <Send size={16} /> Let's talk
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" className="btn-secondary">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>

      {/* Right Column: Photo Frame */}
      <div className="hero-media">
        <div className="photo-frame-wrapper">
          <div className="photo-frame">
            <img src={PROFILE.photoUrl} alt={PROFILE.fullName} className="user-photo" />
            <div className="overlay-gradient" />
          </div>
          {/* Decorative floating badge */}
          <div className="experience-tag">
            <Code2 size={18} />
            <div>
              <span className="tag-title">Full-Stack & Vision</span>
              <span className="tag-sub">ASMT Student</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SkillsCloud() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-header">
        <h2>Skills &amp; Technologies</h2>
        <p>Tools and frameworks I use to bring ideas to life.</p>
      </div>

      <div className="skills-cloud-container">
        {SKILLS.map((skill, index) => (
          <span key={index} className={`skill-chip skill-chip--${skill.category}`}>
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects-section" id="work">
      <div className="section-header">
        <h2>Selected Works</h2>
        <p>Real-world projects focused on usability and technical depth.</p>
      </div>

      <div className="projects-showcase">
        {PROJECTS.map((project, idx) => (
          <article key={idx} className="project-card-large">
            {/* Big Featured Cover Frame */}
            {project.image && (
              <div className="project-cover-frame-large">
                <img 
                  src={project.image} 
                  alt={`${project.title} cover`} 
                  className="project-cover-img-large" 
                />
                <div className="cover-overlay" />
              </div>
            )}

            {/* Content Details below/beside the huge image */}
            <div className="project-body-large">
              <div className="project-header-row">
                <div>
                  <span className="role-tag">{project.role}</span>
                  <h3 className="project-title-large">{project.title}</h3>
                  <p className="project-subtitle-large">{project.subtitle}</p>
                </div>
                
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-secondary project-btn"
                >
                  View Code <ArrowUpRight size={16} />
                </a>
              </div>

              <p className="project-desc-large">{project.description}</p>

              {/* Tech Stack Chips */}
              <div className="tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-heading">
          <h2>Let's build something remarkable together.</h2>
          <p>I'm currently looking for new opportunities and software engineering internships.</p>
        </div>
        <a href={`mailto:${CONTACT.email}`} className="btn-primary btn-large">
          <Mail size={18} /> Send an Email
        </a>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} {PROFILE.fullName}. Designed & Built with React.
        </div>
        <div className="social-links">
          <a href={`mailto:${CONTACT.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------------
   MAIN APPLICATION
---------------------------------------------------------------------- */
export default function App() {
  return (
    <div className="portfolio-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        /* --- DESIGN TOKENS (Navy Theme) --- */
        :root {
          --bg-dark: #0a0f1d;
          --bg-card: #12192c;
          --bg-card-hover: #19223a;
          --accent-cyan: #64dfdf;
          --accent-teal: #48cae4;
          --accent-glow: rgba(100, 223, 223, 0.15);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-subtle: rgba(255, 255, 255, 0.08);
          --border-glow: rgba(100, 223, 223, 0.3);
          --radius-lg: 20px;
          --radius-md: 12px;
          --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--bg-dark);
          color: var(--text-main);
          font-family: var(--font-sans);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .portfolio-wrapper {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* --- NAVBAR --- */
        .site-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.15rem;
        }
        .nav-logo .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-cyan);
          box-shadow: 0 0 10px var(--accent-cyan);
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-menu a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-menu a:hover {
          color: var(--text-main);
        }
        .nav-cta {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-glow);
          color: var(--accent-cyan) !important;
          background: var(--accent-glow);
        }

        /* --- HERO SECTION --- */
        .hero-section {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
          padding: 4rem 0 6rem;
        }
        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent-glow);
          border: 1px solid var(--border-glow);
          color: var(--accent-cyan);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
        }
        .hero-heading {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.25rem;
        }
        .highlight-text {
          color: var(--accent-cyan);
          position: relative;
        }
        .hero-description {
          color: var(--text-muted);
          font-size: 1.05rem;
          max-width: 500px;
          margin-bottom: 2rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        /* --- BUTTONS --- */
        .btn-primary, .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background: var(--accent-cyan);
          color: #060b13;
        }
        .btn-primary:hover {
          background: #52cece;
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
        }
        .btn-secondary:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-glow);
          transform: translateY(-2px);
        }
        .btn-large {
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        /* --- HERO PHOTO FRAME --- */
        .hero-media {
          display: flex;
          justify-content: center;
        }
        .photo-frame-wrapper {
          position: relative;
          width: 100%;
          max-width: 360px;
        }
        .photo-frame {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-glow);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          aspect-ratio: 4 / 5;
        }
        .user-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 15, 29, 0.8) 0%, transparent 50%);
        }
        .experience-tag {
          position: absolute;
          bottom: -20px;
          left: -20px;
          background: var(--bg-card);
          border: 1px solid var(--border-glow);
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        .experience-tag .tag-title {
          display: block;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-main);
        }
        .experience-tag .tag-sub {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* --- SECTION HEADERS --- */
        .section-header {
          margin-bottom: 3rem;
        }
        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .section-header p {
          color: var(--text-muted);
        }

        /* --- SKILLS SECTION --- */
        .skills-section {
          padding: 5rem 0;
          border-top: 1px solid var(--border-subtle);
        }
        .skills-cloud-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }
        .skill-chip {
          padding: 0.6rem 1.25rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 500;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          transition: all 0.2s ease;
        }
        .skill-chip:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          transform: translateY(-2px);
        }

        /* --- PROJECTS SECTION --- */
       /* --- PROJECT CARD IMAGE COVER STYLES --- */
/* --- PROJECTS SECTION & GRID --- */
/* --- LARGE PROJECT SHOWCASE --- */
.projects-section {
  padding: 5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.projects-showcase {
  display: flex;
  flex-direction: column;
  gap: 4rem; /* Generous vertical spacing between giant project cards */
}

/* Big Hero-style Project Card */
.project-card-large {
  background-color: #12192c;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.project-card-large:hover {
  transform: translateY(-6px);
  border-color: rgba(100, 223, 223, 0.4);
}

/* BIG SCREENSHOT FRAME (Expands image height significantly) */
.project-cover-frame-large {
  width: 100%;
  height: 480px; /* Big height for crisp visibility */
  position: relative;
  overflow: hidden;
  background: #080d1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
  .project-cover-frame-large {
    height: 280px; /* Responsive fallback for smaller screens */
  }
}

.project-cover-img-large {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fits image properly without stretching */
  object-position: top center; /* Focuses on the top of the interface preview */
  transition: transform 0.5s ease;
}

.project-card-large:hover .project-cover-img-large {
  transform: scale(1.02); /* Slight high-end zoom effect */
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(18, 25, 44, 0.8) 100%);
  pointer-events: none;
}

/* LARGE CARD CONTENT AREA */
.project-body-large {
  padding: 2.5rem;
}

.project-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.project-title-large {
  font-size: 2rem;
  font-weight: 800;
  color: #f8fafc;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.project-subtitle-large {
  color: #64dfdf;
  font-weight: 500;
  font-size: 1rem;
}

.project-desc-large {
  color: #94a3b8;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 850px;
  margin-bottom: 1.75rem;
}

/* TECH BADGES */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tech-badge {
  background: rgba(100, 223, 223, 0.08);
  border: 1px solid rgba(100, 223, 223, 0.2);
  color: #64dfdf;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
}

.project-btn {
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
  white-space: nowrap;
}



        /* --- RESPONSIVE ADJUSTMENTS --- */
        @media (max-width: 850px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .hero-description {
            margin: 0 auto 2rem;
          }
          .hero-actions {
            justify-content: center;
          }
          .experience-tag {
            left: 50%;
            transform: translateX(-50%);
          }
          .footer-top {
            flex-direction: column;
            text-align: center;
          }
          .footer-bottom {
            flex-direction: column-reverse;
            gap: 1.5rem;
          }
        }
      `}</style>

      <Navbar />
      <Hero />
      <SkillsCloud />
      <Projects />
      <Footer />
    </div>
  );
}