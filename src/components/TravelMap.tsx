"use client";

import { motion } from "framer-motion";
import { places, countryCount, profile, links } from "@/data/content";
import { project, arcPath, graticule, MAP_W, MAP_H } from "@/lib/projection";

const points = places.map((p) => ({ ...p, ...project(p) }));
const segments = points.slice(0, -1).map((a, i) => ({
  d: arcPath(a, points[i + 1]),
  key: `${a.city}-${points[i + 1].city}`,
}));
const grid = graticule();

// Ülkeleri tekrarsız listele (Türkiye iki şehirde geçiyor).
const countries = Array.from(new Set(places.map((p) => p.country)));

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

      {/* Harita */}
      <motion.div
        className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface p-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Gezilen ${countryCount} ülkeyi gösteren rota haritası`}
        >
          <g stroke="var(--color-line)" strokeWidth={1} opacity={0.9}>
            {grid.vertical.map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={MAP_H} />
            ))}
            {grid.horizontal.map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={MAP_W} y2={y} />
            ))}
          </g>

          <g fill="none" stroke="var(--color-travel)" strokeWidth={1.4} strokeLinecap="round">
            {segments.map((seg, i) => (
              <motion.path
                key={seg.key}
                d={seg.d}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.65 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.09, ease: "easeInOut" }}
              />
            ))}
          </g>

          {points.map((p, i) => (
            <motion.g
              key={p.city}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: "backOut" }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={p.home ? 9 : 6}
                fill={p.home ? "var(--color-travel)" : "var(--color-tech)"}
                opacity={0.18}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={p.home ? 3.6 : 2.4}
                fill={p.home ? "var(--color-travel)" : "var(--color-tech)"}
              />
              <text
                x={p.x + 9}
                y={p.y + 4}
                className="font-mono"
                fontSize={11}
                fill="var(--color-muted)"
              >
                {p.city}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* Ülke listesi */}
      <motion.ul
        className="mt-8 flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        {countries.map((c) => (
          <li
            key={c}
            className="rounded-full border border-line px-3 py-1.5 text-sm text-muted"
          >
            {c}
          </li>
        ))}
      </motion.ul>

      <motion.p
        className="mt-8 text-sm text-muted"
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
