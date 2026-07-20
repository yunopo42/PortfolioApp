import { profile } from "@/data/content";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  { href: "#hakkimda", label: "Hakkımda" },
  { href: "#projeler", label: "Projeler" },
  { href: "#yetkinlikler", label: "Yetkinlikler" },
  { href: "#gezi", label: "Gezi" },
  { href: "#iletisim", label: "İletişim" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <a href="#" className="font-mono text-sm text-fg transition hover:text-tech">
          {profile.name.split(" ").map((w) => w[0]).join("")}
          <span className="text-tech">.</span>
        </a>

        <div className="flex items-center gap-4">
          <ul className="hidden flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted sm:flex">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="transition hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
