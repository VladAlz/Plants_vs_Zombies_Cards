import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { teamMembers } from "@/lib/team-data";
import GuessNumber from "@/components/modules/guess-number";
import UnitConverter from "@/components/modules/unit-converter";
import BMICalculator from "@/components/modules/bmi-calculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Home, Sun, TreePine, ShieldCheck } from "lucide-react";

export default async function MemberPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const member = teamMembers.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  const renderTool = () => {
    switch (member.toolType) {
      case "game":
        return <GuessNumber />;
      case "converter":
        return <UnitConverter />;
      case "calculator":
        return <BMICalculator />;
      default:
        return null;
    }
  };

  const getToolName = (type: string) => {
    switch (type) {
      case "game": return "guisante-juego";
      case "converter": return "conversor-solar";
      case "calculator": return "nuez-calculadora";
      default: return "módulo";
    }
  };

  return (
    <div className="min-h-screen bg-[#55a630]">
      {/* Barra de Navegación Estilo Madera */}
      <nav className="border-b-8 border-black bg-[#795548] sticky top-0 z-10 h-20 shadow-xl">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="border-4 border-black bg-yellow-400 text-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Jardín
              </Link>
            </Button>
            <div className="hidden sm:flex items-center text-sm text-white/80 gap-2 font-black italic uppercase">
              <Link href="/" className="hover:text-yellow-400">Inicio</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-yellow-400">{member.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/20 px-4 py-2 border-2 border-black/40">
            <span className="text-2xl font-black text-yellow-400">{member.cost}</span>
            <Sun className="w-6 h-6 fill-yellow-400 text-black sun-glow" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Perfil de Planta */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#795548] border-8 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)]">
              <div className="relative w-full aspect-square mx-auto mb-6 border-4 border-black bg-green-200 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center space-y-2 mb-8">
                <h1 className="text-4xl font-black text-yellow-400 uppercase italic drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">{member.name}</h1>
                <p className="text-green-400 font-bold uppercase tracking-widest text-sm drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">{member.role}</p>
              </div>
              
              <div className="space-y-6 text-white">
                <div className="bg-black/20 p-4 border-2 border-black/30">
                  <h3 className="text-sm font-black text-yellow-400 uppercase mb-2 italic">Entrada del Almanaque</h3>
                  <p className="text-sm leading-relaxed font-bold italic">
                    "{member.description}"
                  </p>
                </div>

                <div className="pt-6 border-t-4 border-black flex flex-col gap-3">
                   <h3 className="text-sm font-black text-yellow-400 uppercase mb-1 italic">Habilidades Especiales</h3>
                   <div className="flex gap-4">
                     {member.stats.slice(0, 2).map(s => (
                       <div key={s.label} className="flex flex-col items-center gap-1">
                         <div className="w-12 h-12 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                           <ShieldCheck className="w-6 h-6 text-black" />
                         </div>
                         <span className="text-[10px] font-black uppercase text-center">{s.label}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-400 rounded-none p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black flex items-center gap-2 mb-2 uppercase italic text-black">
                <TreePine className="w-5 h-5" />
                Defensa de Código
              </h3>
              <p className="text-sm font-bold text-black italic">
                Este desarrollador planta utiliza su {getToolName(member.toolType)} para mantener la estabilidad del sistema contra oleadas de bugs.
              </p>
            </div>
          </div>

          {/* Área del Patio de Pruebas */}
          <div className="lg:col-span-8">
            <div className="bg-[#2b9348] border-8 border-black p-8 lg:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] h-full min-h-[600px] flex flex-col items-center justify-center garden-pattern border-dashed">
              <div className="max-w-xl w-full">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black mb-4 text-white uppercase italic drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Patio de Pruebas</h2>
                  <p className="text-white font-bold italic drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] bg-black/20 p-2">
                    Interactúa con el {getToolName(member.toolType)} de {member.name}. 
                    ¡Cada acción genera puntos de sol para tu proyecto!
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 border-4 border-black">
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
