"use client";

import { cloneElement } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "flag-icons/css/flag-icons.min.css";

// Harita 81 ilin SVG çizimini içeriyor (~yüzlerce KB). dynamic() ile
// ayrı bir pakete bölünüyor: ana sayfa yüklenirken inmiyor, bu bölüme
// gelindiğinde tarayıcı arka planda getiriyor. ssr: false — harita
// yalnızca görsel/hover odaklı olduğu için sunucuda çizmenin değeri yok.
const TurkeyMap = dynamic(() => import("turkey-map-react"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-xl bg-line/50 sm:h-96" />
  ),
});
import {
  visitedProvinces,
  europeCountries,
  travelStats,
  profile,
  links,
} from "@/data/content";

// Set kullanıyoruz çünkü 81 il için 81 kez dizi taramak yerine
// tek adımda "bu il gezildi mi?" sorusunu cevaplıyor.
const visited = new Set(visitedProvinces);

const STATS = [
  { value: travelStats.provinces, label: "il (Türkiye)" },
  { value: travelStats.europeCountries, label: "Avrupa ülkesi" },
  { value: travelStats.europeCities, label: "Avrupa şehri" },
];

export default function TravelMap() {
  return (
    <section id="gezi" className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="font-mono text-sm text-travel">04</span>
          Gezi
        </h2>
        <div className="mt-4 h-px w-full bg-line" />
        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          {profile.travelBlurb}
        </p>
      </motion.div>

      {/* Sayılar */}
      <motion.dl
        className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-6 text-center">
            <dt className="text-2xl font-semibold text-travel sm:text-3xl">
              {s.value}
            </dt>
            <dd className="mt-1 text-xs text-muted">{s.label}</dd>
          </div>
        ))}
      </motion.dl>

      {/* Türkiye haritası */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="font-mono text-xs uppercase tracking-widest text-travel">
          Türkiye — {travelStats.provinces} il
        </h3>

        {/* Ekran okuyucular hover baloncuklarını göremez; il listesi
            onlar için görünmez bir paragraf olarak veriliyor. */}
        <p className="sr-only">
          Gezdiğim iller: {visitedProvinces.join(", ")}.
        </p>

        <div
          role="img"
          aria-label={`Türkiye haritası — gezilen ${travelStats.provinces} il işaretli`}
          className="tr-map mt-4 overflow-x-auto rounded-2xl border border-line bg-surface p-4"
        >
          <TurkeyMap
            hoverable
            showTooltip
            // cityWrapper: paket her il için bir <g> elemanı üretiyor,
            // biz de onu klonlayıp gezilenleri farklı renge boyuyoruz.
            cityWrapper={(cityComponent, city) =>
              cloneElement(
                cityComponent as React.ReactElement<{ className?: string }>,
                {
                  key: city.id,
                  className: visited.has(city.name)
                    ? "tr-province-visited"
                    : "tr-province-idle",
                },
              )
            }
          />
        </div>
      </motion.div>

      {/* Avrupa bayrakları */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="font-mono text-xs uppercase tracking-widest text-tech">
          Avrupa — {travelStats.europeCountries} ülke, hepsinin başkentinde
        </h3>

        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {europeCountries.map((c, i) => (
            <motion.li
              key={c.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 transition hover:-translate-y-0.5 hover:border-tech/50"
            >
              {/* flag-icons: fi + fi-<ülke kodu> sınıfları bayrağı çiziyor.
                  Emoji yerine SVG olduğu için her işletim sisteminde aynı görünür. */}
              <span
                className={`fi fi-${c.code} shrink-0 rounded-sm`}
                style={{ width: 32, height: 24 }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{c.country}</p>
                <p className="truncate text-xs text-muted">{c.capital}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.p
        className="mt-10 text-sm text-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Gezdiğim yerleri{" "}
        <a
          href={links.youtube}
          target="_blank"
          rel="noreferrer noopener"
          className="text-travel underline underline-offset-4 transition hover:opacity-80"
        >
          Bir Deli Gezgin
        </a>{" "}
        kanalında ve{" "}
        <a
          href={links.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="text-travel underline underline-offset-4 transition hover:opacity-80"
        >
          @bir_deligezgin
        </a>{" "}
        hesabında paylaşıyorum.
      </motion.p>
    </section>
  );
}
