"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { places, profile, countryCount } from "@/data/content";
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

const points = places.map((p) => ({ ...p, ...project(p) }));
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
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-ink"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* ---- Arka plandaki harita ---- */}
      <motion.svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        initial={{ opacity: 0, scale: 1.08 }}
        // Harita önce soluk belirir, terminal kaybolunca parlar,
        // isim geldikten sonra tekrar söner. times[] dizisi 0'dan başlamalı.
        animate={{ opacity: [0, 0, 0.4, 0.4, 1, 1, 0.15], scale: 1 }}
        transition={{
          opacity: {
            duration: T.finish,
            times: [
              0,
              T.mapIn / T.finish,
              (T.mapIn + 0.7) / T.finish,
              T.terminalOut / T.finish,
              (T.terminalOut + 0.5) / T.finish,
              (T.nameIn + 0.5) / T.finish,
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

      {/* ---- Terminal ---- */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: T.terminalOut }}
      >
        <div className="w-full max-w-xl font-mono text-sm leading-7 sm:text-base">
          <div>
            <span className="text-tech">$</span>{" "}
            <Typed text="whoami" delay={0.3} />
          </div>
          <div className="text-muted">
            <Typed text={`${profile.name} — Bilgisayar Mühendisi`} delay={0.75} />
          </div>

          <div className="mt-3">
            <span className="text-tech">$</span>{" "}
            <Typed text="cat ilgi-alanlari.txt" delay={1.25} />
          </div>
          <div className="text-muted">
            <Typed text="GenAI · Backend · Database · Mobil" delay={1.85} />
          </div>

          <div className="mt-3">
            <span className="text-tech">$</span>{" "}
            <Typed text="./gezgin --özet" delay={2.35} />
          </div>
          <div className="text-travel">
            <Typed
              text={`${countryCount} ülke · ${places.length} şehir · 1 sırt çantası`}
              delay={2.85}
            />
          </div>
        </div>
      </motion.div>

      {/* ---- İsim ---- */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: T.nameIn }}
      >
        <motion.h1
          className="text-4xl font-semibold tracking-tight sm:text-6xl"
          initial={{ y: 18, filter: "blur(10px)" }}
          animate={{ y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: T.nameIn, ease: "easeOut" }}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          className="mt-3 font-mono text-sm text-muted sm:text-base"
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
