import { projects } from "@/data/content";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <Section id="projeler" index="02" title="Projeler">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.06}
            className={p.featured ? "sm:col-span-2" : ""}
          >
            <article className="group h-full rounded-2xl border border-line bg-surface p-6 transition hover:border-tech/50">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-medium text-fg">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full border border-travel/40 px-2.5 py-0.5 font-mono text-[11px] text-travel">
                    öne çıkan
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-tech">{p.tagline}</p>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {p.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition group-hover:text-tech"
                >
                  kodu gör
                  <span aria-hidden>→</span>
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
