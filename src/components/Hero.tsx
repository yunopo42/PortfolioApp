import Image from "next/image";
import { profile, travelStats, projects } from "@/data/content";
import Reveal from "./Reveal";
import Social from "./Social";

const STATS = [
  { value: `${travelStats.provinces}`, label: "il gezildi" },
  { value: `${travelStats.countries}`, label: "ülke" },
  { value: `${projects.length}`, label: "proje" },
  { value: "3.42", label: "GPA / 4.00" },
];

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <Reveal>
            <p className="font-mono text-sm text-tech">
              <span className="text-muted">$</span> {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-4 text-lg text-muted sm:text-xl">
              {profile.title} ·{" "}
              <span className="text-travel">{profile.tagline}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            {/* Fotoğrafın arkasındaki yumuşak renk halkası */}
            <div
              className="absolute -inset-2 rounded-full bg-gradient-to-br from-tech/25 to-travel/25 blur-xl"
              aria-hidden
            />
            <Image
              src="/profil.jpg"
              alt={profile.name}
              width={176}
              height={176}
              priority
              sizes="(min-width: 640px) 176px, 128px"
              className="relative h-32 w-32 rounded-full border border-line object-cover sm:h-44 sm:w-44"
            />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 max-w-2xl leading-relaxed text-muted">
          Yapay zekâ destekli sistemler, IoT otomasyonu ve full-stack geliştirme
          üzerine çalışıyorum. Backend ve veritabanı tarafı en sevdiğim alan;
          arayüz gerektiğinde frontend, iş mobile düştüğünde mobil tarafa da
          geçiyorum.
        </p>
      </Reveal>

      <Reveal delay={0.26}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projeler"
            className="rounded-full bg-tech px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Projelerime bak
          </a>
          <a
            href="#iletisim"
            className="rounded-full border border-line px-5 py-2.5 text-sm text-fg transition hover:border-tech hover:text-tech"
          >
            İletişime geç
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <Social className="mt-8" />
      </Reveal>

      <Reveal delay={0.38}>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-6">
              <dt className="text-2xl font-semibold text-fg sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
