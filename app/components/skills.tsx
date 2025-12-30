"use client";

import { useEffect, useRef, useState } from "react";
import ToolMarquee from "./ToolMarquee";

const skillCards = [
  {
    title: "Programming",
    skills: ["Python", "C++", "Java", "JavaScript", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend and APIs",
    skills: ["FastAPI", "REST APIs", "WebSockets", "Authentication"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Supabase", "SQL Optimization"],
  },
  {
    title: "AI / Machine Learning",
    skills: ["Supervised Learning", "NLP", "Model Evaluation", "Generative AI"],
  },
  {
    title: "DevOps & CS Fundamentals",
    skills: ["Docker", "CI/CD", "DSA", "OOPs", "RDBMS", "Artificial Intelligence"],
  },
];

export default function Skills(): React.JSX.Element {
  const [visible, setVisible] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  /* Scroll reveal — aligned with Leadership */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));
          if (entry.isIntersecting) {
            setVisible((v) => [...new Set([...v, id])]);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionRef.current
      ?.querySelectorAll("[data-id]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 px-6">
      <div ref={sectionRef} className="container mx-auto max-w-6xl">

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
          Skills
        </h2>

        {/* Tools Marquee */}
        <ToolMarquee />

        {/* Skill Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCards.map((card, index) => (
            <div
              key={card.title}
              data-id={index}
              className={`
                relative
                rounded-2xl p-6
                bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950
                border border-white/10
                transition-all duration-500 ease-out
                hover:-translate-y-1 hover:scale-[1.015]
                hover:border-purple-400/30
                hover:shadow-xl hover:shadow-purple-900/25
                ${
                  visible.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {card.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {card.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      px-3 py-1 text-sm rounded-full
                      bg-white/10 text-white/80
                      border border-white/10
                      transition-colors duration-200
                      hover:bg-purple-400/20 hover:text-white
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
