import React, { useEffect, useMemo, useRef } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

/* ----------------------------------------------------------------------
   DATA — edit this section with your real details / links
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
    role: "Lead Developer & Project Coordinator",
    description:
      "Planned and built a full-stack virtual try-on app from concept to shipped product. MediaPipe and OpenCV handle body-landmark detection and garment alignment, with a React front end and a Flask API behind it.",
    tech: ["React (Vite)", "Flask", "MongoDB", "MediaPipe", "OpenCV", "Tailwind CSS"],
    codeUrl: CONTACT.github,
    liveUrl: null, // add your deployed URL here, e.g. "https://drape-app.vercel.app"
  },
  {
    title: "Care Path",
    subtitle: "Healthcare Appointment Booking System",
    role: "Frontend Developer",
    description:
      "Built the client for a healthcare booking product — a reusable component architecture, mobile-first layouts, and REST API integration end to end.",
    tech: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "REST APIs"],
    codeUrl: CONTACT.github,
    liveUrl: null,
  },
];

const PROCESS_SKILLS = [
  "Project Planning & Coordination",
  "Task Prioritization",
  "Software Development Lifecycle",
  "Requirement Analysis",
  "Project Documentation",
  "Time Management",
  "Risk Identification",
];

const TECH_SKILLS = [
  "React.js",
  "JavaScript (ES6+)",
  "HTML5 / CSS3",
  "Tailwind CSS",
  "Python",
  "Git & GitHub",
  "Flask",
  "MongoDB",
  "Postman",
  "Jupyter Notebook",
];

const EDUCATION = {
  degree: "B.Sc. in Computer Science and Information Technology",
  school: "Asian School of Management and Technology (ASMT)",
  years: "2023 – 2027",
};

/* ----------------------------------------------------------------------
   LANDMARK MESH — a self-portrait built the way Drape "sees" a body:
   points + connections, drifting gently, tilting toward the cursor.
---------------------------------------------------------------------- */

const VIEW_W = 260;
const VIEW_H = 320;

// Rough bust silhouette (head, neck, shoulders), clockwise.
const SILHOUETTE = [
  [130, 30], [150, 33], [166, 42], [176, 58], [180, 78], [176, 98],
  [166, 114], [156, 122], [170, 132], [206, 152], [234, 190], [246, 236],
  [248, 300], [12, 300], [14, 236], [26, 190], [54, 152], [90, 132],
  [104, 122], [94, 114], [84, 98], [80, 78], [84, 58], [94, 42], [110, 33],
];

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersects =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function buildMesh(seedKeyIndices = [0, 3, 12, 13, 17, 20]) {
  const nodes = [];

  // Outline points anchor the shape.
  SILHOUETTE.forEach(([x, y]) => {
    nodes.push({ baseX: x, baseY: y });
  });

  // Scatter interior points via rejection sampling.
  let attempts = 0;
  while (nodes.length < SILHOUETTE.length + 42 && attempts < 4000) {
    attempts++;
    const x = 10 + Math.random() * (VIEW_W - 20);
    const y = 34 + Math.random() * (VIEW_H - 44);
    if (pointInPolygon(x, y, SILHOUETTE)) {
      nodes.push({ baseX: x, baseY: y });
    }
  }

  nodes.forEach((n, i) => {
    n.phaseX = Math.random() * Math.PI * 2;
    n.phaseY = Math.random() * Math.PI * 2;
    n.amp = 1.4 + Math.random() * 2.2;
    n.speed = 0.35 + Math.random() * 0.4;
    n.isKey = seedKeyIndices.includes(i);
  });

  // Connect each node to its nearest few neighbors.
  const edgeSet = new Map();
  const maxDist = 34;
  nodes.forEach((a, i) => {
    const dists = [];
    nodes.forEach((b, j) => {
      if (i === j) return;
      const d = Math.hypot(a.baseX - b.baseX, a.baseY - b.baseY);
      if (d < maxDist) dists.push([d, j]);
    });
    dists.sort((p, q) => p[0] - q[0]);
    dists.slice(0, 2).forEach(([, j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) edgeSet.set(key, [i, j]);
    });
  });

  return { nodes, edges: Array.from(edgeSet.values()) };
}

function LandmarkMesh() {
  const { nodes, edges } = useMemo(() => buildMesh(), []);
  const circleRefs = useRef([]);
  const lineRefs = useRef([]);
  const tiltRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let t = 0;

    const paint = () => {
      nodes.forEach((n, i) => {
        const x = n.baseX + Math.sin(t * n.speed + n.phaseX) * n.amp;
        const y = n.baseY + Math.cos(t * n.speed + n.phaseY) * n.amp;
        n._x = x;
        n._y = y;
        const c = circleRefs.current[i];
        if (c) {
          c.setAttribute("cx", x.toFixed(2));
          c.setAttribute("cy", y.toFixed(2));
        }
      });
      edges.forEach(([a, b], i) => {
        const l = lineRefs.current[i];
        if (l) {
          l.setAttribute("x1", nodes[a]._x.toFixed(2));
          l.setAttribute("y1", nodes[a]._y.toFixed(2));
          l.setAttribute("x2", nodes[b]._x.toFixed(2));
          l.setAttribute("y2", nodes[b]._y.toFixed(2));
        }
      });
    };

    paint();
    if (!reduced) {
      const loop = () => {
        t += 0.016;
        paint();
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [nodes, edges]);

  const handleMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  };
  const handleLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className="mesh-outer">
      <div
        ref={tiltRef}
        className="mesh-tilt"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="mesh-svg" aria-hidden="true">
          {edges.map((_, i) => (
            <line
              key={`e-${i}`}
              ref={(el) => (lineRefs.current[i] = el)}
              className="mesh-line"
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={`n-${i}`}
              ref={(el) => (circleRefs.current[i] = el)}
              r={n.isKey ? 3.1 : 1.5}
              className={n.isKey ? "mesh-node mesh-node--key" : "mesh-node"}
            />
          ))}
        </svg>
      </div>
      <p className="mesh-caption">Landmark mesh — the point-tracking behind Drape, drawn as a self-portrait</p>
    </div>
  );
}

/* ----------------------------------------------------------------------
   SCROLL REVEAL
---------------------------------------------------------------------- */

function useReveal() {
  const rootRef = useRef(null);
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return rootRef;
}

/* ----------------------------------------------------------------------
   TILT CARD (project cards)
---------------------------------------------------------------------- */

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-2px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------------
   MAIN APP
---------------------------------------------------------------------- */

export default function App() {
  const rootRef = useReveal();

  return (
    <div ref={rootRef} className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --ink: #0e0b16;
          --surface: #17131f;
          --surface-2: #1e1828;
          --text: #f3efea;
          --muted: #948c9e;
          --pink: #ff3e7f;
          --mint: #7cffcb;
          --line: rgba(243,239,234,0.09);
        }

        .page {
          background: radial-gradient(ellipse 80% 60% at 15% -10%, rgba(255,62,127,0.10), transparent),
                      radial-gradient(ellipse 70% 50% at 100% 0%, rgba(124,255,203,0.06), transparent),
                      var(--ink);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .display { font-family: 'Fraunces', serif; }
        .mono { font-family: 'Space Mono', monospace; letter-spacing: 0.04em; }

        .eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .eyebrow::before { content: '— '; color: var(--pink); }

        .container { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; }

        /* NAV */
        .nav {
          position: sticky; top: 0; z-index: 40;
          backdrop-filter: blur(10px);
          background: rgba(14,11,22,0.65);
          border-bottom: 1px solid var(--line);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; max-width: 1080px; margin: 0 auto; }
        .nav-mark { font-family: 'Fraunces', serif; font-style: italic; font-size: 1.15rem; }
        .nav-links { display: flex; gap: 1.5rem; }
        .nav-links a { color: var(--muted); font-size: 0.85rem; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding: 3.5rem 0 4.5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .hero { grid-template-columns: 1.15fr 0.85fr; padding: 5rem 0 6rem; }
        }

        .status-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          border: 1px solid rgba(255,62,127,0.35);
          background: rgba(255,62,127,0.08);
          color: var(--pink);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--pink); box-shadow: 0 0 8px var(--pink); }

        .hero h1 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(2.6rem, 6vw, 4.6rem);
          line-height: 0.98;
          letter-spacing: -0.01em;
          margin-bottom: 0.75rem;
        }
        .hero h1 em { color: var(--mint); font-style: italic; }

        .hero-role {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-size: 1.25rem;
          color: var(--pink);
          margin-bottom: 1.1rem;
        }
        .hero-bio { color: var(--muted); font-size: 1rem; line-height: 1.7; max-width: 34rem; margin-bottom: 2rem; }

        .cta-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.7rem 1.15rem;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 500;
          transition: transform 0.15s ease, background 0.2s, border-color 0.2s;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary { background: var(--pink); color: #16040c; }
        .btn-primary:hover { background: #ff5c94; }
        .btn-ghost { border: 1px solid var(--line); color: var(--text); background: var(--surface); }
        .btn-ghost:hover { border-color: rgba(124,255,203,0.4); }

        /* MESH */
        .mesh-outer { display: flex; flex-direction: column; align-items: center; }
        .mesh-tilt { width: 100%; max-width: 300px; transition: transform 0.15s ease-out; }
        .mesh-svg { width: 100%; height: auto; display: block; }
        .mesh-node { fill: var(--mint); opacity: 0.85; }
        .mesh-node--key { fill: var(--pink); filter: drop-shadow(0 0 4px rgba(255,62,127,0.7)); }
        .mesh-line { stroke: rgba(124,255,203,0.28); stroke-width: 0.6; }
        .mesh-caption { margin-top: 1rem; color: var(--muted); font-family: 'Space Mono', monospace; font-size: 0.72rem; text-align: center; max-width: 22rem; line-height: 1.5; }

        /* SECTIONS */
        section.block { padding: 4rem 0; border-top: 1px solid var(--line); }
        .section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 2.25rem; flex-wrap: wrap; gap: 0.5rem; }
        .section-title { font-family: 'Fraunces', serif; font-size: 1.9rem; font-weight: 600; }

        /* PROJECT CARDS */
        .projects-grid { display: grid; gap: 1.5rem; }
        .tilt-card {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 2rem;
          transition: transform 0.1s ease-out, border-color 0.2s;
          will-change: transform;
        }
        .tilt-card:hover { border-color: rgba(255,62,127,0.3); }
        .proj-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.35rem; }
        .proj-title { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 600; }
        .proj-subtitle { color: var(--muted); font-size: 0.85rem; margin-bottom: 1rem; }
        .proj-role { font-family: 'Space Mono', monospace; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--mint); border: 1px solid rgba(124,255,203,0.3); padding: 0.3rem 0.65rem; border-radius: 999px; white-space: nowrap; }
        .proj-desc { color: var(--muted); font-size: 0.92rem; line-height: 1.65; margin-bottom: 1.4rem; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
        .tag { font-family: 'Space Mono', monospace; font-size: 0.72rem; background: var(--surface-2); border: 1px solid var(--line); color: var(--text); padding: 0.3rem 0.6rem; border-radius: 6px; }
        .proj-links { display: flex; gap: 1.25rem; }
        .proj-links a { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.85rem; color: var(--mint); font-weight: 500; }
        .proj-links a:hover { color: var(--pink); }

        /* CAPABILITIES */
        .cap-grid { display: grid; gap: 2.5rem; }
        @media (min-width: 800px) { .cap-grid { grid-template-columns: 1fr 1fr; } }
        .cap-label { font-family: 'Space Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 1rem; }
        .chip-row { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .chip { padding: 0.5rem 0.9rem; border-radius: 999px; font-size: 0.85rem; }
        .chip--process { border: 1px solid rgba(255,62,127,0.3); color: var(--text); background: rgba(255,62,127,0.05); }
        .chip--tech { background: var(--surface-2); border: 1px solid var(--line); color: var(--mint); font-family: 'Space Mono', monospace; font-size: 0.78rem; }

        /* EDUCATION */
        .edu-card { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 2rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; flex-wrap: wrap; }
        .edu-degree { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.4rem; }
        .edu-school { color: var(--muted); font-size: 0.9rem; }
        .edu-years { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--pink); border: 1px solid rgba(255,62,127,0.3); padding: 0.35rem 0.8rem; border-radius: 999px; white-space: nowrap; }

        /* FOOTER */
        footer { border-top: 1px solid var(--line); padding: 3rem 0 2.5rem; text-align: center; }
        footer .foot-title { font-family: 'Fraunces', serif; font-style: italic; font-size: 1.4rem; margin-bottom: 0.75rem; }
        footer .foot-links { display: flex; justify-content: center; gap: 1.5rem; margin: 1.25rem 0; }
        footer .foot-links a { color: var(--muted); }
        footer .foot-links a:hover { color: var(--mint); }
        footer .foot-note { color: var(--muted); font-size: 0.75rem; font-family: 'Space Mono', monospace; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .reveal { transition: none; opacity: 1; transform: none; }
          .tilt-card, .mesh-tilt { transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-mark">Amisa Dhakal</span>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#education">Education</a>
            <a href={`mailto:${CONTACT.email}`}>Contact</a>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* HERO */}
        <header className="hero">
          <div>
            <div className="status-pill">
              <span className="status-dot" />
              Open to Project Management &amp; Software Internships
            </div>
            <h1>
              Amisa <em>Dhakal</em>
            </h1>
            <p className="hero-role">Full-stack developer, working into computer vision</p>
            <p className="hero-bio">
              Computer Science and IT student at Asian School of Management and Technology,
              building products end to end — from requirement docs to deployed code — with a
              growing focus on interfaces powered by computer vision.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href={`mailto:${CONTACT.email}`}>
                <Mail size={16} /> Email me
              </a>
              <a className="btn btn-ghost" href={CONTACT.github} target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub
              </a>
              <a className="btn btn-ghost" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
          <LandmarkMesh />
        </header>

        {/* PROJECTS */}
        <section id="work" className="block reveal">
          <div className="section-head">
            <h2 className="section-title">Selected work</h2>
            <span className="eyebrow">Shipped &amp; in progress</span>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <TiltCard key={p.title}>
                <div className="proj-top">
                  <div>
                    <div className="proj-title">{p.title}</div>
                    <div className="proj-subtitle">{p.subtitle}</div>
                  </div>
                  <span className="proj-role">{p.role}</span>
                </div>
                <p className="proj-desc">{p.description}</p>
                <div className="tag-row">
                  {p.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="proj-links">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer">
                      Live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                  <a href={p.codeUrl} target="_blank" rel="noreferrer">
                    Code <ArrowUpRight size={14} />
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="block reveal">
          <div className="section-head">
            <h2 className="section-title">Capabilities</h2>
          </div>
          <div className="cap-grid">
            <div>
              <div className="cap-label">Process &amp; coordination</div>
              <div className="chip-row">
                {PROCESS_SKILLS.map((s) => (
                  <span key={s} className="chip chip--process">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="cap-label">Technical stack</div>
              <div className="chip-row">
                {TECH_SKILLS.map((s) => (
                  <span key={s} className="chip chip--tech">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="block reveal">
          <div className="section-head">
            <h2 className="section-title">Education</h2>
          </div>
          <div className="edu-card">
            <div>
              <div className="edu-degree">{EDUCATION.degree}</div>
              <div className="edu-school">{EDUCATION.school}</div>
            </div>
            <span className="edu-years">{EDUCATION.years}</span>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="foot-title">Let's build something.</div>
        <div className="foot-links">
          <a href={`mailto:${CONTACT.email}`}><Mail size={18} /></a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer"><Github size={18} /></a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
        </div>
        <div className="foot-note">Designed &amp; developed by Amisa Dhakal · {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}