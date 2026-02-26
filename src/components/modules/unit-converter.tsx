
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";

export default function UnitConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("km");
  const [toUnit, setToUnit] = useState<string>("mi");

  const units: Record<string, number> = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    ft: 0.3048,
    in: 0.0254,
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return "0";
    const meters = val * units[fromUnit];
    const result = meters / units[toUnit];
    return result.toFixed(4);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Length Converter
        </CardTitle>
        <CardDescription>Instantly convert between various metric and imperial units.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Value</label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value..."
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map((u) => (
                    <SelectItem key={u} value={u}>{u.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="pb-2 text-muted-foreground">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map((u) => (
                    <SelectItem key={u} value={u}>{u.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Result</p>
          <p className="text-3xl font-bold text-primary">
            {convert()} <span className="text-lg font-normal">{toUnit.toUpperCase()}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
