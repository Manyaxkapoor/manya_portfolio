"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },  
  { id: "contact", label: "Contact" },
];

export default function Header(): React.JSX.Element {
  const [activeId, setActiveId] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* Active section observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Scroll direction + progress */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // hide / show header
      setHidden(currentY > lastScrollY && currentY > 100);
      setLastScrollY(currentY);

      // progress bar
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (currentY / docHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-purple-500 z-[60] transition-all"
        style={{ width: `${progress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#110720]/80 backdrop-blur-md border-b border-white/10
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav className="px-6 py-4">
          <div className="container mx-auto max-w-6xl flex items-center justify-between">

            {/* Logo */}
<Link href="#home" className="hover:opacity-90 transition">
 <Image
  src="/logo/logo.png"
  alt="Manya Kapoor Logo"
  width={140}
  height={100}
  priority
/>

</Link>


            {/* Desktop Nav */}
         <ul className="hidden md:flex items-center gap-6 text-sm">
  {sections.map((section) => (
    <li key={section.id}>
      <Link
        href={`#${section.id}`}
        className={`
          relative inline-block px-1 py-2
          transition-all duration-300 ease-out
          ${
            activeId === section.id
              ? "text-purple-400"
              : "text-white/80 hover:text-white"
          }
          hover:-translate-y-[2px]
        `}
      >
        {/* Glow layer */}
        <span
          className="
            pointer-events-none absolute inset-0
            bg-purple-500/30 blur-lg
            opacity-0
            transition-opacity duration-370
            hover:opacity-100
          "
        />

        {/* Text */}
        <span className="relative z-10">
          {section.label}
        </span>
      </Link>
    </li>
  ))}
</ul>





            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5"
              aria-label="Toggle menu"
            >
              <span className="w-6 h-[2px] bg-white" />
              <span className="w-6 h-[2px] bg-white" />
              <span className="w-6 h-[2px] bg-white" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#110720] border-t border-white/10 px-6 py-6">
            <ul className="flex flex-col gap-6">
              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block transition-colors ${
                      activeId === section.id
                        ? "text-purple-400"
                        : "text-white/80 hover:text-purple-300"
                    }`}
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
