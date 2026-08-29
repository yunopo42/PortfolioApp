import Link from "next/link";
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
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · Next.js & Tailwind ile
            yapıldı
          </p>
          <Link
            href="/privacy"
            className="transition hover:text-fg hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </IntroGate>
  );
}
