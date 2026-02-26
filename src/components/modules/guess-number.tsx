
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { RefreshCcw, Send } from "lucide-react";

export default function GuessNumber() {
  const [target, setTarget] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("Try to guess the number between 1 and 100!");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Try to guess the number between 1 and 100!");
    setAttempts(0);
    setGameOver(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);
    if (isNaN(num)) return;

    setAttempts((prev) => prev + 1);

    if (num === target) {
      setMessage(`Correct! You found it in ${attempts + 1} attempts!`);
      setGameOver(true);
    } else if (num < target) {
      setMessage("Too low! Try a higher number.");
    } else {
      setMessage("Too high! Try a lower number.");
    }
    setGuess("");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Guess the Number
        </CardTitle>
        <CardDescription>A classic logic game to test your intuition.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-8">
          <p className="text-lg font-medium text-primary">{message}</p>
          <p className="text-sm text-muted-foreground mt-2">Attempts: {attempts}</p>
        </div>
        {!gameOver ? (
          <form onSubmit={handleGuess} className="flex gap-2">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter 1-100"
              min="1"
              max="100"
              required
            />
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" /> Guess
            </Button>
          </form>
        ) : (
          <Button onClick={resetGame} variant="secondary" className="w-full">
            <RefreshCcw className="w-4 h-4 mr-2" /> Play Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
