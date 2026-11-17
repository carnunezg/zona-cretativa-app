"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { parseVideoUrl } from "@/lib/media";
import type { MediaItem } from "@/types/media";

/**
 * Reproduce un video sin penalizar la carga de la página:
 *  - Archivos subidos: solo se descargan los metadatos hasta que se presiona play.
 *  - YouTube / Vimeo: se muestra una miniatura y el reproductor se carga al hacer clic.
 */
export default function VideoPlayer({ item }: { item: MediaItem }) {
  const [playing, setPlaying] = useState(false);
  const label = item.title || "Video Zona Creativa";

  if (item.kind === "video") {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-cover bg-blue-950"
        aria-label={label}
      >
        {/* #t=0.1 hace que Safari muestre el primer cuadro como portada */}
        <source src={`${item.url}#t=0.1`} />
        Tu navegador no puede reproducir este video.
      </video>
    );
  }

  const embed = parseVideoUrl(item.url);
  if (!embed) return null;

  if (playing) {
    return (
      <iframe
        src={embed.embedUrl}
        title={label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="w-full h-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Reproducir: ${label}`}
      className="group relative w-full h-full bg-gradient-to-br from-blue-800 to-blue-500 focus:outline-none focus:ring-4 focus:ring-yellow-300"
    >
      {embed.thumbnail && (
        <Image
          src={embed.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-white/95 text-[#16A34A] flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:scale-110">
          <FaPlay className="ml-1" />
        </span>
      </span>
    </button>
  );
}
