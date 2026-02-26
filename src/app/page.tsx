import Link from "next/link";
import { teamMembers } from "@/lib/team-data";
import TeamMemberCard from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import { Sun, ShieldAlert, Skull, Target, Zap, Waves } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#5d4037]">
      {/* Hero Section - El Cielo de la Mañana */}
      <section className="relative h-[85vh] flex items-center justify-center bg-gradient-to-b from-[#81d4fa] via-[#e1f5fe] to-[#55a630] overflow-hidden border-b-[16px] border-[#3e2723]">
        {/* Nubes decorativas */}
        <div className="absolute top-20 left-[10%] w-32 h-16 bg-white/60 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-[15%] w-48 h-20 bg-white/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 wooden-panel text-white text-xs font-black uppercase mb-8 tracking-widest animate-bounce">
            <ShieldAlert className="w-5 h-5 text-yellow-400" /> ¡ATAQUE INMINENTE!
          </div>
          
          <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-8xl md:text-[12rem] garden-text leading-none select-none">GARDEN</h1>
            <h1 className="text-7xl md:text-9xl warfare-text -mt-6 select-none">DEV·FARE</h1>
          </div>

          <p className="text-2xl md:text-4xl text-black font-black italic max-w-3xl mx-auto mb-12 drop-shadow-md">
            LOS ZOMBIES-BUG ESTÁN EN TU JARDÍN. <br/> 
            <span className="bg-yellow-400 px-4 py-1 border-4 border-black rotate-2 inline-block mt-2">¡PLANTÉALOS AHORA!</span>
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="bg-[#76ff03] hover:bg-[#64dd17] text-black border-4 border-black font-black italic uppercase rounded-none px-16 h-24 text-4xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all" asChild>
              <Link href="#battlefield">¡DEFENDER!</Link>
            </Button>
          </div>
        </div>

        {/* Elementos flotantes cómicos */}
        <div className="absolute bottom-10 left-10 hidden lg:block animate-bounce duration-1000">
          <Skull className="w-32 h-32 text-black/10 -rotate-12" />
        </div>
        <div className="absolute top-20 right-20 hidden lg:block animate-spin duration-[10000ms]">
          <Sun className="w-40 h-40 text-yellow-400/20" />
        </div>
      </section>

      {/* Battlefield - El Gran Césped */}
      <section id="battlefield" className="py-32 pvz-lawn">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto wooden-panel p-10 mb-24 text-center transform -rotate-1">
            <h2 className="text-6xl font-black italic uppercase text-white mb-4">ELIGE TU DEFENSA</h2>
            <p className="text-xl font-bold text-white/90 italic">
              Cada semilla es un programador listo para aniquilar errores. ¡Gasta tus soles sabiamente!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Estilo Tierra/Madera */}
      <footer className="py-20 bg-[#3e2723] text-white border-t-[20px] border-[#2e7d32]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-5xl garden-text">GARDEN</span>
            <span className="text-3xl warfare-text -mt-2">DEV·FARE</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-lg font-black uppercase italic text-yellow-400 mb-2">
              DESARROLLADO EN EL PATIO DE ATRÁS
            </p>
            <p className="text-sm font-bold opacity-60">
              © 2024 Garden Dev-Fare League. <br/> 
              Ninguna cortadora de césped fue dañada en el proceso.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-yellow-400 p-4 border-4 border-black sun-glow">
              <Sun className="w-12 h-12 fill-black text-black" />
            </div>
            <div className="bg-[#00b4d8] p-4 border-4 border-black">
              <Waves className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
