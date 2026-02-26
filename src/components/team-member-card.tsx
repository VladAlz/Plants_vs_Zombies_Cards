
import Link from "next/link";
import Image from "next/image";
import { Member } from "@/lib/team-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";

export default function TeamMemberCard({ member }: { member: Member }) {
  return (
    <Card className="overflow-hidden hover-lift flex flex-col h-full bg-white border-none">
      <div className="relative h-64 w-full">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          data-ai-hint="professional portrait"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {member.role}
          </span>
        </div>
      </div>
      <CardContent className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {member.description}
          </p>
        </div>
        <div className="mt-auto">
          <Button asChild className="w-full group bg-primary hover:bg-primary/90">
            <Link href={`/members/${member.id}`} className="flex items-center justify-center">
              Ver Página Personal
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
