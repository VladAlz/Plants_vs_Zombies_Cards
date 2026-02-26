import Link from "next/link";
import Image from "next/image";
import { Member } from "@/lib/team-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sun, Zap, Crosshair } from "lucide-react";

export default function TeamMemberCard({ member }: { member: Member }) {
  return (
    <Card className="card-warfare group overflow-hidden">
      {/* Costo en Soles Flotante */}
      <div className="absolute top-4 right-4 bg-yellow-400 border-4 border-black px-3 py-1 z-20 flex items-center gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <span className="text-2xl font-black text-black">{member.cost}</span>
        <Sun className="w-6 h-6 fill-black text-black" />
      </div>

      <div className="relative aspect-[4/5] w-full border-b-4 border-black bg-sky-100 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          data-ai-hint="cartoon action character"
        />
        {/* Overlay Degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
          <p className="text-white text-sm font-bold italic mb-2">"{member.description}"</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-3xl font-black italic uppercase text-black leading-none mb-1">{member.name}</h3>
          <span className="bg-green-600 text-white text-[10px] font-black px-2 py-0.5 uppercase border-2 border-black inline-block">
            {member.role}
          </span>
        </div>

        <div className="space-y-3 mb-8 bg-gray-100 p-4 border-2 border-black shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]">
          {member.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="flex justify-between text-[10px] font-black uppercase italic">
                <span>{stat.label}</span>
                <span>{stat.value}%</span>
              </div>
              <Progress 
                value={stat.value} 
                className="h-3 rounded-none bg-gray-300 border-2 border-black" 
              />
            </div>
          ))}
        </div>

        <Button asChild className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase italic rounded-none border-4 border-black h-12 text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
          <Link href={`/members/${member.id}`} className="flex items-center justify-center gap-2">
            <Crosshair className="w-5 h-5" /> DESPLEGAR
          </Link>
        </Button>
      </div>
    </Card>
  );
}