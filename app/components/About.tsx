import Image from "next/image";

export default function About(): React.JSX.Element {
  return (
    <section
      id="about"
      className="py-16 lg:py-20 px-4 lg:px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-12 items-center lg:grid-cols-2">

          {/* Image Section (Top on mobile, Right on desktop) */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/assets/illustration.png"
              alt="About illustration"
              width={420}
              height={420}
              priority
              className="rounded-xl shadow-xl w-[260px] sm:w-[320px] lg:w-[420px]"
            />
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              About Me
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
              I’m{" "}
              <span className="text-purple-400 font-semibold">
                Manya Kapoor
              </span>
              , a 3rd-year undergraduate at{" "}
              <span className="font-medium">
                Dr. B. R. Ambedkar National Institute of Technology, Jalandhar
              </span>
              , with a strong academic foundation and a growing focus on software
              engineering.
            </p>

            {/* Academic Timeline */}
            <div className="relative mb-8 pl-4 lg:pl-6 text-left">
              <div className="absolute left-1 top-0 h-full w-px bg-white/20" />

              <div className="space-y-4">
                <p className="text-white/90">
                  <span className="font-medium">Major</span> — Instrumentation &
                  Control Engineering{" "}
                  <span className="text-white/70">
                    (CGPA: 8.31/10)
                  </span>
                </p>

                <p className="text-white/90">
                  <span className="font-medium">Minor</span> — Computer Science &
                  Engineering{" "}
                  <span className="text-white/70">
                    (CGPA: 9.38/10)
                  </span>
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              My interests lie at the intersection of software engineering,
              problem-solving, and system design. Beyond coursework, I’ve led
              student initiatives, competed at national-level challenges, and
              consistently sharpened my problem-solving skills through
              competitive programming.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
