"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Vec = { x: number; y: number };
type Status = "playing" | "won" | "lost";

type Ghost = {
  id: number;
  pos: Vec;
  dir: Vec;
  color: string;
  // “memoria” para que no cambie de dirección cada micro-momento
  thinkCooldown: number;
};

const TILE = 34;

// Velocidad de Pac-Man (10 tiles/seg aprox)
const PAC_STEP = 1 / 10;

// Fantasmas MÁS LENTOS (menor velocidad => mayor step)
const GHOST_STEP = 1 / 6; // ~6 tiles/seg (más lento que pac)

// Limita dt para evitar saltos bruscos
const DT_CLAMP = 0.05;

// Mapa más robusto: se calcula w por la fila más larga
// # = pared, . = pellet, P = pacman, G = spawn fantasma (puedes poner varios G)
const RAW_MAP = [
  "#####################",
  "#P....#.............#",
  "#.##.#.####.####.##.#",
  "#....#....#....#....#",
  "####.####.#.####.####",
  "#...........#........#",
  "#.##.#####.###.##.####",
  "#....#...#..G..#..G..#",
  "#.####.#.#####.#.###.#",
  "#..G...#.......#..G..#",
  "#####################",
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
function manhattan(a: Vec, b: Vec) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function mul(v: Vec, s: number): Vec {
  return { x: v.x * s, y: v.y * s };
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function opposite(d: Vec): Vec {
  return { x: -d.x, y: -d.y };
}

function parseMap() {
  const h = RAW_MAP.length;
  const w = Math.max(...RAW_MAP.map((r) => r.length));

  let pac: Vec = { x: 1, y: 1 };
  const ghostSpawns: Vec[] = [];

  const walls = new Set<string>();
  const pellets = new Set<string>();

  for (let y = 0; y < h; y++) {
    const row = RAW_MAP[y] ?? "";
    for (let x = 0; x < w; x++) {
      const ch = row[x] ?? "#"; // si falta, lo tratamos como pared
      const key = `${x},${y}`;

      if (ch === "#") walls.add(key);
      if (ch === ".") pellets.add(key);
      if (ch === "P") pac = { x, y };
      if (ch === "G") ghostSpawns.push({ x, y });
    }
  }

  return { w, h, pac, ghostSpawns, walls, pellets };
}

export default function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const initial = useMemo(() => parseMap(), []);
  const walls = initial.walls;
  const W = initial.w;
  const H = initial.h;

  const [pac, setPac] = useState<Vec>(initial.pac);
  const [dir, setDir] = useState<Vec>({ x: 1, y: 0 });
  const [nextDir, setNextDir] = useState<Vec>({ x: 1, y: 0 });
  const [pellets, setPellets] = useState<Set<string>>(new Set(initial.pellets));
  const [score, setScore] = useState<number>(0);
  const [status, setStatus] = useState<Status>("playing");

  // 4 fantasmas (si el mapa trae menos spawns, se “rellena” cerca del primero)
  const [ghosts, setGhosts] = useState<Ghost[]>(() => createGhosts(initial));

  // Refs para loop estable
  const pacRef = useRef<Vec>(initial.pac);
  const dirRef = useRef<Vec>({ x: 1, y: 0 });
  const nextDirRef = useRef<Vec>({ x: 1, y: 0 });
  const pelletsRef = useRef<Set<string>>(new Set(initial.pellets));
  const ghostsRef = useRef<Ghost[]>(createGhosts(initial));
  const statusRef = useRef<Status>("playing");
  const scoreRef = useRef<number>(0);

  // acumuladores de tiempo independientes
  const lastRef = useRef<number>(performance.now());
  const pacAccRef = useRef<number>(0);
  const ghostAccRef = useRef<number>(0);

  function createGhosts(parsed: ReturnType<typeof parseMap>): Ghost[] {
    const colors = ["#ff4d6d", "#4dd7ff", "#ffb84d", "#b04dff"];
    const sp = [...parsed.ghostSpawns];

    // si no hay 4 spawns, intentamos colocar cerca del primero en casillas libres
    const base = sp[0] ?? { x: 10, y: 7 };
    const candidates: Vec[] = [
      base,
      add(base, { x: 1, y: 0 }),
      add(base, { x: -1, y: 0 }),
      add(base, { x: 0, y: 1 }),
      add(base, { x: 0, y: -1 }),
      add(base, { x: 2, y: 0 }),
      add(base, { x: 0, y: 2 }),
    ];

    const isFree = (v: Vec) => {
      if (v.x < 0 || v.y < 0 || v.x >= parsed.w || v.y >= parsed.h) return false;
      return !parsed.walls.has(keyOf(v));
    };

    // construir lista final de 4 spawns
    const finalSpawns: Vec[] = [];
    const seen = new Set<string>();
    for (const v of [...sp, ...candidates]) {
      const k = keyOf(v);
      if (!seen.has(k) && isFree(v)) {
        finalSpawns.push(v);
        seen.add(k);
      }
      if (finalSpawns.length >= 4) break;
    }
    while (finalSpawns.length < 4) finalSpawns.push(base);

    return finalSpawns.slice(0, 4).map((pos, i) => ({
      id: i,
      pos,
      dir: { x: i % 2 === 0 ? 1 : -1, y: 0 },
      color: colors[i],
      thinkCooldown: randInt(2, 6), // no “piensan” cada tick
    }));
  }

  // sincronizar refs
  useEffect(() => { pacRef.current = pac; }, [pac]);
  useEffect(() => { dirRef.current = dir; }, [dir]);
  useEffect(() => { nextDirRef.current = nextDir; }, [nextDir]);
  useEffect(() => { pelletsRef.current = pellets; }, [pellets]);
  useEffect(() => { ghostsRef.current = ghosts; }, [ghosts]);
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  function canMove(pos: Vec, d: Vec) {
    const n = add(pos, d);
    if (n.x < 0 || n.y < 0 || n.x >= W || n.y >= H) return false;
    return !walls.has(keyOf(n));
  }

  function reset() {
    const fresh = parseMap();

    setPac(fresh.pac);
    setDir({ x: 1, y: 0 });
    setNextDir({ x: 1, y: 0 });
    setPellets(new Set(fresh.pellets));
    setScore(0);
    setStatus("playing");

    const gs = createGhosts(fresh);
    setGhosts(gs);

    pacRef.current = fresh.pac;
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    pelletsRef.current = new Set(fresh.pellets);
    ghostsRef.current = gs;
    statusRef.current = "playing";
    scoreRef.current = 0;

    lastRef.current = performance.now();
    pacAccRef.current = 0;
    ghostAccRef.current = 0;
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

  // IA de fantasma “imperfecta”
  function ghostChooseMove(g: Ghost, pacPos: Vec): Vec {
    const g0 = g.pos;

    const dirs: Vec[] = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    const options = dirs.filter((d) => canMove(g0, d));

    if (options.length === 0) return g0;

    // Evitar reversa (casi siempre), para que se mueva “natural”
    const rev = opposite(g.dir);
    const filtered =
      options.length > 1
        ? options.filter((d) => !(d.x === rev.x && d.y === rev.y))
        : options;

    const choices = filtered.length ? filtered : options;

    // Probabilidad de perseguir (baja para que no parezca “GPS”)
    // Mientras más cerca está, un poquito más probable
    const dist = manhattan(g0, pacPos);
    const chaseProb = dist <= 4 ? 0.55 : dist <= 8 ? 0.4 : 0.25;

    const chase = Math.random() < chaseProb;

    if (!chase) {
      // patrulla / aleatorio con leve preferencia de seguir recto
      const straight = choices.find((d) => d.x === g.dir.x && d.y === g.dir.y);
      if (straight && Math.random() < 0.55) return add(g0, straight);

      const pick = choices[randInt(0, choices.length - 1)];
      return add(g0, pick);
    }

    // Chase “ruidoso”: apunta cerca de Pac-Man pero con error intencional
    // Esto da impresión de que “intenta” pero no sabe exacto.
    const noise: Vec = { x: randInt(-3, 3), y: randInt(-3, 3) };
    const target = add(pacPos, noise);

    let best = add(g0, choices[0]);
    let bestScore = Number.POSITIVE_INFINITY;

    for (const d of choices) {
      const n = add(g0, d);
      // métrica hacia target con pequeña aleatoriedad
      const s = manhattan(n, target) + Math.random() * 0.6;
      if (s < bestScore) {
        bestScore = s;
        best = n;
      }
    }
    return best;
  }

  // Render (canvas) con mejora visual
  const draw = () => {
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

    // sutil “grid”
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = "#ffffff";
    for (let x = 0; x <= W; x++) {
      ctx.beginPath();
      ctx.moveTo(x * TILE, 0);
      ctx.lineTo(x * TILE, height);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * TILE);
      ctx.lineTo(width, y * TILE);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // paredes (redondeadas)
    ctx.fillStyle = "#1f3b8f";
    walls.forEach((k) => {
      const [x, y] = k.split(",").map(Number);
      const rx = x * TILE;
      const ry = y * TILE;

      const r = 7;
      ctx.beginPath();
      ctx.moveTo(rx + r, ry);
      ctx.lineTo(rx + TILE - r, ry);
      ctx.quadraticCurveTo(rx + TILE, ry, rx + TILE, ry + r);
      ctx.lineTo(rx + TILE, ry + TILE - r);
      ctx.quadraticCurveTo(rx + TILE, ry + TILE, rx + TILE - r, ry + TILE);
      ctx.lineTo(rx + r, ry + TILE);
      ctx.quadraticCurveTo(rx, ry + TILE, rx, ry + TILE - r);
      ctx.lineTo(rx, ry + r);
      ctx.quadraticCurveTo(rx, ry, rx + r, ry);
      ctx.closePath();
      ctx.fill();
    });

    // pellets
    ctx.fillStyle = "rgba(245,245,245,0.95)";
    pelletsRef.current.forEach((k) => {
      const [x, y] = k.split(",").map(Number);
      const cx = x * TILE + TILE / 2;
      const cy = y * TILE + TILE / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Pac-Man (con boca)
    const p = pacRef.current;
    const px = p.x * TILE + TILE / 2;
    const py = p.y * TILE + TILE / 2;

    const d = dirRef.current;
    const mouth = 0.38;
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

    // Fantasmas (4) + ojos
    for (const g of ghostsRef.current) {
      const gx = g.pos.x * TILE + TILE / 2;
      const gy = g.pos.y * TILE + TILE / 2;

      // cuerpo
      ctx.fillStyle = g.color;
      ctx.beginPath();
      ctx.arc(gx, gy, TILE * 0.44, Math.PI, 0);
      ctx.lineTo(gx + TILE * 0.44, gy + TILE * 0.46);

      // “onditas” abajo
      const waves = 4;
      const w = (TILE * 0.88) / waves;
      for (let i = 0; i < waves; i++) {
        const wx = gx + TILE * 0.44 - w * (i + 0.5);
        ctx.quadraticCurveTo(wx, gy + TILE * 0.34, wx - w / 2, gy + TILE * 0.46);
      }
      ctx.closePath();
      ctx.fill();

      // ojos
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(gx - TILE * 0.14, gy - TILE * 0.08, TILE * 0.12, 0, Math.PI * 2);
      ctx.arc(gx + TILE * 0.14, gy - TILE * 0.08, TILE * 0.12, 0, Math.PI * 2);
      ctx.fill();

      // pupilas (mirando un poquito hacia su dirección)
      const look = mul(g.dir, TILE * 0.05);
      ctx.fillStyle = "#0b1220";
      ctx.beginPath();
      ctx.arc(gx - TILE * 0.14 + look.x, gy - TILE * 0.08 + look.y, TILE * 0.055, 0, Math.PI * 2);
      ctx.arc(gx + TILE * 0.14 + look.x, gy - TILE * 0.08 + look.y, TILE * 0.055, 0, Math.PI * 2);
      ctx.fill();
    }

    // overlay fin
    if (statusRef.current !== "playing") {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 34px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        statusRef.current === "won" ? "¡GANASTE!" : "PERDISTE (como tu ultima relación) :(",
        width / 2,
        height / 2 - 12
      );

      ctx.font = "18px sans-serif";
      ctx.fillText("Presiona Reiniciar", width / 2, height / 2 + 22);
    }
  };

  // Game loop (estable, no depende de pellets en deps)
  useEffect(() => {
    let raf = 0;

    const tick = (now: number) => {
      const rawDt = (now - lastRef.current) / 1000;
      const dt = Math.min(rawDt, DT_CLAMP);
      lastRef.current = now;

      if (statusRef.current === "playing") {
        pacAccRef.current += dt;
        ghostAccRef.current += dt;

        // ---- PAC MAN ----
        while (pacAccRef.current >= PAC_STEP) {
          pacAccRef.current -= PAC_STEP;

          const p0 = pacRef.current;
          let cd = dirRef.current;

          // girar si se puede
          if (canMove(p0, nextDirRef.current)) {
            cd = nextDirRef.current;
            dirRef.current = cd;
            setDir(cd);
          }

          // mover
          if (canMove(p0, cd)) {
            const p1 = add(p0, cd);
            pacRef.current = p1;
            setPac(p1);

            // comer pellet
            const k = keyOf(p1);
            if (pelletsRef.current.has(k)) {
              const np = new Set(pelletsRef.current);
              np.delete(k);
              pelletsRef.current = np;
              setPellets(np);

              scoreRef.current += 10;
              setScore(scoreRef.current);

              if (np.size === 0) {
                statusRef.current = "won";
                setStatus("won");
              }
            }
          }

          // colisión (si pac se mete encima)
          for (const g of ghostsRef.current) {
            if (equal(pacRef.current, g.pos)) {
              statusRef.current = "lost";
              setStatus("lost");
              break;
            }
          }
          if (statusRef.current !== "playing") break;
        }

        // ---- GHOSTS (más lentos) ----
        while (ghostAccRef.current >= GHOST_STEP && statusRef.current === "playing") {
          ghostAccRef.current -= GHOST_STEP;

          const pacPos = pacRef.current;

          const nextGhosts = ghostsRef.current.map((g) => {
            let ng = { ...g };

            // “pensar” solo cada ciertos movimientos
            if (ng.thinkCooldown > 0) {
              ng.thinkCooldown -= 1;
            } else {
              ng.thinkCooldown = randInt(2, 6);
              // elegir nueva dirección en base a la IA imperfecta
              const nextPos = ghostChooseMove(ng, pacPos);
              const nd = clampDir({ x: nextPos.x - ng.pos.x, y: nextPos.y - ng.pos.y });
              if (nd.x !== 0 || nd.y !== 0) ng.dir = nd;
              ng.pos = nextPos;
              return ng;
            }

            // si no “piensa”, intenta seguir recto; si no puede, elige otra
            if (canMove(ng.pos, ng.dir)) {
              ng.pos = add(ng.pos, ng.dir);
            } else {
              const dirs: Vec[] = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 },
              ];
              const opts = dirs.filter((d) => canMove(ng.pos, d));
              const pick = opts.length ? opts[randInt(0, opts.length - 1)] : { x: 0, y: 0 };
              ng.dir = pick;
              ng.pos = add(ng.pos, pick);
            }

            return ng;
          });

          ghostsRef.current = nextGhosts;
          setGhosts(nextGhosts);

          // colisión tras mover fantasmas
          for (const g of nextGhosts) {
            if (equal(g.pos, pacRef.current)) {
              statusRef.current = "lost";
              setStatus("lost");
              break;
            }
          }
        }
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3">
          <span> Pac-Man: 4K Full Link Mediafire sin virus 1 link.</span>
          <span className="text-sm font-semibold">Score: {score}</span>
        </CardTitle>
        <CardDescription>
          Controles: Flechas o WASD. Obten todos los puntos y evita ser atrapado por los fantasmas.
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

        <div className="w-full overflow-auto rounded-lg border bg-background p-4">
          <canvas ref={canvasRef} className="block mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}