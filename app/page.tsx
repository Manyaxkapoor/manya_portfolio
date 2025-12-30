import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Skills from "./components/skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/achievements";
import Footer from "./components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-[#110720] text-white">
      <Header />
      <Banner />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Footer />
    </main>
  );
}

