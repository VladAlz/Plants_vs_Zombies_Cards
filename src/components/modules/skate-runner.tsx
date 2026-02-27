"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Obstacle = { x: number; w: number; h: number };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function SkateRunner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number>(0);

  const runningRef = useRef(false);

  const scoreRef = useRef(0);
  const speedRef = useRef(260);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const spawnTimerRef = useRef(0);

  const groundYRef = useRef(0);
  const playerRef = useRef({
    x: 110,
    y: 0,
    w: 44,
    h: 44,
    vy: 0,
    jumpsUsed: 0,
  });

  const [ui, setUi] = useState({
    running: false,
    paused: false,
    score: 0,
    dead: false,
  });

  const colors = useMemo(
    () => ({
      sky: "#7dd3fc",
      ground: "#53B558" ,
      ground2: "#f59e0b",
      player: "#075BBA",
      player2: "#075BBA",
      obstacle: "#94a3b8",
      obstacle2: "#475569",
      text: "#0f172a",
      white: "#ffffff",
    }),
    []
  );

  const reset = () => {
    scoreRef.current = 0;
    speedRef.current = 260;
    obstaclesRef.current = [];
    spawnTimerRef.current = 0;

    const p = playerRef.current;
    p.vy = 0;
    p.jumpsUsed = 0;

    setUi((prev) => ({ ...prev, score: 0 }));
  };

  const crash = () => {
    runningRef.current = false;
    setUi((p) => ({ ...p, running: false, paused: false, dead: true }));
  };

  const jump = () => {
    if (!runningRef.current || ui.dead) return;

    const p = playerRef.current;
    if (p.jumpsUsed >= 2) return;

    const impulse = p.jumpsUsed === 0 ? 520 : 460;
    p.vy = -impulse;
    p.jumpsUsed += 1;
  };

  const stopLoop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    runningRef.current = false;
  };

  const startLoop = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastTRef.current = 0;
    setUi({ running: true, paused: false, score: 0, dead: false });
    rafRef.current = requestAnimationFrame(loop);
  };

  const restart = () => {
    reset();
    setUi({ running: true, paused: false, score: 0, dead: false });
    runningRef.current = true;
    lastTRef.current = 0;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(loop);
    }
  };


  const pause = () => {
    if (!runningRef.current) return;
    runningRef.current = false;
    setUi((p) => ({ ...p, running: false, paused: true }));
  };

  const resume = () => {
    if (runningRef.current) return;
    if (!ui.paused) return;
    runningRef.current = true;
    lastTRef.current = 0; // para que no pegue un salto raro en dt
    setUi((p) => ({ ...p, running: true, paused: false }));
  };

  const aabb = (ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) =>
    ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

  const spawnObstacle = (cw: number) => {
    const w = 34 + Math.random() * 26;
    const h = 26 + Math.random() * 28;
    const x = cw + 20;
    obstaclesRef.current.push({ x, w, h });
  };

  const update = (dt: number, cw: number, ch: number) => {
    if (!runningRef.current) return;

    scoreRef.current += dt * 10;
    speedRef.current += dt * 12;

    const groundY = groundYRef.current;
    const p = playerRef.current;

    const gravity = 1400;
    p.vy += gravity * dt;
    p.y += p.vy * dt;

    const playerBottom = p.y + p.h;
    if (playerBottom >= groundY - 8) {
      p.y = groundY - 8 - p.h;
      p.vy = 0;
      p.jumpsUsed = 0;
    }

    const baseSpawn = 1.15;
    const spawnEvery = clamp(baseSpawn - (speedRef.current - 260) / 1200, 0.45, 1.15);
    spawnTimerRef.current += dt;
    if (spawnTimerRef.current >= spawnEvery) {
      spawnTimerRef.current = 0;
      spawnObstacle(cw);
    }

    const speed = speedRef.current;
    const obs = obstaclesRef.current;
    for (const o of obs) o.x -= speed * dt;
    while (obs.length && obs[0].x + obs[0].w < -20) obs.shift();

    for (const o of obs) {
      const oy = groundY - o.h;
      if (aabb(p.x, p.y, p.w, p.h, o.x, oy, o.w, o.h)) {
        crash();
        break;
      }
    }

    const s = Math.floor(scoreRef.current);
    if (s !== ui.score) setUi((prev) => ({ ...prev, score: s }));
  };

  const draw = (ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
    // sky
    ctx.fillStyle = colors.sky;
    ctx.fillRect(0, 0, cw, ch);

    // clouds
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = colors.white;
    for (let i = 0; i < 6; i++) {
      const cx = (i * cw) / 6 + ((scoreRef.current * 0.5) % 140) - 120;
      const cy = 50 + (i % 3) * 18;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 40, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // ground
    const groundH = Math.max(90, Math.floor(ch * 0.22));
    const groundY = ch - groundH;
    groundYRef.current = groundY;

    ctx.fillStyle = colors.ground;
    ctx.fillRect(0, groundY, cw, groundH);

    ctx.globalAlpha = 0.22;
    ctx.fillStyle = colors.ground2;
    for (let x = 0; x < cw; x += 50) {
      ctx.beginPath();
      ctx.arc(x + ((scoreRef.current * 2) % 50), groundY + 22, 18, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // obstacles
    for (const o of obstaclesRef.current) {
      const oy = groundY - o.h;
      ctx.fillStyle = colors.obstacle;
      ctx.fillRect(o.x, oy, o.w, o.h);
      ctx.strokeStyle = colors.obstacle2;
      ctx.lineWidth = 3;
      ctx.strokeRect(o.x, oy, o.w, o.h);
    }

    // player
    const p = playerRef.current;
    const px = p.x;
    const py = p.y;

    // board
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(px - 6, py + p.h - 10, p.w + 12, 8);

    // wheels
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(px + 6, py + p.h + 2, 5, 0, Math.PI * 2);
    ctx.arc(px + p.w - 6, py + p.h + 2, 5, 0, Math.PI * 2);
    ctx.fill();

    // body (sin roundRect para evitar incompatibilidades) [web:90]
    ctx.fillStyle = colors.player;
    ctx.fillRect(px, py, p.w, p.h);
    ctx.strokeStyle = colors.player2;
    ctx.lineWidth = 3;
    ctx.strokeRect(px, py, p.w, p.h);

    // pause overlay
    if (ui.paused) {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = "#fff";
      ctx.font = "900 28px Inter, system-ui, sans-serif";
      ctx.fillText("PAUSA", 14, ch / 2);
    }
  };

  const loop = (t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    const cw = parent ? parent.clientWidth : 900;
    const ch = parent ? parent.clientHeight : 520;

    if (canvas.width !== Math.floor(cw * devicePixelRatio) || canvas.height !== Math.floor(ch * devicePixelRatio)) {
      canvas.width = Math.floor(cw * devicePixelRatio);
      canvas.height = Math.floor(ch * devicePixelRatio);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    if (!lastTRef.current) lastTRef.current = t;
    const dt = clamp((t - lastTRef.current) / 1000, 0, 0.033);
    lastTRef.current = t;

    update(dt, cw, ch);
    draw(ctx, cw, ch);

    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointer = () => jump();
    canvas.addEventListener("pointerdown", onPointer);

    return () => {
      canvas.removeEventListener("pointerdown", onPointer);
      stopLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Canvas */}
      <div className="absolute inset-0 border-4 border-black bg-white rounded-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* HUD top */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
        <div className="pointer-events-auto text-xs font-black uppercase tracking-widest text-black/70 bg-white/80 border-2 border-black px-3 py-2">
          Mini-juego: Skate Runner — Score: {ui.score}
        </div>

        {(ui.running || ui.paused) && (
          <Button
            onClick={() => (ui.running ? pause() : resume())}
            className="pointer-events-auto rounded-none border-4 border-black font-black uppercase italic h-10 w-12 p-0"
          >
            {ui.running ? "||" : "▶"}
          </Button>
        )}
      </div>

      {/* Start centrado */}
      {!ui.running && !ui.paused && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={() => {
              reset();
              startLoop();
            }}
            className="rounded-none border-4 border-black font-black uppercase italic px-10 py-8 text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            START
          </Button>
        </div>
      )}

      {ui.dead && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-white gap-4">
          <div className="text-center px-6">
            <div className="text-4xl md:text-5xl font-black uppercase italic drop-shadow">
              MALO (No eres bueno para ella y vas a ser bueno para los videojuegos)
            </div>
            <div className="mt-2 text-sm font-bold opacity-80 uppercase tracking-widest"><br />
              Score final: {ui.score}
            </div>
            <div className="mt-4 text-base font-bold opacity-90"><br />
              Presiona Reiniciar
            </div>
          </div>

          <Button
            onClick={restart}
            className="rounded-none border-4 border-black font-black uppercase italic px-10 py-6 text-xl bg-[#76ff03] hover:bg-[#64dd17] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Reiniciar
          </Button>
        </div>
      )}
    </div>
  );
}
