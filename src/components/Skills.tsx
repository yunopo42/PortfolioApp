import { skills } from "@/data/content";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Section id="yetkinlikler" index="03" title="Yetkinlikler">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-surface p-5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-tech">
                {s.group}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-ink px-2.5 py-1.5 text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
