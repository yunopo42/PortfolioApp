import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import DesignPreview from "@/components/DesignPreview";
import ExternalArrow from "@/components/ExternalArrow";
import {
  designs,
  designCoverUrl,
  designDemoUrl,
  profile,
  siteUrl,
} from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

// Sayfalar build sırasında content.ts'teki listeden üretilir; listede olmayan
// bir adres istek anında üretilmeye çalışılmaz, doğrudan 404 döner.
export const dynamicParams = false;

export function generateStaticParams() {
  return designs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = designs.find((x) => x.slug === slug);
  if (!d) return {};

  const url = `${siteUrl}/tasarimlar/${d.slug}`;
  return {
    title: `${d.name} — Site Tasarımı · ${profile.name}`,
    description: d.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${d.name} — ${d.tagline}`,
      description: d.summary,
      url,
      type: "website",
      locale: "tr_TR",
      images: [{ url: designCoverUrl(d.slug), width: 1440, height: 900 }],
    },
  };
}

export default async function DesignPage({ params }: Props) {
  const { slug } = await params;
  const index = designs.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const d = designs[index];
  const demo = designDemoUrl(d.slug);
  // Önceki / sonraki uçlarda başa sarar; ziyaretçi çıkmaza girmesin.
  const prev = designs[(index - 1 + designs.length) % designs.length];
  const next = designs[(index + 1) % designs.length];

  return (
    <div className="min-h-screen flex flex-col bg-ink text-fg">
      <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/#tasarimlar"
            className="group flex items-center gap-2 font-mono text-sm text-muted transition hover:text-fg"
          >
            <span
              className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            >
              ←
            </span>
            <span>Portfolyo</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-tech/30 bg-tech/5 px-2.5 py-0.5 font-mono text-xs text-tech sm:inline">
              Site Tasarımları
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-12 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <span>{d.category}</span>
              <span aria-hidden>•</span>
              <span>{d.year}</span>
              {d.concept && (
                <>
                  <span aria-hidden>•</span>
                  <span className="text-travel">konsept çalışma</span>
                </>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {d.name}
            </h1>
            <p className="mt-2 text-tech">{d.tagline}</p>
          </div>

          <a
            href={demo}
            target="_blank"
            rel="noopener"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-tech px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 sm:self-auto dark:text-ink"
          >
            Yeni sekmede aç
            <ExternalArrow className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <DesignPreview name={d.name} demoUrl={demo} coverUrl={designCoverUrl(d.slug)} />
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-[1fr_16rem]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Proje hakkında</h2>
            <p className="mt-3 leading-relaxed text-muted">{d.description}</p>

            <h3 className="mt-8 text-lg font-medium">Öne çıkanlar</h3>
            <ul className="mt-3 space-y-2.5">
              {d.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tech" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-tech">
                Kullanılanlar
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-muted">Yıl</dt>
                  <dd>{d.year}</dd>
                </div>
                <div>
                  <dt className="text-muted">Yapı</dt>
                  <dd>Tek dosyalık HTML sayfası, sunucu gerektirmez</dd>
                </div>
              </dl>
            </div>

            {d.concept && (
              <p className="font-mono text-xs leading-relaxed text-muted">
                Bu bir konsept çalışmadır: marka, ürünler ve fiyatlar kurgusaldır,
                satış yapılmaz.
              </p>
            )}
          </aside>
        </div>

        {designs.length > 1 && (
          <nav
            aria-label="Diğer tasarımlar"
            className="mx-auto mt-16 grid max-w-5xl gap-4 border-t border-line pt-8 sm:grid-cols-2"
          >
            <Link
              href={`/tasarimlar/${prev.slug}`}
              className="group rounded-xl border border-line bg-surface p-5 transition hover:border-tech/50"
            >
              <span className="font-mono text-xs text-muted">← önceki</span>
              <span className="mt-1 block font-medium transition group-hover:text-tech">
                {prev.name}
              </span>
            </Link>
            <Link
              href={`/tasarimlar/${next.slug}`}
              className="group rounded-xl border border-line bg-surface p-5 text-right transition hover:border-tech/50"
            >
              <span className="font-mono text-xs text-muted">sonraki →</span>
              <span className="mt-1 block font-medium transition group-hover:text-tech">
                {next.name}
              </span>
            </Link>
          </nav>
        )}
      </main>

      <footer className="border-t border-line/60 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <Link
            href="/"
            className="transition hover:text-fg hover:underline underline-offset-4"
          >
            Portfolyo
          </Link>
        </div>
      </footer>
    </div>
  );
}
