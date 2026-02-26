"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Vec = { x: number; y: number };

const TILE = 34; // 👈 MÁS GRANDE (antes 24)
const STEP = 1 / 10; // 10 tiles por segundo

// Mapa: # = pared, . = pellet, P = inicio pacman, G = inicio fantasma
const RAW_MAP = [
  "####################",
  "#P....#.............#",
  "#.##.#.####.####.##.#",
  "#....#....#....#....#",
  "####.####.#.####.####",
  "#...........#........#",
  "#.##.#####.###.##.####",
  "#....#...#..G..#.....#",
  "#.####.#.#####.#.###.#",
  "#......#.......#.....#",
  "####################",
];

function keyOf(v: Vec) {
  return `${v.x},${v.y}`;
}

function add(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y };
}

function equal(a: Vec, b: Vec) {
  return a.x === b.x && a.y === b.y;
}

function clampDir(d: Vec): Vec {
  if (d.x > 0) return { x: 1, y: 0 };
  if (d.x < 0) return { x: -1, y: 0 };
  if (d.y > 0) return { x: 0, y: 1 };
  if (d.y < 0) return { x: 0, y: -1 };
  return { x: 0, y: 0 };
}

function parseMap() {
  const h = RAW_MAP.length;
  const w = RAW_MAP[0].length;

  let pac: Vec = { x: 1, y: 1 };
  let ghost: Vec = { x: 1, y: 1 };

  const walls = new Set<string>();
  const pellets = new Set<string>();

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ch = RAW_MAP[y][x];
      const key = `${x},${y}`;

      if (ch === "#") walls.add(key);
      if (ch === ".") pellets.add(key);
      if (ch === "P") pac = { x, y };
      if (ch === "G") ghost = { x, y };
    }
  }

  return { w, h, pac, ghost, walls, pellets };
}

export default function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const initial = useMemo(() => parseMap(), []);
  const walls = initial.walls;
  const W = initial.w;
  const H = initial.h;

  const [pac, setPac] = useState<Vec>(initial.pac);
  const [ghost, setGhost] = useState<Vec>(initial.ghost);
  const [dir, setDir] = useState<Vec>({ x: 1, y: 0 });
  const [nextDir, setNextDir] = useState<Vec>({ x: 1, y: 0 });
  const [pellets, setPellets] = useState<Set<string>>(new Set(initial.pellets));
  const [score, setScore] = useState<number>(0);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  // ✅ Refs para evitar "estado viejo" en el loop
  const pacRef = useRef<Vec>(initial.pac);
  const ghostRef = useRef<Vec>(initial.ghost);
  const dirRef = useRef<Vec>({ x: 1, y: 0 });
  const nextDirRef = useRef<Vec>({ x: 1, y: 0 });
  const statusRef = useRef<"playing" | "won" | "lost">("playing");

  // ✅ Control del tiempo del loop (para evitar salto al inicio/reiniciar)
  const lastRef = useRef<number>(performance.now());
  const accRef = useRef<number>(0);

  // mantener refs sincronizados
  useEffect(() => {
    pacRef.current = pac;
  }, [pac]);
  useEffect(() => {
    ghostRef.current = ghost;
  }, [ghost]);
  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);
  useEffect(() => {
    nextDirRef.current = nextDir;
  }, [nextDir]);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  function canMove(pos: Vec, d: Vec) {
    const n = add(pos, d);
    if (n.x < 0 || n.y < 0 || n.x >= W || n.y >= H) return false;
    return !walls.has(keyOf(n));
  }

  function reset() {
    const fresh = parseMap();

    setPac(fresh.pac);
    setGhost(fresh.ghost);
    setDir({ x: 1, y: 0 });
    setNextDir({ x: 1, y: 0 });
    setPellets(new Set(fresh.pellets));
    setScore(0);
    setStatus("playing");

    // ✅ reiniciar refs también
    pacRef.current = fresh.pac;
    ghostRef.current = fresh.ghost;
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    statusRef.current = "playing";

    // ✅ reiniciar tiempo (evita pérdida instantánea al reiniciar)
    lastRef.current = performance.now();
    accRef.current = 0;
  }

  // Controles teclado
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      let nd: Vec | null = null;

      if (k === "arrowup" || k === "w") nd = { x: 0, y: -1 };
      if (k === "arrowdown" || k === "s") nd = { x: 0, y: 1 };
      if (k === "arrowleft" || k === "a") nd = { x: -1, y: 0 };
      if (k === "arrowright" || k === "d") nd = { x: 1, y: 0 };

      if (nd) {
        e.preventDefault();
        const c = clampDir(nd);
        setNextDir(c);
        nextDirRef.current = c;
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
  }, []);

  // Render (canvas)
  const draw = (pelletsSnapshot: Set<string>) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const width = W * TILE;
    const height = H * TILE;
    if (c.width !== width) c.width = width;
    if (c.height !== height) c.height = height;

    // fondo
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, width, height);

    // paredes
    ctx.fillStyle = "#1f3b8f";
    walls.forEach((k) => {
      const [x, y] = k.split(",").map(Number);
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
    });

    // pellets
    ctx.fillStyle = "#f5f5f5";
    pelletsSnapshot.forEach((k) => {
      const [x, y] = k.split(",").map(Number);
      const cx = x * TILE + TILE / 2;
      const cy = y * TILE + TILE / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // pacman
    const p = pacRef.current;
    const px = p.x * TILE + TILE / 2;
    const py = p.y * TILE + TILE / 2;

    const d = dirRef.current;
    const mouth = 0.35;
    let angle = 0;
    if (d.x === 1) angle = 0;
    if (d.x === -1) angle = Math.PI;
    if (d.y === 1) angle = Math.PI / 2;
    if (d.y === -1) angle = -Math.PI / 2;

    ctx.fillStyle = "#ffd21f";
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, TILE * 0.44, angle + mouth, angle + Math.PI * 2 - mouth);
    ctx.closePath();
    ctx.fill();

    // fantasma
    const g = ghostRef.current;
    const gx = g.x * TILE + TILE / 2;
    const gy = g.y * TILE + TILE / 2;
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.arc(gx, gy, TILE * 0.44, Math.PI, 0);
    ctx.lineTo(gx + TILE * 0.44, gy + TILE * 0.44);
    ctx.lineTo(gx - TILE * 0.44, gy + TILE * 0.44);
    ctx.closePath();
    ctx.fill();

    // overlay fin
    if (statusRef.current !== "playing") {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 34px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        statusRef.current === "won" ? "¡GANASTE!" : "PERDISTE :(",
        width / 2,
        height / 2 - 12
      );

      ctx.font = "18px sans-serif";
      ctx.fillText("Presiona Reiniciar", width / 2, height / 2 + 22);
    }
  };

  // Game loop
  useEffect(() => {
    let raf = 0;

    const tick = (now: number) => {
      // ✅ clamp de dt para evitar saltos gigantes
      const rawDt = (now - lastRef.current) / 1000;
      const dt = Math.min(rawDt, 0.05); // máximo 50ms
      lastRef.current = now;

      // ✅ limitar acumulación (por pestaña congelada)
      accRef.current = Math.min(accRef.current + dt, 0.25);

      // ✅ limitar pasos por frame
      let steps = 0;
      const MAX_STEPS_PER_FRAME = 5;

      if (statusRef.current === "playing") {
        while (accRef.current >= STEP && steps < MAX_STEPS_PER_FRAME) {
          accRef.current -= STEP;
          steps++;

          // PACMAN
          const p0 = pacRef.current;
          let cd = dirRef.current;

          // girar si se puede
          if (canMove(p0, nextDirRef.current)) {
            cd = nextDirRef.current;
            dirRef.current = cd;
            setDir(cd);
          }

          // mover si se puede
          let p1 = p0;
          if (canMove(p0, cd)) {
            p1 = add(p0, cd);
            pacRef.current = p1;
            setPac(p1);

            // comer pellet
            setPellets((prev) => {
              const np = new Set(prev);
              const k = keyOf(p1);
              if (np.has(k)) {
                np.delete(k);
                setScore((s) => s + 10);
              }
              if (np.size === 0) {
                statusRef.current = "won";
                setStatus("won");
              }
              return np;
            });
          }

          // GHOST (sigue a pacman)
          const g0 = ghostRef.current;
          const options: Vec[] = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 },
          ].filter((d2) => canMove(g0, d2));

          let best = g0;
          let bestDist = Number.POSITIVE_INFINITY;
          for (const d2 of options) {
            const n = add(g0, d2);
            const dist = Math.abs(n.x - pacRef.current.x) + Math.abs(n.y - pacRef.current.y);
            if (dist < bestDist) {
              bestDist = dist;
              best = n;
            }
          }
          ghostRef.current = best;
          setGhost(best);

          // colisión inmediata después de mover ambos
          if (equal(pacRef.current, ghostRef.current)) {
            statusRef.current = "lost";
            setStatus("lost");
          }
        }
      }

      // dibujar con el estado actual
      draw(pellets);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pellets]);

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span>🎮 Pac-Man (demo)</span>
          <span className="text-sm font-semibold">Score: {score}</span>
        </CardTitle>
        <CardDescription>
          Controles: Flechas o WASD. Come todos los puntos y evita al fantasma.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button onClick={reset} variant="default">
            Reiniciar
          </Button>
          <div className="text-sm text-muted-foreground">
            Estado: <span className="font-semibold">{status}</span>
          </div>
        </div>

        {/* ✅ Más grande: card más ancha + canvas más grande por TILE */}
        <div className="w-full overflow-auto rounded-lg border bg-background p-4">
          <canvas ref={canvasRef} className="block mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}