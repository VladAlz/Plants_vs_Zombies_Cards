
import Link from "next/link";
import { teamMembers } from "@/lib/team-data";
import TeamMemberCard from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import { Code2, Github, Zap, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
      {/* Encabezado */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-black">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-2xl italic tracking-tighter">
            <Zap className="w-8 h-8 fill-yellow-400 text-black stroke-[3px]" />
            <span>DEV·ARENA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-black uppercase text-sm italic">
            <Link href="#about" className="hover:text-primary transition-colors">Intro</Link>
            <Link href="#team" className="hover:text-primary transition-colors">Jugadores</Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex border-2 border-black font-black uppercase italic hover:bg-black hover:text-white rounded-none">
            <Github className="w-4 h-4 mr-2" /> Repo
          </Button>
        </div>
      </header>

      {/* Sección Hero */}
      <section id="about" className="py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border-2 border-black bg-yellow-400 text-black text-xs font-black uppercase italic mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Sparkles className="w-4 h-4" /> Temporada 2024 Iniciada
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic uppercase leading-tight">
            Nivel <span className="text-primary underline decoration-8 underline-offset-4">Épico</span> de Desarrollo
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-bold max-w-2xl mx-auto leading-tight italic">
            Elige a tu desarrollador y descubre las herramientas interactivas que han forjado para el mundo digital.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="bg-black hover:bg-black/90 text-white font-black italic uppercase rounded-none px-12 h-14 text-xl shadow-[8px_8px_0px_0px_rgba(59,130,246,0.5)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" asChild>
              <Link href="#team">Ver Personajes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cuadrícula del Equipo */}
      <section id="team" className="py-20 bg-slate-50 border-t-4 border-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-6">Selecciona tu Héroe</h2>
            <div className="h-2 w-32 bg-primary mb-6"></div>
            <p className="text-lg font-bold text-muted-foreground max-w-xl italic">
              Cada integrante tiene habilidades únicas y un módulo interactivo exclusivo. ¿A quién elegirás hoy?
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
      <footer className="mt-auto py-12 border-t-4 border-black bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 font-black text-2xl italic tracking-tighter">
              <Zap className="w-6 h-6 fill-yellow-400 text-black stroke-[3px]" />
              <span>DEV·ARENA</span>
            </div>
            <p className="text-xs font-black uppercase italic text-muted-foreground">
              © 2024 Creative League. Sin bugs, solo características épicas.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="border-2 border-black rounded-none hover:bg-black hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
