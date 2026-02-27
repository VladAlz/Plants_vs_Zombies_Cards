'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// Definimos los estados posibles del juego para un código más limpio
type GameState = 'idle' | 'shooting' | 'swoosh' | 'miss';

export default function BasketballPea() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [scoreGlow, setScoreGlow] = useState(false);

  const handleShoot = () => {
    if (gameState !== 'idle') return;

    setGameState('shooting');

    // 1. La pelota vuela hacia el aro (dura 1 segundo)
    setTimeout(() => {
      // 2. Decidimos si es canasta o fallo
      const isSuccess = Math.random() > 0.3; // 70% de probabilidad de éxito

      if (isSuccess) {
        setGameState('swoosh');
        setScore(prevScore => prevScore + 10);
        setScoreGlow(true);
      } else {
        setGameState('miss');
      }

      // 3. Después de la animación de canasta o fallo (500ms), volvemos al estado inicial
      setTimeout(() => {
        setGameState('idle');
        setScoreGlow(false);
      }, 500);

    }, 1000); // Duración del lanzamiento inicial
  };

  return (
    <Card className="w-full bg-[#121212] text-white border-2 border-white/10 shadow-2xl mt-8">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">🏀 Lanzabaloncesto</CardTitle>
          <CardDescription className="text-gray-400">¡Acierta para ganar puntos!</CardDescription>
        </div>
        <div className={cn(
          "flex items-center gap-4 bg-black/30 px-4 py-2 rounded-lg border-2 border-yellow-400 transition-all duration-200",
          scoreGlow && "shadow-[0_0_20px_theme(colors.yellow.400)] scale-110"
        )}>
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-3xl font-bold text-white">{score}</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Área del Juego */}
        <div className="relative bg-gray-800/50 rounded-lg h-96 flex justify-center border-4 border-black/50 overflow-hidden">
          {/* Aro (z-index 20) */}
          <div className="absolute top-10 right-10 w-24 h-4 bg-gray-900 border-4 border-orange-500 rounded-full z-20"></div>
          <div className="absolute top-10 right-[60px] w-16 h-14 border-b-4 border-neutral-400 z-20" style={{clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)'}}></div>

          {/* Pelota con animación por estados */}
          <div className={cn(
            "absolute bottom-24 w-8 h-8 bg-amber-500 rounded-full shadow-lg transition-all",
            // Duración de la animación según el estado
            gameState === 'shooting' && 'duration-1000 ease-in-out',
            (gameState === 'swoosh' || gameState === 'miss') && 'duration-300 ease-out',
            
            // Posición y transformación según el estado
            gameState === 'shooting' && 'translate-x-[160px] -translate-y-[260px] scale-125', // Volando
            gameState === 'swoosh' && 'translate-x-[160px] -translate-y-[240px] scale-90', // Canasta
            gameState === 'miss' && 'translate-x-[120px] -translate-y-[290px] rotate-[90deg] scale-110', // Rebote
            
            // El Z-index cambia para que pase por detrás del aro en la canasta
            gameState === 'swoosh' ? 'z-10' : 'z-30'
          )}></div>

          {/* Lanzador (z-index 20) */}
          <div className="absolute bottom-0 w-32 h-24 bg-green-700 rounded-t-lg border-t-4 border-green-400 z-20"></div>
        </div>
        
        {/* Controles */}
        <div className="mt-6 text-center">
          <Button 
            onClick={handleShoot}
            disabled={gameState !== 'idle'}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <Target className="mr-2 h-5 w-5" />
            {gameState !== 'idle' ? 'Lanzando...' : 'Lanzar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
