"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const gameSpeed = useRef(120);
  const gameRunning = useRef(true);

  const moveSnake = useCallback(() => {
    if (!gameRunning.current) return;
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (head.x < 0 || head.x >= 25 || head.y < 0 || head.y >= 25 || 
        snake.some(s => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      return;
    }

    let newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 10);
      setFood({ x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25) });
      if (gameSpeed.current > 80) gameSpeed.current -= 2;
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }, [snake, direction, food]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const dirs: Record<string, {x: number, y: number}> = {
        'ArrowUp': {x:0,y:-1}, 'w': {x:0,y:-1},
        'ArrowDown': {x:0,y:1}, 's': {x:0,y:1},
        'ArrowLeft': {x:-1,y:0}, 'a': {x:-1,y:0},
        'ArrowRight': {x:1,y:0}, 'd': {x:1,y:0}
      };
      const newDir = dirs[e.key.toLowerCase()];
      if (newDir && (newDir.x * -1 !== direction.x || newDir.y * -1 !== direction.y)) {
        setDirection(newDir);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction]);

  useEffect(() => {
    const id = setInterval(moveSnake, gameSpeed.current);
    return () => clearInterval(id);
  }, [moveSnake, gameSpeed.current]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 500, 500);

    // Fondo césped
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, '#4caf50');
    gradient.addColorStop(1, '#2e7d32');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 500);

    // Líneas jardín (SOLO área de juego)
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 20, 0);
      ctx.lineTo(i * 20, 500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * 20);
      ctx.lineTo(500, i * 20);
      ctx.stroke();
    }

    // Serpiente 3D
    snake.forEach((s, i) => {
      const gradient = ctx.createRadialGradient(s.x*20+10, s.y*20+10, 0, s.x*20+10, s.y*20+10, 18);
      gradient.addColorStop(0, i === 0 ? '#81c784' : '#66bb6a');
      gradient.addColorStop(1, i === 0 ? '#4caf50' : '#43a047');
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 8;
      ctx.fillRect(s.x*20+2, s.y*20+2, 16, 16);
      ctx.shadowBlur = 0;
    });

    // Ojos cabeza
    if (snake.length > 0) {
      const head = snake[0];
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(head.x*20+7, head.y*20+7, 3, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(head.x*20+13, head.y*20+7, 3, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(head.x*20+7, head.y*20+7, 1.5, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(head.x*20+13, head.y*20+7, 1.5, 0, Math.PI*2);
      ctx.fill();
    }

    // Fruto rojo brillante
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 15;
    const fruitGradient = ctx.createRadialGradient(food.x*20+10, food.y*20+10, 0, food.x*20+10, food.y*20+10, 12);
    fruitGradient.addColorStop(0, '#ff5722');
    fruitGradient.addColorStop(0.7, '#f44336');
    fruitGradient.addColorStop(1, '#d32f2f');
    ctx.fillStyle = fruitGradient;
    ctx.beginPath();
    ctx.arc(food.x*20+10, food.y*20+10, 12, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.9)';
      ctx.fillRect(0, 0, 500, 500);
      ctx.fillStyle = '#ffeb3b'; // Amarillo meme
      ctx.font = 'bold 32px "Comic Sans MS", cursive';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 5;
      ctx.fillText('Te falta calle pa', 250, 180);
      ctx.font = 'bold 28px "Comic Sans MS", cursive';
      ctx.fillStyle = '#4caf50';
      ctx.fillText(`🐍 ${score} PUNTOS`, 250, 230);
      ctx.fillStyle = '#ffeb3b';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('←↑↓→ o WASD para revancha', 250, 280);
      ctx.shadowBlur = 0;
    }
  });

  const restart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setScore(0);
    setGameOver(false);
    setDirection({ x: 1, y: 0 });
    gameSpeed.current = 120;
  };

  const speedDisplay = Math.round(1000 / gameSpeed.current);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-3xl relative overflow-hidden">
      {/* Score FUERA del canvas */}
      <div className="w-[500px] flex justify-between items-center mb-6 p-4 bg-black/30 backdrop-blur-sm border-4 border-white/50 rounded-2xl text-white font-black text-2xl shadow-2xl">
        <div>🍎 <span className="text-3xl">{score}</span></div>
        <div>🚀 <span className="text-3xl">{speedDisplay}</span></div>
      </div>
      
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={500} 
          className="border-12 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.8)] bg-gradient-to-b from-green-400 to-green-600 hover:shadow-[25px_25px_0px_0px_rgba(0,0,0,0.8)] transition-all cursor-pointer" 
          onClick={gameOver ? restart : undefined}
        />
        <div className="mt-8 text-white font-black text-3xl text-center drop-shadow-lg tracking-wider">
          🐍 ¡COME FRUTOS ROJOS!
        </div>
        <div className="mt-2 text-white/90 font-bold text-xl text-center drop-shadow-md">
          ←↑↓→ o WASD | ¡Más rápido al comer!
        </div>
      </div>
    </div>
  );
}
