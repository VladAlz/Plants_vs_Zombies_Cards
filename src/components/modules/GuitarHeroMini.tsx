"use client";

import { useEffect, useRef, useState } from "react";

type Note = {
  id: number;
  lane: number;
  time: number;
  hit?: boolean;
};

const KEYS = ["a", "s", "d", "f", "g"];

const laneColors = [
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-400",
  "bg-blue-500",
  "bg-purple-500",
];

// 🎵 BEATMAP LEYENDA (más largo)
const beatmap: Omit<Note, "id">[] = [
  { time: 2.0, lane: 0 },
  { time: 2.5, lane: 1 },
  { time: 3.0, lane: 2 },
  { time: 3.5, lane: 3 },
  { time: 4.0, lane: 4 },

  { time: 6.0, lane: 1 },
  { time: 6.4, lane: 2 },
  { time: 6.8, lane: 3 },
  { time: 7.2, lane: 2 },
  { time: 7.6, lane: 1 },

  { time: 10.0, lane: 0 },
  { time: 10.3, lane: 2 },
  { time: 10.6, lane: 4 },
  { time: 10.9, lane: 2 },
  { time: 11.2, lane: 0 },

  { time: 14.0, lane: 4 },
  { time: 14.3, lane: 3 },
  { time: 14.6, lane: 2 },
  { time: 14.9, lane: 1 },
  { time: 15.2, lane: 0 },

  { time: 18.0, lane: 2 },
  { time: 18.3, lane: 3 },
  { time: 18.6, lane: 1 },
  { time: 18.9, lane: 4 },
  { time: 19.2, lane: 0 },

  { time: 22.0, lane: 0 },
  { time: 22.2, lane: 1 },
  { time: 22.4, lane: 2 },
  { time: 22.6, lane: 3 },
  { time: 22.8, lane: 4 },
];

export default function GuitarHeroPvZ() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [notes, setNotes] = useState<Note[]>([]);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [pressed, setPressed] = useState<number | null>(null);

  // 🎵 cargar beatmap
  useEffect(() => {
    setNotes(
      beatmap.map((n, i) => ({
        ...n,
        id: i,
      }))
    );
  }, []);

  // ⏱️ loop de tiempo
  useEffect(() => {
    if (!started) return;

    const loop = () => {
      if (audioRef.current) {
        setTime(audioRef.current.currentTime);
      }
      requestAnimationFrame(loop);
    };

    loop();
  }, [started]);

  // 🎮 teclado
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const lane = KEYS.indexOf(e.key.toLowerCase());
      if (lane === -1) return;

      setPressed(lane);
      judge(lane);
    };

    const up = () => setPressed(null);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [time, notes, combo]);

  // 🎯 sistema de hit
  const judge = (lane: number) => {
    const current = audioRef.current?.currentTime ?? 0;

    let bestIndex = -1;
    let bestDiff = Infinity;

    notes.forEach((note, i) => {
      if (note.hit || note.lane !== lane) return;

      const diff = Math.abs(note.time - current);

      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = i;
      }
    });

    if (bestIndex === -1) return miss();

    if (bestDiff <= 0.08) {
      hit(bestIndex, "Perfect", 300);
    } else if (bestDiff <= 0.18) {
      hit(bestIndex, "Good", 100);
    } else {
      miss();
    }
  };

  const hit = (index: number, text: string, base: number) => {
    setNotes((prev) => {
      const copy = [...prev];
      copy[index].hit = true;
      return copy;
    });

    const newCombo = combo + 1;
    const mult = 1 + Math.floor(newCombo / 10);

    setCombo(newCombo);
    setScore((s) => s + base * mult);

    setFeedback(text);
    setTimeout(() => setFeedback(""), 300);
  };

  const miss = () => {
    setCombo(0);
    setFeedback("Miss");
    setTimeout(() => setFeedback(""), 300);
  };

  // ▶️ start
  const startGame = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setStarted(true);
    setScore(0);
    setCombo(0);
  };

  const hitLineY = 420;

  return (
    <div className="w-full flex flex-col items-center text-white">
      <audio ref={audioRef} src="/audio/picina.mp3" preload="auto" />

      {/* HUD */}
      <div className="flex gap-6 mb-2 font-bold">
        <div>Score: {score}</div>
        <div>Combo: {combo}</div>
      </div>

      <div className="h-6 text-yellow-300 font-bold mb-2">
        {feedback}
      </div>

      {!started && (
        <button
          onClick={startGame}
          className="mb-4 px-6 py-3 bg-green-600 rounded-xl font-bold hover:bg-green-500"
        >
          🌱 Start Watery Graves
        </button>
      )}

      {/* TABLERO */}
      <div className="relative w-[420px] h-[500px] bg-black rounded-2xl overflow-hidden border-4 border-green-700">
        {/* línea de hit */}
        <div
          className="absolute left-0 w-full h-2 bg-yellow-400"
          style={{ top: hitLineY }}
        />

        {/* notas cayendo DESDE ARRIBA */}
        {notes.map((note) => {
          if (note.hit) return null;

          const y = (note.time - time) * 260 + hitLineY;

          if (y > 520 || y < -40) return null;

          return (
            <div
              key={note.id}
              className={`absolute w-14 h-6 rounded-lg ${
                laneColors[note.lane]
              } shadow-lg`}
              style={{
                left: note.lane * 84 + 10,
                top: y,
              }}
            />
          );
        })}

        {/* botones */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-around">
          {KEYS.map((k, i) => (
            <div
              key={k}
              className={`
                w-16 h-16 rounded-2xl
                border-4 border-white/40
                shadow-xl
                ${laneColors[i]}
                flex items-center justify-center
                font-bold text-white text-xl
                ${pressed === i ? "scale-90 brightness-150" : ""}
                transition
              `}
            >
              {k.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}