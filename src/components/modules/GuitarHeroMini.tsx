'use client';

import { useEffect, useRef, useState } from 'react';

type Note = {
  id: number;
  lane: number;
  time: number;
  duration?: number; // HOLD notes
  hit?: boolean;
};

const LANES = ['A', 'S', 'D', 'F', 'G'];
const KEYS = ['a', 's', 'd', 'f', 'g'];

const NOTE_SPEED = 320;
const HIT_LINE_OFFSET = 120;

const PERFECT = 100;
const GOOD = 200;

export default function GuitarHeroMini() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [mult, setMult] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [energy, setEnergy] = useState(0);
  const [pressed, setPressed] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);

  // 🎵 Chart modo GOD (mezcla de taps y holds)
  const chart: Note[] = [
    { id: 1, lane: 0, time: 2 },
    { id: 2, lane: 2, time: 2.6 },
    { id: 3, lane: 4, time: 3.2, duration: 1.2 },
    { id: 4, lane: 1, time: 4.2 },
    { id: 5, lane: 3, time: 4.8 },
    { id: 6, lane: 0, time: 5.4, duration: 1.5 },
    { id: 7, lane: 2, time: 7 },
    { id: 8, lane: 4, time: 7.6 },
    { id: 9, lane: 1, time: 8.2, duration: 1 },
    { id: 10, lane: 3, time: 9 },
  ];

  // 🎬 game loop
  useEffect(() => {
    const loop = () => {
      if (audioRef.current && !audioRef.current.paused) {
        setTime(audioRef.current.currentTime);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // 🎮 teclado
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const lane = KEYS.indexOf(e.key.toLowerCase());
      if (lane === -1) return;

      setPressed(lane);
      judge(lane);
    };

    const up = () => setPressed(null);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [notes, combo, mult]);

  const judge = (lane: number) => {
    const currentTime = audioRef.current?.currentTime ?? 0;

    let bestIndex = -1;
    let bestDiff = Infinity;

    notes.forEach((note, i) => {
      if (note.hit || note.lane !== lane) return;
      const diff = Math.abs(note.time - currentTime) * 1000;
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = i;
      }
    });

    if (bestIndex === -1) return miss();

    if (bestDiff <= PERFECT) {
      hit(bestIndex, 'Perfect', 300);
    } else if (bestDiff <= GOOD) {
      hit(bestIndex, 'Good', 100);
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
    const newMult = 1 + Math.floor(newCombo / 10);

    setCombo(newCombo);
    setMult(newMult);
    setScore((s) => s + base * newMult);
    setEnergy((e) => Math.min(100, e + 5));

    setFeedback(text);
    setTimeout(() => setFeedback(''), 300);
  };

  const miss = () => {
    setCombo(0);
    setMult(1);
    setEnergy((e) => Math.max(0, e - 10));
    setFeedback('Miss');
    setTimeout(() => setFeedback(''), 300);
  };

  const startGame = () => {
    if (!audioRef.current) return;
    setNotes(chart);
    setScore(0);
    setCombo(0);
    setMult(1);
    setEnergy(0);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-900 to-emerald-900 rounded-xl p-4 text-white">
      {/* HUD */}
      <div className="flex gap-6 mb-3 font-bold">
        <div>Score: {score}</div>
        <div>Combo: {combo}</div>
        <div>x{mult}</div>
      </div>

      {/* energy bar */}
      <div className="w-full max-w-md h-3 bg-black rounded mb-2 overflow-hidden">
        <div
          className="h-full bg-green-400 transition-all"
          style={{ width: `${energy}%` }}
        />
      </div>

      <div className="text-yellow-300 h-5 mb-2">{feedback}</div>

      {/* tablero */}
      <div className="relative w-full max-w-md h-[420px] bg-black rounded-lg overflow-hidden border-4 border-green-600">
        {/* hit line */}
        <div
          className="absolute left-0 w-full h-2 bg-yellow-400"
          style={{ bottom: HIT_LINE_OFFSET }}
        />

        {/* lanes */}
        <div className="absolute inset-0 grid grid-cols-5">
          {LANES.map((k, i) => (
            <div
              key={i}
              className={`border-x border-gray-700 flex items-end justify-center pb-2 text-xs
                ${pressed === i ? 'bg-green-900/40' : ''}`}
            >
              {k}
            </div>
          ))}
        </div>

        {/* notes */}
        {notes.map((note) => {
          if (note.hit) return null;

          const y = (note.time - time) * NOTE_SPEED + HIT_LINE_OFFSET;
          if (y < -60) return null;

          const height = note.duration
            ? note.duration * NOTE_SPEED
            : 16;

          return (
            <div
              key={note.id}
              className="absolute w-[20%] flex justify-center"
              style={{
                left: `${note.lane * 20}%`,
                bottom: y,
              }}
            >
              <div
                className="w-10 bg-green-400 rounded-md shadow-lg shadow-green-500/50"
                style={{ height }}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={startGame}
        className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold"
      >
        🧟‍♂️ Start Watery Graves
      </button>

      <audio ref={audioRef} src="/audio/watery-graves.mp3" />
    </div>
  );
}