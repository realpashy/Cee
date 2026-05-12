"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function AnalysisLoader({
  lines,
  title,
  subtitle
}: {
  lines: string[];
  title: string;
  subtitle: string;
}) {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.08,
          opacity: 1,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      gsap.fromTo(
        lineRefs.current,
        { opacity: 0.18, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.55,
          duration: 0.45,
          repeat: -1,
          repeatDelay: 0.2
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div
        ref={orbRef}
        className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[var(--brand-lime)]/35 bg-[radial-gradient(circle,rgba(149,223,30,0.25),rgba(149,223,30,0.04))] shadow-[0_0_80px_rgba(149,223,30,0.18)]"
      >
        <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.9),rgba(149,223,30,0.25))]" />
      </div>
      <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]">
        Cee+ Jules
      </p>
      <h3 className="mt-3 text-[2rem] font-black text-white md:text-[2.4rem]">{title}</h3>
      <p className="mt-3 max-w-xl text-base leading-7 text-[var(--brand-silver)]">{subtitle}</p>
      <div className="mt-8 w-full max-w-lg space-y-3 rounded-[18px] border border-white/10 bg-white/4 p-5 text-left">
        {lines.map((line, index) => (
          <p
            key={line}
            ref={(node) => {
              lineRefs.current[index] = node;
            }}
            className="text-sm leading-6 text-[var(--brand-silver)]"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
