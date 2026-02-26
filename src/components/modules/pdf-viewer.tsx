
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Terminal } from "lucide-react";

export default function PdfViewer() {
  // Nota: El usuario debe colocar su archivo doom.pdf en la carpeta /public
  const pdfUrl = "/doom.pdf";

  return (
    <Card className="w-full h-full bg-black border-4 border-[#76ff03] overflow-hidden shadow-[0_0_20px_rgba(118,255,3,0.3)]">
      <CardHeader className="border-b border-[#76ff03]/30 bg-black/50">
        <CardTitle className="flex items-center gap-2 text-[#76ff03] font-black italic uppercase">
          <Terminal className="w-5 h-5" /> TERMINAL TÁCTICO: DOOM.EXE (PDF)
        </CardTitle>
        <CardDescription className="text-white/60">
          Entrada de datos detectada. Ejecutando protocolo de entrenamiento "Bugs are Demons".
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[500px] flex items-center justify-center bg-[#1a1a1a]">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-none"
          title="DOOM PDF"
        >
          <div className="text-white p-8 text-center">
            <p className="text-xl font-bold mb-4">¡ERROR DE CARGA!</p>
            <p>Asegúrate de colocar el archivo <code className="bg-white/10 px-2">doom.pdf</code> en la carpeta <code className="bg-white/10 px-2">public/</code> de tu proyecto.</p>
          </div>
        </iframe>
      </CardContent>
    </Card>
  );
}
