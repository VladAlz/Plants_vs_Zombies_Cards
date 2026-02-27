import Link from "next/link"; 
import Image from "next/image";
import { Member } from "@/lib/team-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sun, Crosshair, Star } from "lucide-react";

export default function TeamMemberCard({ member }: { member: Member }) {
  return (
    <Card className="relative group flex flex-col h-full bg-white border-[8px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform hover:rotate-1 transition-transform">
      {/* Rarity & Header */}
      <div className="bg-black p-2 flex justify-between items-center">
        <div className="flex gap-1">
          {[1,2,3].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
        </div>
        <div className="flex items-center gap-1 bg-yellow-400 px-3 py-0.5 border-2 border-white">
          <span className="text-black font-black text-xs">REBATE</span>
          <Sun className="w-3 h-3 fill-black text-black" />
          <span className="text-black font-black text-xs">{member.cost}</span>
        </div>
      </div>

      {/* Portrait - Estilo Pegatina */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-[#81d4fa] to-[#01579b] p-4">
        <div className="relative w-full h-full border-4 border-white shadow-lg overflow-hidden">
          <Image
            src={member.cardImage}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint="cartoon plant character"
          />
          <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white text-[10px] font-black uppercase p-1 text-center">
            {member.role}
          </div>
        </div>
      </div>

      {/* Stats & Info */}
      <div className="p-4 flex-1 flex flex-col bg-[#f5f5f5]">
        <div className="mb-4 text-center">
          <h3 className="text-2xl font-black italic uppercase text-black leading-none mb-1 tracking-tighter">
            {member.name}
          </h3>
          <div className="h-1 w-12 bg-black mx-auto" />
        </div>

        <div className="space-y-3 mb-6">
          {member.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between text-[10px] font-black uppercase text-black/60">
                <span>{stat.label}</span>
                <span>{stat.value}</span>
              </div>
              <Progress 
                value={stat.value} 
                className="h-3 rounded-none bg-black/10 border-2 border-black overflow-hidden" 
              />
            </div>
          ))}
        </div>

        <Button asChild className="mt-auto w-full bg-[#76ff03] hover:bg-[#64dd17] text-black font-black uppercase italic rounded-none border-4 border-black h-12 text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
          <Link href={`/members/${member.id}`} className="flex items-center justify-center gap-2">
            <Crosshair className="w-5 h-5" /> DESPLEGAR
          </Link>
        </Button>
      </div>
      
      {/* Textura de Pegatina */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </Card>
  );
}
