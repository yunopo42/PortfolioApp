"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

/**
 * Uygulama genelindeki context sağlayıcıları.
 * Bu dosya "use client" olduğu için layout.tsx sunucu bileşeni kalabiliyor.
 *
 * - ThemeProvider: <html>'e .dark sınıfını ekleyerek temayı yönetir.
 * - MotionConfig reducedMotion="user": işletim sisteminde "hareketi azalt"
 *   açık olan kullanıcılarda TÜM Framer Motion animasyonlarını kısar.
 *   (globals.css'teki kural yalnızca CSS geçişlerini yakalar; Framer
 *   animasyonları JavaScript'le çalıştığı için bu ayar şart.)
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
