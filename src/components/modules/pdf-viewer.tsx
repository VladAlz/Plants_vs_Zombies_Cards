"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Maximize2, Minimize2, ShieldAlert, Cpu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PdfViewer() {
  const [isMaximized, setIsMaximized] = useState(false);
  //XD
  // Manejar la tecla ESC para salir del modo pantalla completa
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMaximized) {
        setIsMaximized(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMaximized]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  /**
   * Parámetros para forzar un visor de PDF limpio:
   * #toolbar=0: Oculta la barra de herramientas superior
   * &navpanes=0: Oculta el panel lateral de navegación
   * &scrollbar=0: Intenta ocultar la barra de desplazamiento lateral
   * &view=Fit: Ajusta el contenido al ancho y alto disponible
   * &pagemode=none: No muestra ningún panel adicional al abrir
   */
  const pdfUrl = "/doom.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit&pagemode=none";

  return (
    <div className={cn(
      "transition-all duration-300 ease-in-out",
      isMaximized ? "fixed inset-0 z-[100] p-0 md:p-8 bg-black/95 backdrop-blur-md flex items-center justify-center" : "w-full h-full"
    )}>
      <Card className={cn(
        "bg-[#0a0a0a] border-black overflow-hidden flex flex-col transition-all duration-300",
        isMaximized 
          ? "w-full h-full border-[12px] shadow-none" 
          : "w-full h-full border-[8px] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
      )}>
        {/* Encabezado Estilo Consola Retro */}
        <CardHeader className={cn(
          "border-b-[8px] border-black bg-[#2e7d32] py-4 px-6 transition-all",
          isMaximized ? "py-6" : "py-4"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-black p-2 border-2 border-yellow-400">
                <Cpu className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <CardTitle className="text-white font-black italic uppercase text-2xl leading-none tracking-tighter">
                  DOOM-OS <span className="text-black/50 text-xs ml-2 font-mono tracking-tighter bg-yellow-400 px-2">v6.6.6</span>
                </CardTitle>
                <CardDescription className="text-white/80 font-bold italic text-xs uppercase tracking-widest mt-1">
                  {isMaximized ? "MODO DE COMBATE TOTAL ACTIVADO" : "INICIANDO PROTOCOLO DE DEFENSA DEL JARDÍN"}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-1 bg-black border-2 border-red-600 text-red-500 text-[10px] font-black uppercase animate-pulse">
                <ShieldAlert className="w-4 h-4" /> CONEXIÓN SEGURA
              </div>
              <button 
                onClick={toggleMaximize}
                className="p-2 bg-black border-4 border-black hover:bg-yellow-400 hover:text-black text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                title={isMaximized ? "Salir de pantalla completa" : "Maximizar pantalla"}
              >
                {isMaximized ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
              </button>
              {isMaximized && (
                <button 
                  onClick={() => setIsMaximized(false)}
                  className="p-2 bg-red-600 border-4 border-black hover:bg-red-700 text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </CardHeader>
        
        {/* Contenedor del "Monitor" */}
        <CardContent className={cn(
          "p-0 flex-1 bg-black relative overflow-hidden",
          isMaximized ? "h-full" : "h-[600px] lg:h-[700px]"
        )}>
          {/* Marco de Pantalla CRT */}
          <div className="absolute inset-0 border-[20px] border-black pointer-events-none z-20 shadow-inner" />
          
          {/* Efecto de Brillo de Pantalla y Scanlines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-30 opacity-10 scanline" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-30" />

          {/* El PDF (El Juego) */}
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title="DOOM PDF"
            style={{ 
              filter: 'contrast(1.1) brightness(1.05)',
              backgroundColor: '#000'
            }}
          >
            <div className="flex flex-col items-center justify-center text-center p-12 h-full space-y-6 bg-[#0a0a0a]">
              <div className="bg-red-600 p-8 border-8 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <ShieldAlert className="w-20 h-20 text-white animate-bounce" />
              </div>
              <div className="space-y-4">
                <p className="text-4xl font-black text-white italic uppercase tracking-tighter">¡ERROR CRÍTICO!</p>
                <p className="text-[#76ff03] font-mono text-sm bg-black px-6 py-3 border-4 border-black">
                  SISTEMA NO ENCONTRADO: <span className="underline font-black">doom.pdf</span>
                </p>
              </div>
            </div>
          </iframe>

          {/* HUD de Juego Estilo Retro */}
          <div className={cn(
            "absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none z-40 transition-all",
            isMaximized ? "bottom-16" : "bottom-10"
          )}>
            <div className="bg-black border-4 border-[#76ff03] p-4 flex gap-8 items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#76ff03] font-mono">SALUD</span>
                <span className="text-3xl font-black text-white leading-none">100%</span>
              </div>
              <div className="w-px h-10 bg-[#76ff03]/30" />
              <div className="flex flex-col">
                <span className="text-[10px] text-[#76ff03] font-mono">MUNICIÓN</span>
                <span className="text-3xl font-black text-white leading-none">50/50</span>
              </div>
            </div>
            
            <div className="bg-black border-4 border-red-600 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-xl font-black italic text-red-600 uppercase leading-none">
                NIVEL: {isMaximized ? "INVASIÓN TOTAL" : "PATIO TRASERO"}
              </div>
            </div>
          </div>

          {/* Luces de la Consola */}
          <div className="absolute top-8 right-8 flex gap-2 z-40 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse delay-75 shadow-[0_0_10px_rgba(250,204,21,1)]" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]" />
          </div>
        </CardContent>

        <style jsx global>{`
          .scanline {
            background: linear-gradient(
              to bottom,
              transparent 50%,
              rgba(255, 255, 255, 0.05) 51%,
              transparent 51%
            );
            background-size: 100% 4px;
            animation: scanline 10s linear infinite;
          }
          @keyframes scanline {
            0% { background-position: 0 0; }
            100% { background-position: 0 100%; }
          }
        `}</style>
      </Card>
    </div>
  );
}
