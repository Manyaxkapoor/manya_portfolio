import Image from "next/image";

interface ExperienceCard {
  id: number;
  title: string;
  dateRange: string;
  bullets: string[];
  icon: string;
}

const experienceCards: ExperienceCard[] = [
  {
    id: 1,
    title: "Google Developer Student Clubs (GDSC) | Women of Tech & UI/UX Team",
    dateRange: "2024 – Present",
    bullets: [
      "Led UI/UX wireframing and user-flow design for mobile-first applications, improving navigation clarity and usability.",
      "Planned and executed technical workshops for 50+ participants, coordinating design and development teams.",
    ],
    icon: "/cards/card-1.png",
  },
  {
    id: 2,
    title: "Aton Informatics Pvt. Ltd. | Web Development Trainee",
    dateRange: "June 2025 – July 2025",
    bullets: [
      "Developed reusable React components and improved frontend maintainability.",
      "Optimized backend APIs and collaborated in Agile sprint cycles.",
    ],
    icon: "/cards/card-2.png",
  },
];

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Section Heading (aligned like About) */}
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Work Experience
        </h2>

        {/* Timeline Wrapper */}
        <div className="relative mt-6">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/20" />

          <div className="flex flex-col gap-12">
            {experienceCards.map((card) => (
              <div key={card.id} className="relative pl-14">
                
                {/* Timeline dot */}
                <span className="absolute left-[10px] top-3 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />

                {/* Experience Card */}
                <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 rounded-xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-purple-900 transition">
                  <div className="flex gap-6">
                    
                    {/* Icon */}
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={72}
                      height={72}
                      className="object-contain"
                    />

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h3 className="text-xl font-semibold text-white">
                          {card.title}
                        </h3>
                        <span className="text-sm text-purple-400">
                          {card.dateRange}
                        </span>
                      </div>

                      <ul className="mt-3 list-disc list-inside space-y-2 text-white/75 text-sm">
                        {card.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
