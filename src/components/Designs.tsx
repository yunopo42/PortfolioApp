import Image from "next/image";
import Link from "next/link";
import { designs, designCoverUrl, designDemoUrl } from "@/data/content";
import Section from "./Section";
import Reveal from "./Reveal";
import ExternalArrow from "./ExternalArrow";

export default function Designs() {
  return (
    <Section id="tasarimlar" index="03" title="Site Tasarımları">
      <Reveal>
        <p className="max-w-2xl leading-relaxed text-muted">
          Farklı konular için tasarlayıp kodladığım örnek web siteleri. Her biri
          kendi başına çalışan tek bir HTML sayfası; ekran görüntüsüne bakmakla
          kalmayıp canlı olarak açıp deneyebilirsin.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {designs.map((d, i) => {
          // İlk tasarım iki sütuna yayılır; kapağı daha geniş kırpılır.
          const featured = i === 0;
          const href = `/tasarimlar/${d.slug}`;

          return (
            <Reveal
              key={d.slug}
              delay={i * 0.06}
              className={featured ? "sm:col-span-2" : ""}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-tech/50">
                {/* Kapak da tanıtım sayfasına gider. Aynı hedefe giden "incele"
                    bağlantısı zaten var; klavye ile iki kez durulmasın diye
                    bu bağlantı sekme sırasından ve ekran okuyucudan çıkarıldı. */}
                <Link
                  href={href}
                  tabIndex={-1}
                  aria-hidden
                  className={`relative block overflow-hidden border-b border-line bg-line/40 ${
                    featured ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={designCoverUrl(d.slug)}
                    alt=""
                    fill
                    sizes={
                      featured
                        ? "(min-width: 1024px) 976px, 100vw"
                        : "(min-width: 1024px) 478px, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {d.category}
                  </p>

                  <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium text-fg">{d.name}</h3>
                    {d.concept && (
                      <span className="rounded-full border border-travel/40 px-2.5 py-0.5 font-mono text-[11px] text-travel">
                        konsept
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-tech">{d.tagline}</p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">{d.summary}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 font-mono text-xs">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-muted transition hover:text-tech"
                    >
                      incele
                      <span aria-hidden>→</span>
                    </Link>
                    <a
                      href={designDemoUrl(d.slug)}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 text-muted transition hover:text-tech"
                    >
                      canlı demo
                      <ExternalArrow />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {designs.some((d) => d.concept) && (
        <p className="mt-6 font-mono text-xs text-muted">
          &quot;konsept&quot; etiketli çalışmalardaki marka, ürün ve fiyatlar kurgusaldır.
        </p>
      )}
    </Section>
  );
}
