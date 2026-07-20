"use client";

import { motion } from "framer-motion";

/**
 * İçeriği, ekrana girdiğinde aşağıdan yumuşakça belirtir.
 * whileInView: eleman görünür alana girince animasyonu tetikler.
 * viewport.once: sadece ilk seferde oynat.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
