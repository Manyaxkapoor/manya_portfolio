"use client";

import { useEffect, useRef, useState } from "react";

interface LeadershipItem {
  id: number;
  title: string;
  description: string;
  highlight?: string;
  icon: "trophy" | "users" | "mic";
}

const leadership: LeadershipItem[] = [
  {
    id: 1,
    title: "American Express Product Track Challenge",
    highlight: "Top 38 Nationally",
    icon: "trophy",
    description:
      "Ranked among the top 38 teams nationally out of 3,000+ participants and emerged as the Top 1 campus finalist, demonstrating strong product thinking and analytical problem-solving.",
  },
  {
    id: 2,
    title: "Departmental Representative Committee — Member",
    icon: "users",
    description:
      "Represented 200+ students by formalizing structured feedback pipelines, accelerating departmental issue resolution cycles by 30%.",
  },
  {
    id: 3,
    title: "HACKMOL 6.0 — Organizer & Lead",
    icon: "mic",
    description:
      "Led a college-wide hackathon with 400+ participants and 20+ volunteers, ensuring smooth execution, logistics coordination, and cross-team collaboration.",
  },
  {
    id: 4,
    title: "UI/UX Workshops & Community Sessions",
    icon: "mic",
    description:
      "Delivered UI/UX workshops for 200+ students with 90% positive feedback, focusing on practical design workflows and usability principles.",
  },
];

const Icon = ({ type }: { type: LeadershipItem["icon"] }) => {
  if (type === "trophy") return <span className="text-purple-400">🏆</span>;
  if (type === "users") return <span className="text-purple-400">👥</span>;
  return <span className="text-purple-400">🎤</span>;
};

export default function Leadership(): React.JSX.Element {
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

    const cards = sectionRef.current?.querySelectorAll("[data-id]");
    cards?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="leadership" className="py-20 px-6">
      <div ref={sectionRef} className="container mx-auto max-w-6xl">

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-10">
          Leadership & Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadership.map((item, index) => {
            const isVisible = visibleIds.includes(item.id);
            const tilt =
              index % 2 === 0
                ? "hover:rotate-[0.6deg]"
                : "hover:-rotate-[0.6deg]";

            return (
              <div
                key={item.id}
                data-id={item.id}
                className={`
                  bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950
                  border border-white/10 rounded-2xl p-6
                  transition-all duration-500 ease-out
                  ${tilt} hover:-translate-y-2
                  hover:shadow-2xl hover:shadow-purple-900/30
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                `}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon type={item.icon} />
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>

                  {item.highlight && (
                    <span className="shrink-0 px-3 py-1 text-xs font-semibold rounded-full
                      bg-purple-500/15 text-purple-300 border border-purple-400/30">
                      {item.highlight}
                    </span>
                  )}
                </div>

                <p className="text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
