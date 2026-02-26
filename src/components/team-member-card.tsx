
import Link from "next/link";
import Image from "next/image";
import { Member } from "@/lib/team-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamMemberCard({ member }: { member: Member }) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-4 border-black bg-white rounded-none">
      {/* Cabecera de la Carta */}
      <div className={cn("h-3 w-full", member.color)} />
      
      <div className="relative p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-black italic uppercase leading-none tracking-tighter">
              {member.name}
            </h3>
            <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-full uppercase mt-1 inline-block">
              {member.role}
            </span>
          </div>
          <div className="flex gap-0.5 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Imagen del Personaje */}
        <div className="relative aspect-square w-full mb-6 border-4 border-black overflow-hidden group-hover:grayscale-0 grayscale transition-all duration-500">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform"
            data-ai-hint="professional portrait"
          />
        </div>

        {/* Estadísticas (Stats) */}
        <div className="space-y-3 mb-6 bg-slate-50 p-3 border-2 border-black/5">
          {member.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between text-[10px] font-black uppercase italic">
                <span>{stat.label}</span>
                <span>{stat.value}%</span>
              </div>
              <Progress value={stat.value} className="h-1.5 rounded-none bg-slate-200" />
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-medium mb-6 line-clamp-2 italic leading-relaxed">
          "{member.description}"
        </p>

        <Button asChild className="w-full group/btn bg-black hover:bg-black/90 text-white font-black italic uppercase rounded-none transition-all">
          <Link href={`/members/${member.id}`} className="flex items-center justify-center">
            ¡Elegir Personaje!
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Marca de agua decorativa */}
      <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
        <Star className="w-32 h-32 rotate-12" />
      </div>
    </Card>
  );
}
