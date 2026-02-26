import Link from "next/link";
import { teamMembers } from "@/lib/team-data";
import StickerPack from "@/components/sticker-pack";
import { Button } from "@/components/ui/button";
import { Sun, ShieldAlert, Skull, Waves, ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#263238]">
      {/* Header Estilo Menu GW */}
      <nav className="h-20 bg-[#37474f] border-b-8 border-black sticky top-0 z-50">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#76ff03] p-2 border-4 border-black">
              <Skull className="w-8 h-8 text-black" />
            </div>
            <div>
              <h2 className="text-white font-black italic uppercase leading-none text-xl">STICKER SHOP</h2>
              <p className="text-[#76ff03] text-xs font-bold uppercase tracking-widest">OBTÉN NUEVOS DEFENSORES</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-black/40 px-6 py-2 border-4 border-black">
              <span className="text-yellow-400 font-black text-2xl">127,880</span>
              <Sun className="w-6 h-6 fill-yellow-400 text-yellow-400 sun-glow" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center bg-gradient-to-b from-[#0288d1] to-[#01579b] overflow-hidden border-b-[16px] border-black">
        <div className="container mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-400 border-4 border-black text-black text-xs font-black uppercase mb-8 tracking-widest animate-bounce">
            <ShieldAlert className="w-5 h-5" /> ¡NUEVOS PACKS DISPONIBLES!
          </div>
          
          <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-7xl md:text-9xl garden-text leading-none select-none">GARDEN</h1>
            <h1 className="text-6xl md:text-8xl warfare-text -mt-4 select-none">DEV·WARE</h1>
          </div>

          <p className="text-xl md:text-2xl text-white font-black italic max-w-2xl mx-auto mb-12 drop-shadow-lg">
            GOLPEA LOS SOBRES PARA RECLUTAR A LA <br/> 
            <span className="text-[#76ff03] uppercase">LEGIÓN DE DESARROLLADORES ELITE</span>
          </p>

          <Button size="lg" className="bg-[#76ff03] hover:bg-[#64dd17] text-black border-4 border-black font-black italic uppercase rounded-none px-12 h-20 text-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all" asChild>
            <Link href="#shop">IR A LA TIENDA</Link>
          </Button>
        </div>
        
        {/* Decoración */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-20 p-10 transform -rotate-12">
            {Array.from({length: 12}).map((_, i) => (
              <Skull key={i} className="w-20 h-20 text-white" />
            ))}
          </div>
        </div>
      </section>

      {/* The Shop - Grid de Sobres */}
      <section id="shop" className="py-24 pvz-lawn relative">
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-[#37474f] border-[8px] border-black p-8 mb-20 text-center transform -rotate-1 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-5xl font-black italic uppercase text-white mb-2 flex items-center justify-center gap-4">
              <ShoppingCart className="w-10 h-10 text-yellow-400" /> SOBRES DE RECLUTAMIENTO
            </h2>
            <p className="text-lg font-bold text-[#76ff03] italic uppercase">
              ¡Garantizado al menos un programador Raro o Consumible de Backend!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {teamMembers.map((member) => (
              <StickerPack key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-white border-t-[12px] border-[#76ff03]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-4xl garden-text">GARDEN</span>
            <span className="text-2xl warfare-text -mt-2">DEV·FARE</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm font-black uppercase italic text-yellow-400 mb-2">
              TIENDA DE PEGATINAS DE DAVE EL LOCO
            </p>
            <p className="text-xs font-bold opacity-40 uppercase tracking-widest">
              © 2024 Garden Dev-Fare Stickers. Todos los derechos de sol reservados.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#00b4d8] p-3 border-4 border-white">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <div className="bg-[#76ff03] p-3 border-4 border-white">
              <Sun className="w-8 h-8 text-black fill-black" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
