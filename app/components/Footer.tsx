import Link from "next/link";

export default function Footer(): React.JSX.Element {
  return (
    <footer
      id="contact"
      className="pt-20 pb-10 px-6 border-t border-white/10"
    >
      <div className="container mx-auto max-w-6xl">

        {/* Top CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Let’s build something meaningful
          </h2>

          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Open to internships, collaborations, and conversations around
            building scalable, user-focused software.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:im.manyakapoor@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
              bg-purple-600 hover:bg-purple-500 transition
              text-white font-medium shadow-lg shadow-purple-900/30"
            >
              Get in Touch
              <span>→</span>
            </a>

            <a
              href="https://drive.google.com/file/d/14MwCzFSLdDpi7PW774fLn_g0SqvkIjOW/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg
              border border-white/20 text-white/90 hover:bg-white/5 transition"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Contact Info */}
        
        <div className="text-center mb-12 space-y-2">
           <a
            href="mailto:im.manyakapoor@gmail.com"
            className="block text-purple-400 hover:text-purple-300 transition"
          >
            im.manyakapoor@gmail.com
          </a>
          <p className="text-white/70">
           +91 6284023866
          </p>
         
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-12">
         {[
  {
    href: "https://github.com/manyaxkapoor",
    label: "GitHub",
    icon: (
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    ),
  },
  {
    href: "https://x.com/manya786",
    label: "X",
    icon: (
      <path d="M5 4.5L12 11.5L19 4.5L20.5 6L13.5 13L20.5 20L19 21.5L12 14.5L5 21.5L3.5 20L10.5 13L3.5 6L5 4.5Z" />
    ),
  },
  {
    href: "https://www.linkedin.com/in/manyaakapoor/",
    label: "LinkedIn",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    ),
  },
].map((item) => (
  <Link
    key={item.label}
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={item.label}
    className="w-11 h-11 flex items-center justify-center rounded-full
    bg-white/5 border border-white/10
    hover:bg-purple-500/10 hover:border-purple-400/40
    transition"
  >
    <svg
      className="w-5 h-5 text-white"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      {item.icon}
    </svg>
  </Link>
))}

        </div>

        {/* Bottom */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Manya Kapoor • Awaken Create Disrupt Heal • 
          </p>
        </div>
      </div>
    </footer>
  );
}
