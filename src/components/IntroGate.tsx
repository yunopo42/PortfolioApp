"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "./IntroScreen";

/**
 * Giriş animasyonunu gösterir, bitince asıl siteyi açar.
 * children sunucuda render edilip buraya prop olarak geliyor —
 * yani sitenin geri kalanı gereksiz yere client bundle'a girmiyor.
 *
 * Animasyon HER tam sayfa yüklemesinde (F5 / yenileme) baştan oynar.
 * (Kullanıcı isteği: her açılışta karşılama animasyonu görünsün.)
 */
export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  // useCallback: fonksiyonun kimliği sabit kalsın ki
  // IntroScreen içindeki zamanlayıcılar her render'da sıfırlanmasın.
  const finish = useCallback(() => setDone(true), []);

  // Animasyon sürerken arka planın kaymasını engelle.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <>
      <AnimatePresence>
        {!done && <IntroScreen onDone={finish} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex min-h-full flex-1 flex-col"
      >
        {children}
      </motion.div>
    </>
  );
}
