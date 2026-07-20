import Image from "next/image";
import { profile, education, experience, languages, certificates } from "@/data/content";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Section id="hakkimda" index="01" title="Hakkımda">
      <div className="grid gap-8 sm:grid-cols-[220px_1fr] sm:gap-10">
        <Reveal>
          <Image
            src="/profil.jpg"
            alt={profile.name}
            width={440}
            height={550}
            className="w-full rounded-2xl border border-line object-cover"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="leading-relaxed text-muted">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 leading-relaxed text-muted">
              {profile.travelBlurb}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Eğitim */}
      <Reveal delay={0.14}>
        <h3 className="mt-12 font-mono text-sm uppercase tracking-widest text-tech">
          Eğitim
        </h3>
        <ul className="mt-5 space-y-5">
          {education.map((e) => (
            <li
              key={e.school}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-medium text-fg">{e.school}</h4>
                <span className="font-mono text-xs text-muted">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{e.degree}</p>
              <p className="mt-1 text-sm text-travel">{e.detail}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Deneyim */}
      <Reveal delay={0.14}>
        <h3 className="mt-12 font-mono text-sm uppercase tracking-widest text-tech">
          Deneyim
        </h3>
        <ul className="mt-5 space-y-5">
          {experience.map((x) => (
            <li
              key={x.company}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-medium text-fg">
                  {x.role} · {x.company}
                </h4>
                <span className="font-mono text-xs text-muted">{x.period}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {x.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-tech" />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Sertifikalar + Diller */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <Reveal>
          <h3 className="font-mono text-sm uppercase tracking-widest text-tech">
            Sertifikalar
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {certificates.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-travel" />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="font-mono text-sm uppercase tracking-widest text-tech">
            Diller
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {languages.map((l) => (
              <li key={l.name}>
                <span className="text-fg">{l.name}</span> — {l.level}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
