'use client';

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Trophy, MousePointerClick, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type GameState = 'idle' | 'aiming' | 'shooting' | 'swoosh' | 'miss';

const SCORE_KEY = 'basketball_highscore';

export default function BasketballPea() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [scoreGlow, setScoreGlow] = useState(false);
  
  const [meterPosition, setMeterPosition] = useState(0);
  const meterDirection = useRef(1);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem(SCORE_KEY);
    if (savedScore) setScore(Number(savedScore));
  }, []);

  useEffect(() => {
    localStorage.setItem(SCORE_KEY, score.toString());
  }, [score]);

  useEffect(() => {
    const animateMeter = () => {
      setMeterPosition(prev => {
        if (prev >= 100) meterDirection.current = -1;
        if (prev <= 0) meterDirection.current = 1;
        return prev + meterDirection.current * 0.5;
      });
      animationFrameId.current = requestAnimationFrame(animateMeter);
    };

    if (gameState === 'aiming') {
      meterDirection.current = 1;
      setMeterPosition(0);
      animationFrameId.current = requestAnimationFrame(animateMeter);
    } else {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState]);

  const handleShoot = () => {
    if (gameState === 'idle') {
      setGameState('aiming');
      return;
    }
    if (gameState === 'aiming') {
      setGameState('shooting');
      const isSuccess = meterPosition >= 39 && meterPosition <= 61;

      setTimeout(() => {
        if (isSuccess) {
          setGameState('swoosh');
          setScore(prevScore => prevScore + 10);
          setScoreGlow(true);
        } else {
          setGameState('miss');
        }
        setTimeout(() => {
          setGameState('idle');
          setScoreGlow(false);
        }, 800);
      }, 800);
    }
  };

  const handleResetScore = () => setScore(0);

  return (
    <Card className="w-full bg-[#121212] text-white border-2 border-white/10 shadow-2xl mt-8">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">🏀 Lanzabaloncesto</CardTitle>
          <CardDescription className="text-gray-400">¡Apunta y encesta!</CardDescription>
        </div>
        <div className={cn("flex items-center gap-4 bg-black/30 px-4 py-2 rounded-lg border-2 border-yellow-400 transition-all duration-200", scoreGlow && "shadow-[0_0_20px_theme(colors.yellow.400)] scale-110")}>
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-3xl font-bold text-white">{score}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="relative rounded-lg h-96 flex justify-center border-4 border-black/50 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/cartoon-court.jpg')" }}
        >
          <div className={cn(
            "absolute w-8 h-8 bg-amber-500 rounded-full shadow-lg transition-all",
            "left-1/2",
            (gameState === 'idle' || gameState === 'aiming') && 'bottom-4 -translate-x-1/2',
            gameState === 'shooting' && 'duration-800 ease-out bottom-[280px] -translate-x-[15px] scale-110',
            gameState === 'swoosh' && 'duration-500 ease-in bottom-[215px] -translate-x-[12px] scale-90',
            gameState === 'miss' && 'duration-800 ease-in-out bottom-4 -translate-x-[100px] scale-110 rotate-180',
          )}></div>
        </div>

        <div className="mt-6 text-center">
          {gameState === 'aiming' && (
            <div className="mb-6 h-10 w-full max-w-sm mx-auto bg-black/30 rounded-full border-2 border-white/20 p-1 overflow-hidden relative">
              <div className="absolute top-0 left-[40%] h-full w-[20%] bg-green-500/40 rounded-full z-0"></div>
              <div className="h-full w-2 bg-yellow-400 rounded-full shadow-[0_0_10px_theme(colors.yellow.400)]" style={{ transform: `translateX(${meterPosition * 3.7}px)` }}></div>
            </div>
          )}
          <div className="flex justify-center items-center gap-4">
            <Button onClick={handleShoot} disabled={gameState === 'shooting' || gameState === 'swoosh' || gameState === 'miss'} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-all active:scale-95 w-48">
              {gameState === 'idle' && <><Target className="mr-2 h-5 w-5" /> Lanzar</>}
              {gameState === 'aiming' && <><MousePointerClick className="mr-2 h-5 w-5 animate-pulse" /> ¡Tirar!</>}
              {(gameState === 'shooting' || gameState === 'swoosh' || gameState === 'miss') && '...'}
            </Button>
            <Button variant="outline" size="icon" onClick={handleResetScore} title="Reiniciar Puntuación" className="bg-transparent border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-500">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
