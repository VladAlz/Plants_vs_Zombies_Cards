"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; 
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioRef}
        src="/audio/Cancion portada.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-4 py-2 border-4 border-black bg-yellow-400 text-black font-black uppercase text-sm rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
        title="Activar/Desactivar música"
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-5 h-5" /> SILENCIO
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5" /> MÚSICA
          </>
        )}
      </button>
    </div>
  );
}
