import Link from "next/link";
import { teamMembers } from "@/lib/team-data";
import TeamMemberCard from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import { Sun, TreePine, Skull, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col garden-pattern">
      {/* Encabezado Estilo Madera */}
      <header className="sticky top-0 z-50 bg-[#795548] border-b-8 border-[#5d4037] shadow-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-3xl italic tracking-tighter text-yellow-400 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <Sun className="w-10 h-10 fill-yellow-400 text-black sun-glow" />
            <span>GARDEN·DEV</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-black uppercase text-sm italic text-white">
            <Link href="#garden" className="hover:text-yellow-400 transition-colors">Mi Jardín</Link>
            <Link href="#plants" className="hover:text-yellow-400 transition-colors">Plantas</Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex border-4 border-black bg-green-500 text-black font-black uppercase italic hover:bg-green-600 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <TreePine className="w-4 h-4 mr-2" /> Almanaque
          </Button>
        </div>
      </header>

      {/* Sección Hero: El Jardín Zen */}
      <section id="garden" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 border-4 border-black bg-white text-black text-sm font-black uppercase italic mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Skull className="w-5 h-5 text-purple-600" /> ¡Oleada de Bugs Aproximándose!
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 italic uppercase leading-tight text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            PREPARA TU <span className="text-yellow-400">DEFENSA</span>
          </h1>
          <p className="text-xl md:text-3xl text-white mb-12 font-bold max-w-2xl mx-auto leading-tight italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Elige a tus desarrolladores planta para proteger tu código de las hordas de zombies analógicos.
          </p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-black border-4 border-black font-black italic uppercase rounded-none px-12 h-16 text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" asChild>
            <Link href="#plants">Elegir Plantas</Link>
          </Button>
        </div>
      </section>

      {/* El Semillero */}
      <section id="plants" className="py-20 bg-[#388e3c]/90 border-t-8 border-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-6 text-yellow-400 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Tu Semillero</h2>
            <div className="h-3 w-48 bg-yellow-400 mb-6 border-2 border-black"></div>
            <p className="text-xl font-bold text-white max-w-xl italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Cada planta tiene un costo de sol y habilidades especiales para mantener tu repositorio a salvo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="mt-auto py-12 border-t-8 border-black bg-[#5d4037] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 font-black text-2xl italic tracking-tighter text-yellow-400">
              <Sun className="w-8 h-8 fill-yellow-400 text-black sun-glow" />
              <span>GARDEN·DEV</span>
            </div>
            <p className="text-sm font-black uppercase italic text-white/80">
              © 2024 Garden Defense League. Los zombies no saben programar.
            </p>
            <div className="flex gap-4">
               <Skull className="w-8 h-8 text-white/20" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
