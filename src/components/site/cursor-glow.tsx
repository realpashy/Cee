"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const pointerX = useMotionValue(-160);
  const pointerY = useMotionValue(-160);
  const x = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.4 });
  const y = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.4 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pointerX.set(event.clientX - 80);
      pointerY.set(event.clientY - 80);
    };

    const onLeave = () => {
      pointerX.set(-160);
      pointerY.set(-160);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.22),rgba(149,223,30,0.1)_28%,transparent_68%)] blur-2xl md:block"
      style={{ x, y }}
    />
  );
}
