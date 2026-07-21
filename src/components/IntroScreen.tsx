"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { introRoute, profile, travelStats } from "@/data/content";
import { project, arcPath, graticule, MAP_W, MAP_H } from "@/lib/projection";

/* Animasyonun zaman çizelgesi (saniye).
   Tek yerden ayarlanabilsin diye burada topluyoruz. */
const T = {
  mapIn: 1.3,
  dotsStart: 1.7,
  dotStep: 0.1,
  arcsStart: 2.0,
  arcStep: 0.12,
  terminalOut: 3.5,
  nameIn: 3.9,
  finish: 5.6,
};

const points = introRoute.map((p) => ({ ...p, ...project(p) }));
const segments = points.slice(0, -1).map((a, i) => ({
  d: arcPath(a, points[i + 1]),
  key: `${a.city}-${points[i + 1].city}`,
}));
const grid = graticule();

/** Harfleri tek tek yazan terminal satırı. */
function Typed({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let i = 0;
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      tick = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length && tick) clearInterval(tick);
      }, 26);
    }, delay * 1000);

    return () => {
      clearTimeout(start);
      if (tick) clearInterval(tick);
    };
  }, [text, delay]);

  return <span className={className}>{text.slice(0, shown)}</span>;
}

export default function IntroScreen({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();

  // Hareket azaltma tercihi açıksa animasyonu atla.
  useEffect(() => {
    if (!reduceMotion) return;
    const t = setTimeout(onDone, 200);
    return () => clearTimeout(t);
  }, [reduceMotion, onDone]);

  // Animasyon bitince siteye geç.
  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(onDone, T.finish * 1000);
    return () => clearTimeout(t);
  }, [reduceMotion, onDone]);

  // Escape ile de geçilebilsin.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  if (reduceMotion) return null;

  return (
    // "dark" sınıfı: sayfa açık temada olsa bile giriş ekranı koyu kalsın.
    // Tema renkleri CSS değişkeni olduğu için bu blok içinde otomatik olarak
    // karanlık değerlere düşüyorlar.
    <motion.div
      className="dark fixed inset-0 z-50 overflow-hidden bg-ink"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* ---- Arka plandaki harita ----
          preserveAspectRatio="slice": harita en/boy oranı ekrana uymasa bile
          tüm alanı doldurur (kenarlardan taşarak), böylece dar/uzun ekranlarda
          boş bölge kalmaz. */}
      <motion.svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        initial={{ opacity: 0, scale: 1.08 }}
        // Harita soluk belirir, terminal kaybolunca kısa süre parlar,
        // sonra isim gelmeden SÖNER — böylece isim rahat okunur.
        // times[] dizisi 0'dan başlayıp 1'de bitmeli.
        animate={{ opacity: [0, 0, 0.35, 0.55, 0.75, 0.14, 0.12], scale: 1 }}
        transition={{
          opacity: {
            duration: T.finish,
            times: [
              0,
              T.mapIn / T.finish,
              (T.mapIn + 0.7) / T.finish,
              T.terminalOut / T.finish,
              (T.terminalOut + 0.3) / T.finish,
              T.nameIn / T.finish,
              1,
            ],
          },
          scale: { duration: 2.6, delay: T.mapIn, ease: "easeOut" },
        }}
      >
        {/* Enlem / boylam ızgarası */}
        <g stroke="var(--color-line)" strokeWidth={1} opacity={0.9}>
          {grid.vertical.map((x) => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={MAP_H} />
          ))}
          {grid.horizontal.map((y) => (
            <line key={`h${y}`} x1={0} y1={y} x2={MAP_W} y2={y} />
          ))}
        </g>

        {/* Uçuş rotaları */}
        <g fill="none" stroke="var(--color-travel)" strokeWidth={1.4} strokeLinecap="round">
          {segments.map((seg, i) => (
            <motion.path
              key={seg.key}
              d={seg.d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{
                duration: 0.55,
                delay: T.arcsStart + i * T.arcStep,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Şehirler */}
        {points.map((p, i) => (
          <motion.g
            key={p.city}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: T.dotsStart + i * T.dotStep,
              ease: "backOut",
            }}
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
          </motion.g>
        ))}
      </motion.svg>

      {/* ---- Terminal penceresi ---- */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center p-5 sm:p-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: T.terminalOut }}
      >
        <motion.div
          className="w-full max-w-[34rem] overflow-hidden rounded-xl border border-line/80 bg-black/55 shadow-2xl shadow-black/50 backdrop-blur-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Pencere başlık çubuğu */}
          <div className="flex items-center gap-2 border-b border-line/60 bg-white/[0.03] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-muted">
              gezgin@portfolio ~
            </span>
          </div>

          {/* Komutlar — çıktı satırları parlak renklerle okunur */}
          <div className="px-5 py-5 font-mono text-sm leading-relaxed text-fg sm:text-base">
            <div>
              <span className="text-tech">$</span>{" "}
              <Typed text="whoami" delay={0.3} />
            </div>
            <div className="text-white">
              <Typed
                text={`${profile.name} — Bilgisayar Mühendisi`}
                delay={0.75}
              />
            </div>

            <div className="mt-3">
              <span className="text-tech">$</span>{" "}
              <Typed text="cat ilgi-alanlari.txt" delay={1.25} />
            </div>
            <div className="text-tech">
              <Typed text="GenAI · Backend · Database · Mobil" delay={1.85} />
            </div>

            <div className="mt-3">
              <span className="text-tech">$</span>{" "}
              <Typed text="./gezgin --özet" delay={2.35} />
            </div>
            <div className="text-travel">
              <Typed
                text={`${travelStats.countries} ülke · ${travelStats.provinces} il · 1 sırt çantası`}
                delay={2.85}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ---- İsim ----
          Arkadaki radyal koyu vignette, harita üzerinde ismin her zaman
          okunmasını garanti eder. */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: T.nameIn }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[420px] w-[820px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 45%, transparent 75%)",
          }}
        />
        <motion.h1
          className="relative text-5xl font-semibold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] sm:text-7xl"
          initial={{ y: 18, filter: "blur(10px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: T.nameIn, ease: "easeOut" }}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          className="relative mt-4 font-mono text-sm text-tech drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: T.nameIn + 0.45 }}
        >
          {profile.tagline}
        </motion.p>
      </motion.div>

      {/* ---- Geç butonu ---- */}
      <button
        onClick={onDone}
        className="absolute bottom-6 right-6 z-30 rounded-full border border-line px-4 py-2 font-mono text-xs text-muted transition hover:border-tech hover:text-tech"
      >
        geç →
      </button>
    </motion.div>
  );
}
