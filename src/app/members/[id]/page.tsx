
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { teamMembers } from "@/lib/team-data";
import GuessNumber from "@/components/modules/guess-number";
import UnitConverter from "@/components/modules/unit-converter";
import BMICalculator from "@/components/modules/bmi-calculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Home, Layout, Mail, Linkedin, Twitter } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Link>
            </Button>
            <div className="hidden sm:flex items-center text-sm text-muted-foreground gap-2">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-foreground">{member.name}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/"><Home className="w-5 h-5" /></Link>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Profile Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden ring-4 ring-primary/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-black">{member.name}</h1>
                <p className="text-primary font-bold uppercase tracking-widest text-sm">{member.role}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Biography</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div className="pt-6 border-t flex flex-col gap-3">
                   <h3 className="text-sm font-bold text-muted-foreground uppercase mb-1">Connect</h3>
                   <div className="flex gap-2">
                     <Button variant="secondary" size="icon" className="rounded-xl"><Mail className="w-4 h-4" /></Button>
                     <Button variant="secondary" size="icon" className="rounded-xl"><Linkedin className="w-4 h-4" /></Button>
                     <Button variant="secondary" size="icon" className="rounded-xl"><Twitter className="w-4 h-4" /></Button>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <Layout className="w-4 h-4 text-primary" />
                Individual Task
              </h3>
              <p className="text-sm text-muted-foreground">
                Assigned to build a {member.toolType} module focused on user interactivity and data handling.
              </p>
            </div>
          </div>

          {/* Interactive Module Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border h-full min-h-[600px] flex flex-col items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="max-w-xl w-full">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Interactive Showcase</h2>
                  <p className="text-muted-foreground">
                    Try out the {member.toolType} built by {member.name.split(' ')[0]}. 
                    Enter your data below to see the module in action.
                  </p>
                </div>
                {renderTool()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
