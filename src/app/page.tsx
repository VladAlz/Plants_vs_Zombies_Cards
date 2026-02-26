
import Link from "next/link";
import { teamMembers } from "@/lib/team-data";
import TeamMemberCard from "@/components/team-member-card";
import { Button } from "@/components/ui/button";
import { Code2, Github, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Encabezado */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Code2 className="w-6 h-6" />
            <span>Showcase del Equipo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">Sobre nosotros</Link>
            <Link href="#team" className="text-sm font-medium hover:text-primary transition-colors">El Equipo</Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Github className="w-4 h-4 mr-2" /> Repositorio
          </Button>
        </div>
      </header>

      {/* Sección Hero */}
      <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-primary text-sm font-bold mb-6">
            <Users className="w-4 h-4" /> Proyecto Colaborativo 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Conoce al Equipo Detrás de la <span className="text-primary">Innovación</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Bienvenidos a nuestro espacio de desarrollo colaborativo. Somos un equipo de desarrolladores 
            y diseñadores apasionados dedicados a crear experiencias web interactivas 
            que combinan utilidad con diseño.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" asChild>
              <Link href="#team">Explorar el trabajo</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link href="/members/alex-rivera">Ver Módulo de Ejemplo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cuadrícula del Equipo */}
      <section id="team" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Nuestro Equipo Creativo</h2>
            <div className="h-1 w-20 bg-accent rounded-full mb-4"></div>
            <p className="text-muted-foreground max-w-2xl">
              Cada miembro aporta un conjunto de habilidades único. Haz clic en un miembro para ver 
              su módulo interactivo específico y conocer más sobre su rol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="mt-auto py-12 border-t bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-lg text-primary opacity-80">
              <Code2 className="w-5 h-5" />
              <span>Showcase del Equipo</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Excelencia en Equipo. Construido con Next.js, Tailwind y Shadcn UI.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
