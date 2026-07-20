"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Sunucu hangi temada olduğumuzu bilemez (tercih tarayıcıda saklı).
  // Bu yüzden iki ikonu da render edip doğru olanı CSS ile gösteriyoruz:
  // sunucu ile istemci aynı HTML'i üretir, hydration sorunu çıkmaz.
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Açık / karanlık tema değiştir"
      title="Tema değiştir"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-tech hover:text-tech"
    >
      {/* Güneş — sadece karanlık temada görünür */}
      <svg
        viewBox="0 0 24 24"
        className="hidden h-4 w-4 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Ay — sadece açık temada görünür */}
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
