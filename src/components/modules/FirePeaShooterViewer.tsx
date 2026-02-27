'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Maximize2, Minimize2, ShieldAlert, Cpu, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FirePeaShooterViewer({ onGoBack }: { onGoBack: () => void }) {
  const [isMaximized, setIsMaximized] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMaximized(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out relative',
        isMaximized
          ? 'fixed inset-0 z-[100] p-0 md:p-8 bg-black/95 backdrop-blur-md flex items-center justify-center'
          : 'w-full h-full'
      )}
    >
      <button
        onClick={onGoBack}
        className="absolute top-4 left-4 z-[110] p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-all"
        title="Volver a la Biblioteca"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <Card
        className={cn(
          'bg-[#0a0a0a] border-black overflow-hidden flex flex-col transition-all duration-300',
          isMaximized
            ? 'w-full h-full border-[12px] shadow-none'
            : 'w-full h-full border-[8px] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]'
        )}
      >
        <CardHeader
          className={cn(
            'border-b-[8px] border-black bg-[#d32f2f] py-4 px-6 transition-all',
            isMaximized ? 'py-6' : 'py-4'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-black p-2 border-2 border-orange-400">
                <Cpu className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-white font-black italic uppercase text-2xl leading-none tracking-tighter">
                  ZOMBIE-DEF <span className="text-black/50 text-xs ml-2 font-mono tracking-tighter bg-orange-400 px-2">v1.0.0</span>
                </CardTitle>
                <CardDescription className="text-white/80 font-bold italic text-xs uppercase tracking-widest mt-1">
                  SISTEMA DE DEFENSA ACTIVADO
                </CardDescription>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleMaximize}
                className="p-2 bg-black border-4 border-black hover:bg-orange-400 hover:text-black text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                title={isMaximized ? 'Salir de pantalla completa' : 'Maximizar pantalla'}
              >
                {isMaximized ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent
          className={cn(
            'p-0 flex-1 bg-black relative overflow-hidden',
            isMaximized ? 'h-full' : 'h-[600px] lg:h-[700px]'
          )}
        >
           <div className="absolute inset-0 border-[20px] border-black pointer-events-none z-20 shadow-inner" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-30 opacity-10 scanline" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-30" />
        </CardContent>
      </Card>
    </div>
  );
}
