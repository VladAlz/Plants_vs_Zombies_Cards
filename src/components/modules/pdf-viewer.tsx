"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Terminal, AlertTriangle, FileType } from "lucide-react";

export default function PdfViewer() {
  const pdfUrl = "/doom.pdf";

  return (
    <Card className="w-full h-full bg-black border-4 border-[#76ff03] overflow-hidden shadow-[0_0_20px_rgba(118,255,3,0.3)]">
      <CardHeader className="border-b border-[#76ff03]/30 bg-black/50">
        <CardTitle className="flex items-center gap-2 text-[#76ff03] font-black italic uppercase text-xl">
          <Terminal className="w-6 h-6" /> TERMINAL TÁCTICO: DOOM.EXE (PDF)
        </CardTitle>
        <CardDescription className="text-white/60 font-bold italic">
          DETECTADA ACTIVIDAD PARANORMAL EN EL PDF. EJECUTANDO PROTOCOLO "RIP & TEAR".
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[600px] flex items-center justify-center bg-[#1a1a1a] relative">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-none"
          title="DOOM PDF"
        >
          <div className="flex flex-col items-center justify-center text-center p-12 space-y-6">
            <div className="bg-red-600 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <AlertTriangle className="w-16 h-16 text-white animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-black text-white italic uppercase">¡ERROR DE DESPLIEGUE!</p>
              <p className="text-[#76ff03] font-bold">EL ARCHIVO <code className="bg-white/10 px-2 text-white">doom.pdf</code> NO HA SIDO DETECTADO.</p>
            </div>
            
            <div className="bg-white/5 p-6 border-2 border-dashed border-[#76ff03]/30 rounded-lg max-w-sm">
              <p className="text-xs text-white/60 uppercase font-black mb-4">Instrucciones del Cuartel General:</p>
              <ol className="text-[10px] text-left text-white/80 space-y-2 list-decimal list-inside font-bold">
                <li>Busca la carpeta llamada <span className="text-yellow-400">public/</span> en la raíz.</li>
                <li>Copia tu archivo PDF allí.</li>
                <li>Asegúrate de que se llame exactamente <span className="text-yellow-400">doom.pdf</span>.</li>
                <li>¡Refresca la página y prepárate para la acción!</li>
              </ol>
            </div>
          </div>
        </iframe>
        
        {/* Overlay decorativo de terminal */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-20">
           <FileType className="w-20 h-20 text-[#76ff03]" />
        </div>
      </CardContent>
    </Card>
  );
}
