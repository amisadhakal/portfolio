import React from 'react';

export default function App() {
  const projects = [
    {
      title: "Drape – Virtual Try-On System",
      role: "Lead Developer & Project Coordinator",
      tech: ["React (Vite)", "Flask", "MongoDB", "MediaPipe", "OpenCV", "Tailwind CSS"],
      description: "Planned and managed a full-stack virtual try-on application from concept to implementation. Integrated MediaPipe and OpenCV computer vision pipelines with a React frontend and Flask backend for dynamic body landmark detection and garment alignment.",
      github: "https://github.com/amisadhakal"
    },
    {
      title: "Healthcare Appointment Booking System",
      role: "Frontend Developer",
      tech: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "REST APIs"],
      description: "Developed a responsive healthcare booking client featuring reusable component architecture, mobile-first interface design, and streamlined REST API integration.",
      github: "https://github.com/amisadhakal"
    }
  ];

  const competencies = [
    "Project Planning & Coordination", "Task Prioritization", "Software Development Lifecycle (SDLC)", 
    "Requirement Analysis", "Project Documentation", "Time Management", "Risk Identification"
  ];

  const techSkills = [
    "React.js", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS", "Python (basic)", 
    "Git & GitHub", "Flask", "MongoDB", "Postman", "Jupyter Notebook"
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-12 md:py-20 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HERO SECTION */}
        <header className="mb-16 border-b border-slate-800 pb-12">
          <div className="inline-block bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-xs font-mono font-medium mb-4 border border-teal-500/20">
            Available for Project Management & Software Internships
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3">
            Amisa Dhakal
          </h1>
          <p className="text-xl sm:text-2xl text-teal-400 font-medium mb-4">
            Full-Stack Web & AI Application Developer
          </p>
          <p className="text-slate-400 max-w-2xl text-base leading-relaxed mb-8">
            Computer Science and Information Technology student at Asian School of Management and Technology. Passionate about software engineering, task prioritization, structured SDLC execution, and delivering high-quality web solutions through team collaboration.
          </p>
          
          {/* CONTACT BUTTONS */}
          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <a href="mailto:amisadhakal1@gmail.com" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-5 py-2.5 rounded-lg transition shadow-lg shadow-teal-500/10">
              ✉️ Email Me
            </a>
            <a href="https://github.com/amisadhakal" target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg border border-slate-700 transition">
              💻 GitHub
            </a>
            <a href="https://www.linkedin.com/in/amisa-dhakal-1192b42a0" target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg border border-slate-700 transition">
              🔗 LinkedIn
            </a>
          </div>
        </header>

        {/* FEATURED PROJECTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-teal-400 font-mono text-lg">01.</span> Featured Projects
          </h2>
          
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-slate-700 transition">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <span className="text-xs bg-teal-500/10 text-teal-300 px-3 py-1 rounded-full border border-teal-500/20 font-medium">
                    {project.role}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs bg-slate-900 text-slate-300 px-3 py-1 rounded-md font-mono border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
                <a href={project.github} target="_blank" rel="noreferrer" className="text-sm text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1 group">
                  View Repository <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS & COMPETENCIES */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-teal-400 font-mono text-sm">02.</span> Project Management
            </h2>
            <div className="flex flex-wrap gap-2">
              {competencies.map((skill, idx) => (
                <span key={idx} className="bg-slate-800/60 text-slate-300 border border-slate-700/60 px-3.5 py-1.5 rounded-lg text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-teal-400 font-mono text-sm">03.</span> Technical Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((tech, idx) => (
                <span key={idx} className="bg-slate-800/60 text-slate-300 border border-slate-700/60 px-3.5 py-1.5 rounded-lg text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-teal-400 font-mono text-lg">04.</span> Education
          </h2>
          <div className="bg-slate-800/30 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-wrap justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">B.Sc. in Computer Science and Information Technology</h3>
              <p className="text-slate-400 text-sm mt-1">Asian School of Management and Technology (ASMT)</p>
            </div>
            <span className="text-teal-400 text-xs font-mono bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              2023 – 2027
            </span>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-slate-500 text-xs border-t border-slate-800/80 pt-8">
          Designed & Developed by Amisa Dhakal • {new Date().getFullYear()}
        </footer>

      </div>
    </div>
  );
}