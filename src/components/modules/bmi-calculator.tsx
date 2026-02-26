
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBmi(result);
    }
  };

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: "Bajo peso", color: "text-blue-500" };
    if (val < 25) return { label: "Peso normal", color: "text-green-500" };
    if (val < 30) return { label: "Sobrepeso", color: "text-yellow-500" };
    return { label: "Obesidad", color: "text-red-500" };
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Calculadora de IMC
        </CardTitle>
        <CardDescription>Calcula rápidamente tu Índice de Masa Corporal.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Peso (kg)</label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="ej. 70"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Altura (cm)</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="ej. 175"
            />
          </div>
        </div>
        <Button className="w-full" onClick={calculateBMI}>
          <Calculator className="w-4 h-4 mr-2" /> Calcular IMC
        </Button>

        {bmi !== null && (
          <div className="mt-6 p-6 border rounded-xl bg-muted/50 text-center animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Tu IMC</p>
            <p className="text-5xl font-extrabold text-primary py-2">{bmi.toFixed(1)}</p>
            <p className={`text-lg font-semibold ${getCategory(bmi).color}`}>
              {getCategory(bmi).label}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
