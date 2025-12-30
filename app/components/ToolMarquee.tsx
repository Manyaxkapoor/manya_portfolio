"use client";

import Image from "next/image";

const tools = [
  "React",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "Python",
  "FastAPI",
  "Docker",
  "MongoDB",
  "Postman",
  "Vite",
  "Jupyter",
  "CPlusPlus",
  "Tailwind",
];

export default function ToolMarquee(): React.JSX.Element {
  return (
    <div className="relative overflow-hidden w-full mt-12">

      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#110720] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#110720] to-transparent z-10" />

      <div className="flex w-max gap-14 animate-tool-marquee hover:[animation-play-state:paused]">
        {[...tools, ...tools].map((name, i) => (
          <div key={i} className="min-w-[64px] flex justify-center">
            <Image
              src={`/tools/${name}.svg`}
              alt={name}
              width={40}
              height={40}
              draggable={false}
              className="opacity-80 hover:opacity-100 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
