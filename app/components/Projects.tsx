"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github?: string;
  live?: string;
  tech: string[];
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Interactive Pathfinding Algorithm Visualizer",
    description:
      "An interactive tool to visualize Dijkstra’s algorithm step by step, helping learners build intuition around graph traversal, priority queues, and shortest-path computation.",
    github: "https://github.com/Manyaxkapoor/Dijkstra_visualiser",
    live: "https://dijkstravisualiser.vercel.app/",
    image: "/Projects/project-1.png",
    tech: ["React", "TypeScript", "Graph Algorithms", "Dijkstra"],
  },
  {
    id: 2,
  title: "FAQ Support Chatbot — AI Customer Support System",
  description:
    "An AI-powered FAQ chatbot designed for reliable, hallucination-free customer support. Built with Streamlit and Groq’s LLaMA 3.1, the system delivers deterministic answers strictly from a structured knowledge base.",
  tech: ["Python", "Streamlit", "Groq API", "LLaMA 3.1"],
  live: "https://webchatpy.streamlit.app/",
  github: "https://github.com/manyaxkapoor/chatbot",
  image: "/Projects/project-2.png",
},  

{
    id: 3,
    title: "DevConnect — Full-Stack Portfolio Platform",
    description:
      "A responsive developer portfolio platform built using React, Tailwind CSS, and Supabase, featuring authentication, project management, and cloud storage integration.",
      tech: ["React", "Tailwind CSS", "Supabase", "PostgreSQL", "Figma"],
    live: "https://devconnect456.vercel.app",
    github: "https://github.com/Manyaxkapoor/devconnect",
    image: "/projects/project-3.png",
},

  {
    id: 4,
    title: "TRUView AI – Ethical & Explainable AI Platform",
    description:
      "An AI governance platform enabling auditable, regulation-ready workflows with consent management, explainability middleware, and immutable audit trails.",
    github: "https://github.com/Manyaxkapoor/TRUView-AI",
    image: "/projects/project-.png",
    tech: ["AI Governance", "SHAP", "FastAPI", "RBAC", "Audit Trails"],
  },
  
// {
//     id: 5,
//     title: "HireLens – Explainable Resume Screening Platform",
//     description:
//       "A full-stack resume screening platform focused on transparency in AI-driven hiring, featuring secure authentication, explainable decisions, and structured profile management.",
//     github: "https://github.com/Manyaxkapoor/HireLens",
//     image: "/projects/project-2.png",
//     tech: ["React", "Node.js", "PostgreSQL", "Explainable AI", "RBAC"],
//   },

];

export default function Projects(): React.JSX.Element {
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));
          if (entry.isIntersecting) {
            setVisibleIds((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: isMobile ? 0.15 : 0.3 }
    );

    const elements = sectionRef.current?.querySelectorAll("[data-id]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 px-6">
      <div ref={sectionRef} className="container mx-auto max-w-7xl">
        {featuredProjects.map((project, index) => {
          const isEven = index % 2 === 1;
          const isVisible = visibleIds.includes(project.id);

          return (
            <div
              key={project.id}
              data-id={project.id}
              className={`mb-24 last:mb-0 transition-all duration-700
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isEven ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text */}
                <div className={`${isEven ? "lg:col-start-2" : ""}`}>
                  <p className="text-purple-400 text-lg font-medium mb-2">
                    Featured Project
                  </p>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {project.title}
                  </h3>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="relative z-10 mb-6">
                    <div
                      className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10 shadow-lg ${
                        isEven
                          ? "lg:ml-[-20%]"
                          : "lg:w-[calc(100%+20%)]"
                      }`}
                    >
                      <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition"
                      >
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-white"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className={`${isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 p-2 lg:p-3 shadow-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={project.id === 1} // LCP optimization
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                      placeholder="blur"
                      blurDataURL="/placeholder.png"
                      className="object-cover rounded-lg"
                    />
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
