"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

/**
 * next-themes'i saran ince bir katman.
 * Bu dosya "use client" olduğu için, layout.tsx sunucu bileşeni kalabiliyor.
 */
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider
      attribute="class" // <html> etiketine .dark sınıfını ekler
      defaultTheme="light"
      enableSystem={false} // varsayılan açık tema olsun, sistem tercihini takip etme
      disableTransitionOnChange // tema değişirken renkler kaymasın
    >
      {children}
    </NextThemeProvider>
  );
}
