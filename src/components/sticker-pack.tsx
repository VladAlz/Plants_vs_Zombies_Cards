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
      {/* Sombra exterior del sobre */}
      <div className="absolute inset-0 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.7)] pointer-events-none z-0" />

      {/* Cuerpo principal del sobre */}
      <div className={cn(
        "relative w-full h-full flex flex-col overflow-hidden rounded-sm z-10",
        "border-[3px] border-[#c8a84b]",          // borde dorado exterior
        "shadow-[inset_0_0_0_2px_#fffbe6,inset_0_0_0_4px_#a07820]", // doble borde interior
        !isOpening && "group-hover:-translate-y-2 transition-transform duration-300"
      )}>

        {/* ══════════ FRANJA SUPERIOR ESTILO PvZ GW2 ══════════ */}
        <div className="relative flex flex-col items-center pt-2 pb-1 px-2"
          style={{
            background: "linear-gradient(180deg, #ffe57a 0%, #f5a800 40%, #c67c00 100%)",
            borderBottom: "3px solid #7a4a00",
          }}
        >
          {/* Tornillos decorativos esquinas */}
          <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-[#c67c00] border border-[#7a4a00] shadow-inner" />
          <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#c67c00] border border-[#7a4a00] shadow-inner" />

          {/* Logo PvZ GW2 simulado */}
          <div className="flex flex-col items-center leading-none">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black uppercase text-[#7a2a00] tracking-widest drop-shadow">PLANTS</span>
              <span className="text-[10px] font-black text-[#7a2a00]">vs</span>
              <span className="text-[10px] font-black uppercase text-[#7a2a00] tracking-widest drop-shadow">ZOMBIES</span>
            </div>
            <span className="text-2xl font-black italic text-white leading-none"
              style={{ textShadow: "0 2px 0 #7a2a00, 0 0 8px #ff6a00" }}>
              GW2
            </span>
          </div>
        </div>

        {/* ══════════ CUERPO CENTRAL ══════════ */}
        <div
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1a3a6b 0%, #0d2040 50%, #1a3a6b 100%)",
          }}
        >
          {/* Líneas de brillo diagonales decorativas */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(255,255,255,0.08) 18px, rgba(255,255,255,0.08) 20px)"
            }}
          />

          {/* Imagen del miembro */}
          <div className="absolute inset-0 z-10">
            <Image
              src={member.packImage}
              alt={member.name}
              fill
              className="object-cover"
              data-ai-hint="cartoon game character"
            />
            {/* Overlay oscuro sutil para que el brillo diagonal se vea bien */}
            <div className="absolute inset-0 bg-black/20" />
            {/* Badge SUPER RARE */}
            <div className="absolute bottom-3 right-2 bg-yellow-400 text-black font-black text-[10px] px-2 py-0.5 border-2 border-black rotate-12 shadow-md z-20">
              SUPER RARE!
            </div>
          </div>

          {/* Brillo diagonal */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
        </div>

        {/* ══════════ FRANJA INFERIOR ESTILO PvZ GW2 ══════════ */}
        <div
          className="flex flex-col items-center gap-1 px-3 py-2"
          style={{
            background: "linear-gradient(180deg, #1a2f55 0%, #0d1c36 100%)",
            borderTop: "3px solid #c8a84b",
          }}
        >
          {/* Tornillos decorativos */}
          <div className="w-full flex justify-between px-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#c8a84b] border border-[#7a4a00]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#c8a84b] border border-[#7a4a00]" />
          </div>

          {/* Botón de golpear */}
          <div className="w-full flex items-center justify-center gap-2 bg-black/50 py-1.5 rounded-sm border border-[#c8a84b]/60">
            <MousePointer2 className="w-4 h-4 text-yellow-400 animate-bounce" />
            <span className="text-white font-black uppercase italic text-xs">
              GOLPEA PARA ABRIR ({hits}/{maxHits})
            </span>
          </div>

          {/* Texto inferior */}
          <p className="text-[#c8a84b] text-[9px] font-bold uppercase tracking-widest opacity-80">
            GARDEN WARFARE STICKER SHOP
          </p>
        </div>
      </div>

      {/* Partículas de golpe */}
      {isHitting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <Sparkles className="w-16 h-16 text-yellow-300 animate-ping" />
        </div>
      )}
    </div>
  );
}
