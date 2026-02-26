"use client";

import { useState } from "react";
import { Member } from "@/lib/team-data";
import TeamMemberCard from "./team-member-card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sparkles, MousePointer2 } from "lucide-react";

interface StickerPackProps {
  member: Member;
}

export default function StickerPack({ member }: StickerPackProps) {
  const [hits, setHits] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isHitting, setIsHitting] = useState(false);

  const maxHits = 3;

  const handleHit = () => {
    if (isOpened || isOpening) return;
    
    setIsHitting(true);
    const newHits = hits + 1;
    setHits(newHits);

    if (newHits >= maxHits) {
      setIsOpening(true);
      setTimeout(() => {
        setIsOpened(true);
        setIsOpening(false);
      }, 600);
    } else {
      setTimeout(() => setIsHitting(false), 200);
    }
  };

  if (isOpened) {
    return (
      <div className="card-reveal h-full">
        <TeamMemberCard member={member} />
      </div>
    );
  }

  return (
    <div 
      onClick={handleHit}
      className={cn(
        "relative aspect-[3/4] cursor-pointer group select-none",
        isHitting && "pack-hit",
        isOpening && "pack-opening"
      )}
    >
      {/* El Sobre de Pegatinas */}
      <div className={cn(
        "sticker-pack-wrapper w-full h-full flex flex-col items-center justify-between p-6 transition-transform duration-300",
        !isOpening && "group-hover:-translate-y-2"
      )}>
        {/* Logo GW Estilo */}
        <div className="text-center">
          <h4 className="text-white font-black italic text-xl leading-none drop-shadow-lg">STICKER PACK</h4>
          <div className="h-1 w-full bg-yellow-400 mt-1 shadow-sm" />
        </div>

        <div className="relative w-48 h-48 my-4">
          <Image
            src="https://picsum.photos/seed/pvz-gw/400/400"
            alt="Pack Image"
            fill
            className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            data-ai-hint="cartoon game character"
          />
          <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black font-black px-3 py-1 border-4 border-black rotate-12">
            SUPER RARE!
          </div>
        </div>

        <div className="w-full text-center space-y-2">
          <div className="flex items-center justify-center gap-2 bg-black/40 py-2 rounded-full border-2 border-white/20">
             <MousePointer2 className="w-5 h-5 text-yellow-400 animate-bounce" />
             <span className="text-white font-black uppercase italic text-sm">
               GOLPEA PARA ABRIR ({hits}/{maxHits})
             </span>
          </div>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">GARDEN WARFARE STICKER SHOP</p>
        </div>

        {/* Brillo */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Partículas de golpe */}
      {isHitting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Sparkles className="w-16 h-16 text-yellow-300 animate-ping" />
        </div>
      )}
    </div>
  );
}
