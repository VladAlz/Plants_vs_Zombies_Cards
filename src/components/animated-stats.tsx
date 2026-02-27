"use client";

import React, { useEffect, useMemo, useState } from "react";

type Stat = { label: string; value: number };

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export default function AnimatedStats({
  stats,
  durationMs = 900,
}: {
  stats: Stat[];
  durationMs?: number;
}) {
  // Para que la barra arranque en 0 y luego suba
  const [mounted, setMounted] = useState(false);

  // Para animar números (0 -> value)
  const [displayValues, setDisplayValues] = useState<number[]>(
    () => stats.map(() => 0)
  );

  const targets = useMemo(() => stats.map((s) => clamp(s.value)), [stats]);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);

      setDisplayValues(
        targets.map((to) => Math.round(to * progress))
      );

      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targets, durationMs]);

  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="bg-white border-4 border-black p-3 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="text-[11px] font-black uppercase opacity-60 leading-none mb-1 text-black">
            {s.label}
          </div>

          <div className="text-2xl font-black italic text-black tabular-nums">
            {displayValues[i]}
          </div>

          {/* Barra animada */}
          <div className="mt-2 h-3 border-2 border-black bg-white">
            <div
              className="h-full bg-[#18a118] transition-[width] ease-out"
              style={{
                width: mounted ? `${targets[i]}%` : "0%",
                transitionDuration: `${durationMs}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}