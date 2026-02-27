import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { teamMembers } from "@/lib/team-data";
import GuessNumber from "@/components/modules/guess-number";
import PacmanGame from "@/components/modules/pacman-game";
import PdfViewer from "@/components/modules/pdf-viewer";
import SnakeGame from "@/components/modules/SnakeGame";
import BasketballPea from "@/components/modules/BasketballPea";
import GuitarHeroMini from "@/components/modules/GuitarHeroMini";
import SkateRunner from "@/components/modules/skate-runner";
import AnimatedStats from "@/components/animated-stats";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, Zap, Crosshair, Waves, Gamepad2 } from "lucide-react";

export default async function MemberPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  const renderTool = () => {
    switch (member.toolType) {
      case "converter":
        return member.id === "juan-arcos" ? <SnakeGame /> : <PacmanGame />;

      case "pdf-viewer":
        return (
          <div className="p-4 bg-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <Gamepad2 className="w-10 h-10 text-white" />
              <div>
                <h3 className="text-2xl font-bold text-white">Biblioteca de Juegos</h3>
                <p className="text-sm text-gray-400">Selecciona un juego para empezar.</p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="border-4 border-black rounded-lg overflow-hidden hover:shadow-2xl">
                <PdfViewer />
              </div>
            </div>
          </div>
        );
      
      case "game":
        if (member.id === "pablo-lozada") return <GuitarHeroMini />;
        if (member.id === "sebastian-acaro") return <SkateRunner />;
        if (member.id === 'vladimir-gonzalez') return <BasketballPea />;
        return <GuessNumber />;

      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-[#5d4037] flex flex-col">
      <nav className="border-b-[10px] border-black bg-[#2e7d32] sticky top-0 z-50 h-24">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Button variant="outline" asChild className="border-4 border-black bg-[#ff5252] text-white font-black uppercase italic hover:bg-[#ff1744] hover:text-white rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-14">
            <Link href="/">
              <ArrowLeft className="w-6 h-6 mr-2" /> REPLEGARSE
            </Link>
          </Button>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-white text-3xl font-black italic uppercase leading-none tracking-tighter">{member.name}</span>
              <span className="text-yellow-400 text-sm font-black uppercase tracking-widest">{member.role}</span>
            </div>
            <div className="bg-yellow-400 border-4 border-black px-6 py-2 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-3xl font-black">{member.cost}</span>
              <Sun className="w-8 h-8 fill-black text-black sun-glow" />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-10">
            <div className="wooden-panel p-10 transform -rotate-1">
              <div className="relative aspect-square w-full border-8 border-black mb-8 bg-[#81d4fa] overflow-hidden shadow-inner">
                <Image
                  src={member.cardImage}
                  alt={member.name}
                  fill
                  className="object-cover p-6"
                />
              </div>
              <div className="mb-8 text-center">
                <h1 className="text-5xl font-black italic uppercase text-white leading-tight mb-2 tracking-tighter drop-shadow-md">
                  {member.name}
                </h1>
                <div className="inline-block bg-[#ffeb3b] text-black text-xs font-bold px-4 py-2 uppercase border-2 border-black rotate-1">
                  ESPECIALISTA EN {member.role.split(' ')[0]}
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-black/20 p-6 border-l-8 border-yellow-400 italic font-bold text-white text-lg">
                  "{member.description}"
                </div>
                <div className="pt-8 border-t-4 border-white/20">
                  <h3 className="text-sm font-black uppercase italic mb-6 flex items-center gap-2 text-yellow-400">
                    <Zap className="w-5 h-5" /> HABILIDADES DE JARDÍN
                  </h3>
                  <AnimatedStats stats={member.stats} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="pvz-pool h-full min-h-[700px] flex flex-col p-10 lg:p-16 border-[12px] border-[#3e2723] rounded-3xl">
              <div className="wooden-panel p-8 mb-16 inline-block self-center text-center transform rotate-1">
                <h2 className="text-5xl font-black italic uppercase text-white flex items-center justify-center gap-4">
                  <Waves className="w-10 h-10 text-cyan-200" /> ZONA DE PRUEBAS
                </h2>
                <p className="text-white/80 font-bold italic mt-2 uppercase tracking-wide">
                  ENTRENA A {member.name} PARA REPELER LA OLEADA DE BUGS.
                </p>
              </div>
              <div className="flex-1 flex items-start justify-center relative z-10 w-full">
                <div className="w-full max-w-6xl bg-transparent p-0 border-none shadow-none">
                  {renderTool()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
