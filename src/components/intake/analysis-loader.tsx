"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function AnalysisLoader({
  lines,
  title,
  subtitle,
  rtl = false
}: {
  lines: string[];
  title: string;
  subtitle: string;
  rtl?: boolean;
}) {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const iconRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tickRefs = useRef<Array<SVGPathElement | null>>([]);

  useLayoutEffect(() => {
    if (document.body.dataset.a11yMotion === "reduced") {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.06,
          opacity: 1,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotate: 360,
          duration: 3.8,
          repeat: -1,
          ease: "none"
        });
      }

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { width: "0%" },
          { width: "100%", duration: 5.2, ease: "power2.inOut" }
        );
      }

      lineRefs.current.forEach((line, index) => {
        const icon = iconRefs.current[index];
        const tick = tickRefs.current[index];
        if (!line || !icon || !tick) {
          return;
        }

        timeline
          .fromTo(
            line,
            { opacity: 0.18, y: 10 },
            { opacity: 0.58, y: 0, duration: 0.42, ease: "power2.out" },
            index === 0 ? 0.2 : "+=0.28"
          )
          .fromTo(
            icon,
            { scale: 0.88, borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(0,0,0,0.16)" },
            {
              scale: 1.02,
              borderColor: "rgba(149,223,30,0.38)",
              backgroundColor: "rgba(149,223,30,0.1)",
              duration: 0.28
            },
            "<"
          )
          .to(
            icon,
            {
              backgroundColor: "rgba(149,223,30,1)",
              borderColor: "rgba(149,223,30,1)",
              duration: 0.36
            },
            "+=0.42"
          )
          .fromTo(
            tick,
            { opacity: 0, strokeDashoffset: 18 },
            { opacity: 1, strokeDashoffset: 0, duration: 0.28, ease: "power2.out" },
            "<"
          )
          .to(
            line,
            { opacity: 1, color: "var(--brand-off-white)", duration: 0.25, ease: "power2.out" },
            "<"
          );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className={[
        "flex min-h-[420px] flex-col justify-center",
        rtl ? "items-end text-right" : "items-start text-left"
      ].join(" ")}
    >
      <div
        ref={orbRef}
        className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[var(--brand-lime)]/35 bg-[radial-gradient(circle,rgba(149,223,30,0.25),rgba(149,223,30,0.04))] shadow-[0_0_80px_rgba(149,223,30,0.18)]"
      >
        <div
          ref={ringRef}
          className="absolute inset-2 rounded-full border border-dashed border-[var(--brand-lime)]/30"
        />
        <div className="h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(149,223,30,0.9),rgba(149,223,30,0.25))]" />
      </div>
      <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-lime)]">
        Cee+ Jules
      </p>
      <h3 className="mt-3 text-[2rem] font-black text-white md:text-[2.4rem]">{title}</h3>
      <p className="mt-3 max-w-xl text-base leading-7 text-[var(--brand-silver)]">{subtitle}</p>
      <div className="mt-6 h-1.5 w-full max-w-lg overflow-hidden rounded-full border border-white/10 bg-white/5">
        <div
          ref={progressRef}
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-lime),var(--brand-lime-bright))] shadow-[0_0_20px_rgba(149,223,30,0.35)]"
        />
      </div>
      <div
        className={[
          "mt-8 w-full max-w-lg space-y-3 rounded-[18px] border border-white/10 bg-white/4 p-5",
          rtl ? "text-right" : "text-left"
        ].join(" ")}
      >
        {lines.map((line, index) => (
          <div
            key={line}
            className={[
              "flex items-center gap-3",
              rtl ? "flex-row-reverse justify-end text-right" : "justify-start text-left"
            ].join(" ")}
          >
            <span
              ref={(node) => {
                iconRefs.current[index] = node;
              }}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/20"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                <path
                  ref={(node) => {
                    tickRefs.current[index] = node;
                    if (node) {
                      node.style.strokeDasharray = "18";
                      node.style.strokeDashoffset = "18";
                    }
                  }}
                  d="M3 8.5 6.4 11.6 13 5"
                  fill="none"
                  stroke="#070707"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p
              ref={(node) => {
                lineRefs.current[index] = node;
              }}
              className="text-sm leading-6 text-[var(--brand-silver)]"
            >
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
