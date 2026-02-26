import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { teamMembers } from "@/lib/team-data";
import GuessNumber from "@/components/modules/guess-number";
import UnitConverter from "@/components/modules/unit-converter";
import BMICalculator from "@/components/modules/bmi-calculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, ShieldCheck, Zap, Crosshair } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Navegación de Batalla */}
      <nav className="border-b-[8px] border-black bg-black sticky top-0 z-50 h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Button variant="outline" asChild className="border-4 border-white bg-transparent text-white font-black uppercase italic hover:bg-white hover:text-black rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> ABORTAR MISIÓN
            </Link>
          </Button>
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
               <span className="text-white font-black italic uppercase leading-none">{member.name}</span>
               <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">{member.role}</span>
             </div>
             <div className="bg-yellow-400 border-4 border-black px-4 py-1 flex items-center gap-2">
               <span className="text-xl font-black">{member.cost}</span>
               <Sun className="w-5 h-5 fill-black" />
             </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Ficha de Personaje */}
          <div className="lg:col-span-4 space-y-8">
            <div className="concrete-panel p-8">
              <div className="relative aspect-square w-full border-4 border-black mb-6 bg-sky-200 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="mb-8">
                <h1 className="text-4xl font-black italic uppercase text-black leading-tight mb-2">{member.name}</h1>
                <div className="inline-block bg-green-600 text-white text-xs font-black px-3 py-1 uppercase border-2 border-black">
                  ESPECIALISTA EN {member.role.split(' ')[0]}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-black/5 p-4 border-l-8 border-black italic font-bold text-gray-700">
                  "{member.description}"
                </div>

                <div className="pt-6 border-t-4 border-black">
                  <h3 className="text-sm font-black uppercase italic mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" /> ATRIBUTOS DE COMBATE
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {member.stats.map(s => (
                      <div key={s.label} className="bg-white border-2 border-black p-2 text-center">
                        <div className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">{s.label}</div>
                        <div className="text-xl font-black italic">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campo de Pruebas */}
          <div className="lg:col-span-8">
            <div className="grass-pattern border-8 border-black p-8 lg:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] h-full min-h-[600px] flex flex-col">
              <div className="concrete-panel p-6 mb-10 inline-block self-center text-center">
                <h2 className="text-4xl font-black italic uppercase text-black flex items-center justify-center gap-3">
                  <Crosshair className="w-8 h-8" /> CAMPO DE PRUEBAS
                </h2>
                <p className="text-gray-700 font-bold italic mt-2">
                  PRUEBA LAS HABILIDADES DE {member.name} PARA FORTALECER EL JARDÍN.
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xl">
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