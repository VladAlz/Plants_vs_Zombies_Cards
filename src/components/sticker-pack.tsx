"use client";
import { Member } from "@/lib/team-data";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface StickerPackProps {
  member: Member;
  setActivePack: (id: string | null) => void;
  isActive: boolean;
}

export default function StickerPack({ member, setActivePack, isActive }: StickerPackProps) {
  const router = useRouter();

  const openPack = () => {
    router.push(`/unboxing.html?member=${member.id}`);
  };

  return (
    <div onClick={openPack}>
      <div
        id={`pack-${member.id}`}
        className={cn(
          "pack",
          isActive && "active"
        )}
        style={{
          backgroundImage: `url(${member.packImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
      </div>
      <div className="pack-name">{member.name}</div>
    </div>
  );
}
