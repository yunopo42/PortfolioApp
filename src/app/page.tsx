import IntroGate from "@/components/IntroGate";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import TravelMap from "@/components/TravelMap";
import Contact from "@/components/Contact";
import { profile } from "@/data/content";

export default function Page() {
  return (
    <IntroGate>
      <SiteNav />

      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <TravelMap />
        <Contact />
      </main>

      <footer className="border-t border-line/60 px-6 py-8">
        <p className="mx-auto max-w-5xl font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} · Next.js & Tailwind ile
          yapıldı
        </p>
      </footer>
    </IntroGate>
  );
}
