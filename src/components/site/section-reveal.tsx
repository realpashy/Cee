"use client";

import React from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
