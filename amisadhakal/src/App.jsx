import React from "react";
import { Mail, Github, Linkedin, ExternalLink, ArrowUpRight } from "lucide-react";

/* ----------------------------------------------------------------------
   DATA — Updated with your personal info
---------------------------------------------------------------------- */

const CONTACT = {
  email: "amisadhakal1@gmail.com",
  github: "https://github.com/amisadhakal",
  linkedin: "https://www.linkedin.com/in/amisa-dhakal-1192b42a0",
};

const PROJECTS = [
  {
    title: "Drape",
    subtitle: "Virtual Try-On System",
    role: "Lead Developer & Coordinator",
    description:
      "A full-stack virtual try-on app. Uses MediaPipe and OpenCV for landmark detection and garment alignment, powered by React and Flask.",
    tech: ["React", "Flask", "MongoDB", "MediaPipe", "OpenCV"],
    codeUrl: CONTACT.github,
    liveUrl: null,
  },
  {
    title: "Care Path",
    subtitle: "Healthcare Booking System",
    role: "Frontend Developer",
    description:
      "Client app for healthcare appointment booking featuring reusable component architecture, mobile-first design, and REST integration.",
    tech: ["React.js", "JavaScript", "Tailwind CSS", "REST API"],
    codeUrl: CONTACT.github,
    liveUrl: null,
  },
];

const SKILLS_CLOUD = [
  "React.js", "JavaScript", "Flask", "Python", "MongoDB", 
  "Tailwind CSS", "HTML5/CSS3", "Git & GitHub", "MediaPipe", 
  "OpenCV", "REST APIs", "Postman", "SDLC"
];

const SERVICES = [
  {
    title: "Full-Stack Development",
    description: "Building responsive web applications end-to-end with React, Flask, and RESTful APIs."
  },
  {
    title: "Computer Vision Integration",
    description: "Incorporating landmark detection, image processing, and AI tools into interactive frontends."
  },
  {
    title: "Project Coordination & Planning",
    description: "Structuring requirement analysis, workflow tracking, risk assessment, and technical documentation."
  }
];

export default function App() {
  return (
    <div className="portfolio-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --bg-navy: #0b132b;
          --bg-navy-light: #1c2541;
          --bg-card: #151d36;
          --accent-mint: #64dfdf;
          --accent-cyan: #48cae4;
          --text-main: #ffffff;
          --text-muted: #8d99ae;
          --border-color: rgba(100, 223, 223, 0.15);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: var(--bg-navy);
          color: var(--text-main);
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* --- NAVBAR --- */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
        }
        .logo {
          font-weight: 700;
          font-size: 1.4rem;
          letter-spacing: -0.5px;
        }
        .logo span {
          color: var(--accent-mint);
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .nav-links a:hover {
          color: var(--text-main);
        }

        /* --- HERO SECTION --- */
        .hero {
          position: relative;
          padding: 6rem 0 8rem;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          gap: 2rem;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 1.5rem;
        }
        .hero-title .highlight {
          color: var(--accent-mint);
        }
        .hero-subtitle {
          color: var(--text-muted);
          font-size: 1.05rem;
          max-width: 480px;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        .btn-outline {
          display: inline-block;
          padding: 0.8rem 1.8rem;
          border: 1px solid var(--accent-mint);
          color: var(--accent-mint);
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: rgba(100, 223, 223, 0.1);
          transform: translateY(-2px);
        }

        /* Particle Visual Graphic */
        .particles-graphic {
          width: 100%;
          height: 320px;
          position: relative;
          background: radial-gradient(circle at center, rgba(100, 223, 223, 0.08) 0%, transparent 70%);
        }
        .particle-dots {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(var(--accent-mint) 1px, transparent 1px), radial-gradient(var(--accent-cyan) 1px, transparent 1px);
          background-size: 30px 30px;
          background-position: 0 0, 15px 15px;
          opacity: 0.4;
          border-radius: 50%;
        }

        /* --- SKILLS & TOOLS --- */
        .skills-section {
          padding: 6rem 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .section-title span {
          color: var(--accent-mint);
        }
        .skills-desc {
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 400px;
        }
        .word-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          align-items: center;
          justify-content: center;
        }
        .cloud-tag {
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.3s;
        }
        .cloud-tag:nth-child(3n) { font-size: 1.4rem; color: #fff; }
        .cloud-tag:nth-child(2n) { font-size: 1.1rem; color: var(--accent-cyan); }
        .cloud-tag:nth-child(5n) { font-size: 1.6rem; color: var(--accent-mint); font-weight: 700; }
        .cloud-tag:hover { color: var(--accent-mint); cursor: pointer; }

        /* --- SERVICES / FEATURED --- */
        .feature-section {
          padding: 6rem 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .mockup-container {
          background: var(--bg-navy-light);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          position: relative;
        }
        .mockup-screen {
          background: #050a18;
          border-radius: 8px;
          height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .services-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .service-item h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .service-item p {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* --- PROJECTS SECTION --- */
        .projects-section {
          padding: 6rem 0;
          background: var(--bg-navy-light);
          border-radius: 24px;
          margin: 4rem 0;
        }
        .projects-inner {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 3rem;
          align-items: flex-start;
        }
        .proj-callout {
          position: sticky;
          top: 4rem;
        }
        .proj-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-4px);
        }
        .project-card h4 {
          font-size: 1.4rem;
          margin-bottom: 0.3rem;
        }
        .project-card .subtitle {
          color: var(--accent-mint);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .project-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .tech-tag {
          background: rgba(100, 223, 223, 0.08);
          color: var(--accent-mint);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.78rem;
        }
        .card-links {
          display: flex;
          gap: 1.2rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--accent-cyan);
        }

        /* --- FOOTER CTA --- */
        .footer-cta {
          padding: 8rem 0 6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
        }
        .footer-cta h2 {
          font-size: 2.8rem;
          max-width: 450px;
          line-height: 1.2;
        }
        .social-icons {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .social-icons a {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .social-icons a:hover {
          color: var(--accent-mint);
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 900px) {
          .hero, .skills-section, .feature-section, .projects-inner, .footer-cta {
            grid-template-columns: 1fr;
            flex-direction: column;
            gap: 3rem;
          }
          .proj-callout {
            position: static;
          }
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <div className="container">
        {/* HEADER / NAV */}
        <nav className="navbar">
          <div className="logo">Amisa<span>.</span></div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* HERO */}
        <header className="hero" id="about">
          <div>
            <h1 className="hero-title">
              Hello,<br />
              I am <span className="highlight">Amisa</span>,<br />
              Full-Stack Developer
            </h1>
            <p className="hero-subtitle">
              Computer Science student building end-to-end digital experiences with a focus on web apps and computer vision.
            </p>
            <a href={`mailto:${CONTACT.email}`} className="btn-outline">Let's get in touch!</a>
          </div>
          <div className="particles-graphic">
            <div className="particle-dots"></div>
          </div>
        </header>

        {/* SKILLS & TOOLS */}
        <section className="skills-section">
          <div>
            <h2 className="section-title"><span>Skills</span> and tools</h2>
            <p className="skills-desc">
              Focusing on creating responsive, scalable interfaces and connecting them with modern backend API architectures.
            </p>
          </div>
          <div className="word-cloud">
            {SKILLS_CLOUD.map((skill, i) => (
              <span key={i} className="cloud-tag">{skill}</span>
            ))}
          </div>
        </section>

        {/* SERVICES / CAPABILITIES */}
        <section className="feature-section">
          <div className="mockup-container">
            <div className="mockup-screen">
              <span style={{ color: "var(--accent-mint)", fontSize: "0.9rem" }}>Computer Vision & Web Apps</span>
            </div>
          </div>
          <div className="services-list">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="service-item">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section className="projects-section" id="projects">
          <div className="container">
            <div className="projects-inner">
              <div className="proj-callout">
                <h2 className="section-title">Take a look at what I've created</h2>
                <p className="skills-desc" style={{ marginBottom: "2rem" }}>
                  A selection of projects built end-to-end using modern frontend & backend technologies.
                </p>
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className="btn-outline">
                  View GitHub
                </a>
              </div>
              <div className="proj-grid">
                {PROJECTS.map((proj, idx) => (
                  <div key={idx} className="project-card">
                    <h4>{proj.title}</h4>
                    <div className="subtitle">{proj.subtitle} — {proj.role}</div>
                    <p>{proj.description}</p>
                    <div className="tech-tags">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <div className="card-links">
                      <a href={proj.codeUrl} target="_blank" rel="noreferrer">Code <ArrowUpRight size={14} /></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <footer className="footer-cta" id="contact">
          <div>
            <h2>Let's talk about your project</h2>
            <div className="social-icons">
              <a href={`mailto:${CONTACT.email}`}><Mail size={20} /></a>
              <a href={CONTACT.github} target="_blank" rel="noreferrer"><Github size={20} /></a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
            </div>
          </div>
          <div>
            <a href={`mailto:${CONTACT.email}`} className="btn-outline">Contact me</a>
          </div>
        </footer>
      </div>
    </div>
  );
}