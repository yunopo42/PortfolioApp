"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "./IntroScreen";

/**
 * Giriş animasyonunu gösterir, bitince asıl siteyi açar.
 * children sunucuda render edilip buraya prop olarak geliyor —
 * yani sitenin geri kalanı gereksiz yere client bundle'a girmiyor.
 */
const SEEN_KEY = "intro-seen";

// useSyncExternalStore için: tarayıcı dışı (sunucu) render'da "izlenmedi"
// varsay, tarayıcıda sessionStorage'a bak. Bu, harici bir kaynağı okumak
// için React'in önerdiği yol — effect içinde setState çağırmaktan farklı
// olarak fazladan render turu da üretmez.
const subscribe = () => () => {};
const getSeen = () => sessionStorage.getItem(SEEN_KEY) !== null;
const getServerSeen = () => false;

export default function IntroGate({ children }: { children: React.ReactNode }) {
  // Animasyon bu oturumda zaten izlendiyse tekrar oynatma.
  const seen = useSyncExternalStore(subscribe, getSeen, getServerSeen);
  const [finished, setFinished] = useState(false);
  const done = seen || finished;

  // useCallback: fonksiyonun kimliği sabit kalsın ki
  // IntroScreen içindeki zamanlayıcılar her render'da sıfırlanmasın.
  const finish = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setFinished(true);
  }, []);

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
