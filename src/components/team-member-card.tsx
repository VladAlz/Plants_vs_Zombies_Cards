import Link from "next/link";
import Image from "next/image";
import { Member } from "@/lib/team-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sun, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamMemberCard({ member }: { member: Member }) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 border-4 border-black bg-[#795548] rounded-none seed-packet-shadow">
      {/* Costo en Soles (Estilo PvZ) */}
      <div className="absolute top-0 left-0 bg-white/20 backdrop-blur-sm border-b-2 border-r-2 border-black px-3 py-1 z-10 flex items-center gap-1">
        <span className="text-xl font-black text-black">{member.cost}</span>
        <Sun className="w-5 h-5 fill-yellow-400 text-black sun-glow" />
      </div>

      <div className="p-0">
        {/* Imagen del Personaje */}
        <div className="relative aspect-square w-full border-b-4 border-black overflow-hidden bg-green-200">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            data-ai-hint="cartoon plant"
          />
        </div>

        <div className="p-4 bg-[#6d4c41] text-white">
          <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {member.name}
          </h3>
          <p className="text-[10px] font-bold bg-green-500 text-black px-2 py-0.5 uppercase mb-4 inline-block border border-black">
            {member.role}
          </p>

          {/* Estadísticas estilo juego */}
          <div className="space-y-2 mb-6 bg-black/20 p-2 border border-black/30">
            {member.stats.map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <div className="flex justify-between text-[8px] font-black uppercase">
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </div>
                <Progress value={stat.value} className="h-2 rounded-none bg-black/40" />
              </div>
            ))}
          </div>

          <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase italic rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
            <Link href={`/members/${member.id}`} className="flex items-center justify-center">
              ¡Plantear!
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
