"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Banner() {
  const texts = [
    "an aspiring Software Engineer",
    "a Student @ NIT Jalandhar",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [inView, setInView] = useState(false);

  // 🔧 parallax fix states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isImageInView, setIsImageInView] = useState(false);

  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  /* ================= Typing animation ================= */
  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
        }, 1800);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTypingSpeed(100);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed]);

  /* ================= Headline scroll animation ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.4 }
    );

    if (headlineRef.current) observer.observe(headlineRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= Image visibility observer (FIX) ================= */
  useEffect(() => {
    if (!imageContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsImageInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(imageContainerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ================= Mouse parallax (FIXED ONLY) ================= */
  useEffect(() => {
    if (!isHovered || !isImageInView) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return;

      const rect = imageContainerRef.current.getBoundingClientRect();

      // ⛔ ignore cursor far away
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setMousePosition({ x: 0, y: 0 });
        return;
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 35,
          y: (e.clientY - rect.top - rect.height / 2) / 35,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isHovered, isImageInView]);

  /* ================= Reset on leave / scroll ================= */
  useEffect(() => {
    if (!isHovered || !isImageInView) {
      setMousePosition({ x: 0, y: 0 });
    }
  }, [isHovered, isImageInView]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-violet-400 rounded-full animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-float" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* ================= IMAGE SECTION ================= */}
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <div
              ref={imageContainerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative flex items-center justify-center"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              {/* glow / rings —  */}
              <div className="absolute w-[380px] h-[380px] rounded-full border-2 border-purple-500/20 animate-ping-slow" />
              <div className="absolute w-[340px] h-[340px] rounded-full border-2 border-violet-500/30 animate-ping-slower" />
              <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 animate-spin-slow opacity-50 blur-sm" />
              <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-r from-purple-500/40 via-violet-500/40 to-purple-500/40 blur-3xl animate-pulse-slow" />

              <div className="relative z-10 w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-900/50 group">
                <Image
                  src="/me.png"
                  alt="Manya Kapoor"
                  fill
                  priority
                  sizes="(max-width: 768px) 260px, 280px"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg shadow-lg animate-float opacity-80" />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full shadow-lg animate-float-delayed opacity-80" />
            </div>
          </div>

          {/* ================= TEXT SECTION ================= */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <p className={`relative pl-4 text-base font-medium text-purple-200 transition-all duration-700 delay-100
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <span className="absolute left-0 top-1.5 h-4 w-[2px] bg-gradient-to-b from-purple-400 to-violet-500 rounded-full animate-pulse" />
              Hello, I'm <span className="font-semibold text-white">Manya Kapoor</span>
            </p>


            

<h1
              ref={headlineRef}
              className={`text-5xl lg:text-7xl font-semibold text-white leading-tight transition-all duration-700 delay-200
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              Where engineering meets thoughtful{" "}
              <span className="relative inline-block group">
                <Image
                  src="/assets/circle.png"
                  alt=""
                  width={220}
                  height={220}
                  className="absolute -top-2 left-0 opacity-50"
                />
                <span className="relative bg-gradient-to-r from-violet-500 via-purple-400 to-violet-500 bg-clip-text text-transparent animate-gradient">
                  design
                </span>
              </span>
              .
            </h1>

            <p className={`text-xl text-white/80 max-w-xl transition-all duration-700 delay-300
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
              Blending computer science fundamentals, design thinking,
              and scalable code.
            </p>
          </div>
        </div>

        {/* ================= BOTTOM TYPING SECTION (RESTORED) ================= */}
        <div className={`mt-16 space-y-5 text-center lg:text-left transition-all duration-700 delay-500
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-4xl font-bold text-white">
            I&apos;m {displayedText}
            <span className="inline-block w-[3px] h-8 bg-purple-400 ml-1 animate-blink align-middle" />
          </p>

          <p className="text-lg text-white/80 max-w-2xl mx-auto lg:mx-0">
            Focused on building reliable systems.
          </p>

          <div className="pt-4">
            <a
              href="https://drive.google.com/file/d/1eNGejjCbPd5esdhR_gmem9ibk6O9kubs/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all duration-300 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-105 group"
            >
              View Resume
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
