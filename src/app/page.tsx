import Link from "next/link";
import { teamMembers } from "@/lib/team-data";
import TeamMemberCard from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import { Sun, ShieldAlert, Skull, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section al estilo Logo Garden Warfare */}
      <section className="relative h-[80vh] flex items-center justify-center sky-gradient overflow-hidden border-b-[12px] border-green-600">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 pointer-events-none opacity-20 grass-pattern"></div>
        
        <div className="container mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white text-xs font-black uppercase mb-6 tracking-widest animate-bounce">
            <ShieldAlert className="w-4 h-4 text-yellow-400" /> ¡ALERTA DE SEGURIDAD!
          </div>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-8xl md:text-9xl garden-text leading-none">GARDEN</h1>
            <h1 className="text-7xl md:text-8xl warfare-text -mt-4">DEV·FARE</h1>
          </div>

          <p className="text-2xl md:text-3xl text-gray-800 font-black italic max-w-2xl mx-auto mb-10 drop-shadow-sm">
            TUS REPOSITORIOS ESTÁN BAJO ATAQUE. <br/> 
            <span className="bg-yellow-400 px-2 border-2 border-black">¡PLANTÉALOS AHORA!</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-4 border-black font-black italic uppercase rounded-none px-12 h-20 text-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none" asChild>
              <Link href="#battlefield">¡A LA BATALLA!</Link>
            </Button>
          </div>
        </div>

        {/* Zombies y Plantas flotando (decorativo) */}
        <div className="absolute bottom-10 left-10 hidden lg:block animate-pulse">
          <Skull className="w-24 h-24 text-gray-400 opacity-20 rotate-12" />
        </div>
        <div className="absolute top-20 right-20 hidden lg:block animate-pulse delay-700">
          <Target className="w-20 h-20 text-green-400 opacity-20 -rotate-12" />
        </div>
      </section>

      {/* Battlefield (Grilla de Miembros) */}
      <section id="battlefield" className="py-24 grass-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto concrete-panel p-8 mb-20 text-center">
            <h2 className="text-5xl font-black italic uppercase text-black mb-4">TU ESCUADRÓN DE DEFENSA</h2>
            <p className="text-lg font-bold text-gray-700">
              Selecciona a los especialistas adecuados para neutralizar las hordas de errores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black text-white border-t-[12px] border-yellow-400">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col">
            <span className="text-3xl garden-text">GARDEN</span>
            <span className="text-xl warfare-text -mt-2">DEV·FARE</span>
          </div>
          <p className="text-sm font-black uppercase italic opacity-60">
            © 2024 Garden Dev-Fare League. Ningún bug sobrevivió en la creación de esta página.
          </p>
          <div className="flex gap-4">
            <Sun className="w-10 h-10 fill-yellow-400 text-black sun-glow" />
          </div>
        </div>
      </footer>
    </div>
  );
}