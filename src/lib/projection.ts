import type { Place } from "@/data/content";

// Haritanın SVG koordinat sistemi (viewBox ile aynı olmalı).
export const MAP_W = 800;
export const MAP_H = 500;

// Gezilen şehirlerin kapsadığı coğrafi alan + biraz boşluk.
const LON_MIN = -1;
const LON_MAX = 36;
const LAT_MIN = 35;
const LAT_MAX = 56;

/**
 * Enlem/boylamı SVG koordinatına çevirir (equirectangular projeksiyon).
 * Yani: dünya üzerindeki gerçek konumu, ekrandaki x/y noktasına eşler.
 */
export function project(place: Pick<Place, "lat" | "lon">) {
  const x = ((place.lon - LON_MIN) / (LON_MAX - LON_MIN)) * MAP_W;
  const y = ((LAT_MAX - place.lat) / (LAT_MAX - LAT_MIN)) * MAP_H;
  return { x, y };
}

/**
 * İki şehir arasında hafif yukarı kavisli bir uçuş rotası çizer.
 * Kavis, düz çizgiden daha "uçuş rotası" hissi veriyor.
 */
export function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(dist * 0.22, 70);
  return `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}`;
}

/** Arka plandaki enlem/boylam ızgarasının çizgi konumları. */
export function graticule() {
  const vertical: number[] = [];
  for (let lon = 0; lon <= LON_MAX; lon += 5) {
    vertical.push(project({ lat: 0, lon }).x);
  }
  const horizontal: number[] = [];
  for (let lat = LAT_MIN; lat <= LAT_MAX; lat += 5) {
    horizontal.push(project({ lat, lon: 0 }).y);
  }
  return { vertical, horizontal };
}
