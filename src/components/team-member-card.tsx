import Link from "next/link";
import Image from "next/image";
import { Member } from "@/lib/team-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sun, Zap, Crosshair } from "lucide-react";

export default function TeamMemberCard({ member }: { member: Member }) {
  return (
    <Card className="seed-packet relative group flex flex-col h-full">
      {/* Costo en Soles (Seed Packet Style) */}
      <div className="absolute top-0 right-0 bg-[#ffd600] border-l-4 border-b-4 border-black px-4 py-2 z-20 flex items-center gap-2 shadow-sm">
        <span className="text-3xl font-black text-black leading-none">{member.cost}</span>
        <Sun className="w-8 h-8 fill-black text-black sun-glow" />
      </div>

      {/* Imagen del Personaje */}
      <div className="relative aspect-square w-full border-b-[6px] border-black bg-[#aed581] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out p-4"
          data-ai-hint="cartoon game plant character"
        />
        {/* Overlay Cómico */}
        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs font-black italic text-center uppercase">
            {member.description}
          </p>
        </div>
      </div>

      {/* Info y Stats */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-black italic uppercase text-black leading-none mb-2 tracking-tighter">
            {member.name}
          </h3>
          <span className="bg-[#2e7d32] text-white text-[12px] font-black px-4 py-1 uppercase border-2 border-black inline-block transform -rotate-1">
            {member.role}
          </span>
        </div>

        <div className="space-y-4 mb-8 bg-black/5 p-4 border-2 border-dashed border-black/20">
          {member.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between text-[11px] font-black uppercase italic text-black/70">
                <span>{stat.label}</span>
                <span>{stat.value}</span>
              </div>
              <Progress 
                value={stat.value} 
                className="h-4 rounded-none bg-black/10 border-2 border-black overflow-hidden" 
              />
            </div>
          ))}
        </div>

        <Button asChild className="mt-auto w-full bg-[#ffeb3b] hover:bg-[#fdd835] text-black font-black uppercase italic rounded-none border-4 border-black h-16 text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
          <Link href={`/members/${member.id}`} className="flex items-center justify-center gap-3">
            <Crosshair className="w-6 h-6" /> ¡PLANTAR!
          </Link>
        </Button>
      </div>
    </Card>
  );
}
