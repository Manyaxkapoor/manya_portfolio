"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  github?: string;
  live?: string;
  tech: string[];
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Interactive Pathfinding Algorithm Visualizer",
    description:
      "An interactive tool to visualize Dijkstra's algorithm step by step, helping learners build intuition around graph traversal, priority queues, and shortest-path computation.",
    github: "https://github.com/Manyaxkapoor/Dijkstra_visualiser",
    live: "https://dijkstravisualiser.vercel.app/",
    image: "/Projects/project-1.png",
     imagePosition: "0% 50%",
    tech: ["React", "TypeScript", "Graph Algorithms", "Dijkstra"],
  },
  {
    id: 2,
    title: "FAQ Support Chatbot — AI Customer Support System",
    description:
      "An AI-powered FAQ chatbot designed for reliable, hallucination-free customer support. Built with Streamlit and Groq's LLaMA 3.1, the system delivers deterministic answers strictly from a structured knowledge base.",
    tech: ["Python", "Streamlit", "Groq API", "LLaMA 3.1"],
    live: "https://webchatpy.streamlit.app/",
    github: "https://github.com/manyaxkapoor/chatbot",
    image: "/Projects/project-2.png",
     imagePosition: "50% 50%",
  },
  {
    id: 3,
    title: "DevConnect — Full-Stack Portfolio Platform",
    description:
      "A responsive developer portfolio platform built using React, Tailwind CSS, and Supabase, featuring authentication, project management, and cloud storage integration.",
    tech: ["React", "Tailwind CSS", "Supabase", "PostgreSQL", "Figma"],
    live: "https://devconnect456.vercel.app",
    github: "https://github.com/Manyaxkapoor/devconnect",
    image: "/Projects/project-3.png",
     imagePosition: "15% 60%",
  },
  {
    id: 4,
    title: "TRUView AI – Ethical & Explainable AI Platform",
    description:
      "An AI governance platform enabling auditable, regulation-ready workflows with consent management, explainability middleware, and immutable audit trails.",
    github: "https://github.com/Manyaxkapoor/TRUView-AI",
    image: "/Projects/project-4.png",
    tech: ["AI Governance", "SHAP", "FastAPI", "RBAC", "Audit Trails"],
     imagePosition: "5% 5%",
  },

  // {
//     id: 5,
//     title: "HireLens – Explainable Resume Screening Platform",
//     description:
//       "A full-stack resume screening platform focused on transparency in AI-driven hiring, featuring secure authentication, explainable decisions, and structured profile management.",
//     github: "https://github.com/Manyaxkapoor/HireLens",
//     image: "/projects/project-2.png",
//     imagePosition: "15% 65%",
//     tech: ["React", "Node.js", "PostgreSQL", "Explainable AI", "RBAC"],
//   },

];

export default function Projects() {
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const glowRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));
          if (entry.isIntersecting) {
            setVisibleIds((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRef.current
      ?.querySelectorAll("[data-id]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* Cursor glow sync */
  const handleMouseMove = (e: React.MouseEvent, projectId: number) => {
    if (!isDesktop || !glowRefs.current[projectId]) return;
    const rect = glowRefs.current[projectId]!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRefs.current[projectId]!.style.setProperty("--x", `${x}px`);
    glowRefs.current[projectId]!.style.setProperty("--y", `${y}px`);
  };

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <div ref={sectionRef} className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16">

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">Projects</span>
          </h2>
         
        </div>

        {featuredProjects.map((project, index) => {
          const isEven = index % 2 === 1;
          const isVisible = visibleIds.includes(project.id);
          const isHovered = hoveredId === project.id;

          return (
            <div
              key={project.id}
              data-id={project.id}
              className={`mb-32 transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isEven ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* ================= TEXT SECTION ================= */}
                <div
                  className={`${isEven ? "lg:col-start-2" : ""} space-y-6`}
                  onMouseMove={(e) => handleMouseMove(e, project.id)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-violet-400" />
                      <p className="text-purple-400 font-semibold text-sm uppercase tracking-widest">
                        Featured Project #{project.id}
                      </p>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold leading-tight
                      bg-gradient-to-r from-white via-white to-white/80
                      bg-clip-text text-transparent
                      group-hover:from-violet-400 group-hover:via-purple-400 group-hover:to-violet-400
                      transition-all duration-500">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description Card with Glow */}
                  <div
                    ref={(el) => {
  glowRefs.current[project.id] = el;
}}
                    className={`relative rounded-2xl p-6 lg:p-8
                    bg-gradient-to-br from-white/5 to-white/[0.02]
                    border border-white/10 backdrop-blur-sm
                    shadow-2xl shadow-purple-900/20
                    overflow-hidden
                    transition-all duration-500
                    ${isHovered ? "border-purple-400/30 shadow-purple-900/40" : ""}`}
                  >
                    {/* Cursor Glow Effect */}
                    {isDesktop && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                        style={{
                          background: "radial-gradient(300px circle at var(--x) var(--y), rgba(168, 85, 247, 0.15), transparent 70%)",
                          opacity: isHovered ? 1 : 0,
                        }}
                      />
                    )}

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-500/20 to-transparent rounded-br-2xl" />

                    <p className="relative z-10 text-white/90 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-2 text-sm font-medium rounded-lg
                        bg-white/5 border border-white/10 text-white/90
                        hover:bg-purple-500/20 hover:border-purple-400/30
                        transition-all duration-300 cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-6 py-3 rounded-lg
                        border-2 border-white/20 text-white font-medium
                        hover:border-purple-400/50 hover:bg-purple-500/10
                        transition-all duration-300
                        flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group px-6 py-3 rounded-lg
                        bg-gradient-to-r from-purple-600 to-violet-600
                        hover:from-purple-500 hover:to-violet-500
                        text-white font-medium
                        shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50
                        transition-all duration-300
                        flex items-center gap-2 hover:scale-105"
                      >
                        Live Demo
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* ================= IMAGE SECTION ================= */}
<div className={`${isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
  <div
    className="relative group"
    onMouseMove={(e) => {
      const card = e.currentTarget.querySelector(
        ".image-tilt"
      ) as HTMLDivElement | null;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 8; // left-right
      const rotateX = ((y / rect.height) - 0.5) * -8; // up-down

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-6px)
      `;
    }}
    onMouseLeave={(e) => {
      const card = e.currentTarget.querySelector(
        ".image-tilt"
      ) as HTMLDivElement | null;
      if (!card) return;

      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    }}
  >
    {/* Glow Background  */}
    <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Image Container */}
    <div
      className="
        image-tilt
        relative w-full aspect-[4/3]
        rounded-2xl overflow-hidden
        bg-gradient-to-br from-slate-900 to-slate-950
        shadow-2xl border border-white/10
        transition-transform duration-300
        will-change-transform
      "
    >
      {/* Overlay Effects (unchanged) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5" />
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/5 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/5 to-transparent" />
        <div className="absolute inset-0 border border-white/10 rounded-2xl" />
      </div>

      {/* Image — FITS as per the changes */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover "
        style={{ objectPosition: project.imagePosition ?? "50% 50%" }}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  </div>
</div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}