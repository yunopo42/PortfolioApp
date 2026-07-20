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
      <nav className="mx-auto max-w-5xl px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="font-mono text-sm text-fg transition hover:text-tech">
            {profile.name.split(" ").map((w) => w[0]).join("")}
            <span className="text-tech">.</span>
          </a>

          {/* Masaüstü: linkler üst satırda */}
          <ul className="hidden items-center gap-x-5 text-sm text-muted sm:flex">
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

        {/* Mobil: linkler ikinci satırda, gerekirse yatay kaydırılabilir */}
        <ul className="mt-2 flex items-center gap-x-4 overflow-x-auto whitespace-nowrap pb-1 text-sm text-muted sm:hidden">
          {SECTIONS.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="transition hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
