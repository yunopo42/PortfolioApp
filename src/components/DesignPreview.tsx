"use client";

import Image from "next/image";
import { useState } from "react";

type Device = "desktop" | "mobile";

const DEVICES: { value: Device; label: string }[] = [
  { value: "desktop", label: "masaüstü" },
  { value: "mobile", label: "mobil" },
];

/**
 * Tasarımın canlı önizlemesi. Bu sayfalar WebGL ve harici kütüphaneler
 * yüklüyor; ziyaretçi istemeden iframe'i açmak veri ve pil harcatır. Bu yüzden
 * önce ekran görüntüsü gösteriliyor, iframe yalnızca "başlat"a basılınca
 * ekleniyor. "mobil" iframe'i 390 px'e daraltır, sitenin kendi mobil
 * düzeni devreye girer.
 */
export default function DesignPreview({
  name,
  demoUrl,
  coverUrl,
}: {
  name: string;
  demoUrl: string;
  coverUrl: string;
}) {
  const [live, setLive] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Önizleme boyutu"
          className="inline-flex rounded-full border border-line p-1 font-mono text-xs"
        >
          {DEVICES.map((d) => (
            <button
              key={d.value}
              type="button"
              aria-pressed={device === d.value}
              onClick={() => setDevice(d.value)}
              className={`rounded-full px-3 py-1 transition ${
                device === d.value ? "bg-tech/10 text-tech" : "text-muted hover:text-fg"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {!live && (
          <span className="font-mono text-xs text-muted">
            canlı önizleme, başlattığında yüklenir
          </span>
        )}
      </div>

      <div className="flex justify-center rounded-2xl border border-line bg-surface p-2 sm:p-4">
        <div
          className={`relative w-full overflow-hidden rounded-xl border border-line bg-ink ${
            device === "mobile" ? "aspect-[390/780] max-w-[390px]" : "aspect-[16/10]"
          }`}
        >
          {live ? (
            <iframe
              src={demoUrl}
              title={`${name} canlı önizleme`}
              allow="fullscreen"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLive(true)}
              aria-label={`${name} canlı önizlemesini başlat`}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <Image
                src={coverUrl}
                alt=""
                fill
                priority
                sizes="(min-width: 1152px) 1120px, 100vw"
                className="object-cover object-top"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/20 transition group-hover:bg-ink/5">
                <span className="inline-flex items-center gap-2 rounded-full bg-tech px-5 py-2.5 text-sm font-medium text-white shadow-lg transition group-hover:opacity-90 dark:text-ink">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14Z" />
                  </svg>
                  Canlı önizlemeyi başlat
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
