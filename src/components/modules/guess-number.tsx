
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { RefreshCcw, Send } from "lucide-react";

export default function GuessNumber() {
  const [target, setTarget] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("¡Intenta adivinar el número entre 1 y 100!");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("¡Intenta adivinar el número entre 1 y 100!");
    setAttempts(0);
    setGameOver(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);
    if (isNaN(num)) return;

    setAttempts((prev) => prev + 1);

    if (num === target) {
      setMessage(`¡Correcto! ¡Lo encontraste en ${attempts + 1} intentos!`);
      setGameOver(true);
    } else if (num < target) {
      setMessage("¡Muy bajo! Intenta con un número mayor.");
    } else {
      setMessage("¡Muy alto! Intenta con un número menor.");
    }
    setGuess("");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Adivina el Número
        </CardTitle>
        <CardDescription>Un juego clásico de lógica para poner a prueba tu intuición.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-8">
          <p className="text-lg font-medium text-primary">{message}</p>
          <p className="text-sm text-muted-foreground mt-2">Intentos: {attempts}</p>
        </div>
        {!gameOver ? (
          <form onSubmit={handleGuess} className="flex gap-2">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Ingresa 1-100"
              min="1"
              max="100"
              required
            />
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" /> Adivinar
            </Button>
          </form>
        ) : (
          <Button onClick={resetGame} variant="secondary" className="w-full">
            <RefreshCcw className="w-4 h-4 mr-2" /> Jugar de nuevo
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
