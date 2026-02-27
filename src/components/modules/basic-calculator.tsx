"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type KeyDef = { label: string; value: string; kind?: "op" | "danger" | "util" };

const isOp = (v: string) => ["+", "-", "*", "/"].includes(v);

export default function BasicCalculator() {
  const [expr, setExpr] = useState("0");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const keys: KeyDef[] = useMemo(
    () => [
      { label: "AC", value: "AC", kind: "danger" },
      { label: "⌫", value: "BK", kind: "util" },
      { label: "%", value: "%", kind: "util" },
      { label: "÷", value: "/", kind: "op" },

      { label: "7", value: "7" },
      { label: "8", value: "8" },
      { label: "9", value: "9" },
      { label: "×", value: "*", kind: "op" },

      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "−", value: "-", kind: "op" },

      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "+", value: "+", kind: "op" },

      { label: "0", value: "0" },
      { label: ".", value: "." },
      { label: "=", value: "=", kind: "util" },
    ],
    []
  );

  const safeEval = (raw: string) => {
    // Solo números, operadores y punto
    if (!/^[0-9+\-*/.()%\s]+$/.test(raw)) return null;

    // Percent: convierte "n%" a "(n/100)"
    const withPct = raw.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`return (${withPct});`);
      const result = fn();
      if (typeof result !== "number" || !Number.isFinite(result)) return null;
      return result;
    } catch {
      return null;
    }
  };

  const push = (v: string) => {
    setExpr((prev) => {
      // si acabas de dar "=", y presionas un número, empieza de 0 otra vez
      if (justEvaluated && /^[0-9.]$/.test(v)) {
        setJustEvaluated(false);
        return v === "." ? "0." : v;
      }
      setJustEvaluated(false);

      if (v === "AC") return "0";

      if (v === "BK") {
        if (prev.length <= 1) return "0";
        return prev.slice(0, -1);
      }

      if (v === "=") {
        const res = safeEval(prev);
        if (res === null) return prev;
        setJustEvaluated(true);
        return String(Math.round(res * 1e10) / 1e10);
      }

      // Evita doble operador
      if (isOp(v)) {
        if (prev === "0") return v === "-" ? "-" : "0";
        if (isOp(prev.slice(-1))) return prev.slice(0, -1) + v;
        return prev + v;
      }

      // Punto decimal: evita ".." en el mismo número
      if (v === ".") {
        // toma la última “parte” después del último operador
        const lastChunk = prev.split(/[\+\-\*\/]/).pop() ?? "";
        if (lastChunk.includes(".")) return prev;
        return prev + ".";
      }

      // Números
      if (prev === "0") return v;
      return prev + v;
    });
  };

  return (
    <div className="w-full max-w-md mx-auto border-8 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <div className="bg-black text-white p-4">
        <div className="text-xs font-black uppercase opacity-70">Calculadora</div>
        <div className="text-3xl font-black tracking-tight text-right break-all">{expr}</div>
      </div>

      <div className="p-4 grid grid-cols-4 gap-3">
        {keys.map((k) => (
          <Button
            key={k.label}
            onClick={() => push(k.value)}
            className={[
              "rounded-none border-4 border-black font-black italic uppercase h-14 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all",
              k.kind === "op" ? "bg-[#ffeb3b] hover:bg-[#fdd835] text-black" : "",
              k.kind === "danger" ? "bg-[#ff5252] hover:bg-[#ff1744] text-white" : "",
              !k.kind ? "bg-[#e0e0e0] hover:bg-[#d5d5d5] text-black" : "",
              k.label === "=" ? "col-span-2 bg-[#76ff03] hover:bg-[#64dd17] text-black" : "",
              k.label === "0" ? "col-span-2" : "",
            ].join(" ")}
          >
            {k.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
