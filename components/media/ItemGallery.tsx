"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlassPlus } from "react-icons/fa6";
import type { MediaItem } from "@/types/media";
import Lightbox, { type LightboxSlide } from "./Lightbox";

interface Props {
  /** Fotos y videos de este servicio o pack (vienen del portal). */
  media: MediaItem[];
  /** Imagen por defecto del servicio o pack */
  fallbackImage: string | null;
  /** Contenido alternativo cuando no hay imagen por defecto (p. ej. mosaico del pack). */
  fallbackNode?: React.ReactNode;
  alt: string;
  /** Fondo degradado del marco (tono de la tarjeta). */
  toneBg?: string;
  /** Círculo decorativo detrás de la imagen original. */
  toneBlob?: string;
}

/**
 * Galería del detalle de producto/pack.
 * - Sin fotos subidas: muestra la imagen original tal como antes.
 * - Con fotos: la portada elegida en el panel pasa a ser la principal y la
 *   imagen original queda disponible dentro de la galería.
 */
export default function ItemGallery({
  media,
  fallbackImage,
  fallbackNode,
  alt,
  toneBg = "from-brand-100 via-brand-50 to-white",
  toneBlob = "bg-brand-200/70",
}: Props) {
  const frame = `relative w-full aspect-[5/4] overflow-hidden rounded-[2rem] bg-linear-to-br ${toneBg} shadow-lift ring-1 ring-slate-200/70`;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const slides = useMemo<LightboxSlide[]>(() => {
    const photos = media.filter((m) => m.kind === "image");
    const toSlide = (m: (typeof photos)[number]): LightboxSlide => ({
      src: m.url,
      alt: m.title || alt,
      title: m.title,
      description: m.description,
      fit: "cover",
    });
    const cover = photos.find((m) => m.is_cover);
    const rest = photos.filter((m) => m !== cover).map(toSlide);
    if (!fallbackImage) return cover ? [toSlide(cover), ...rest] : rest;
    const original: LightboxSlide = { src: fallbackImage, alt, fit: "contain" };
    return cover ? [toSlide(cover), ...rest, original] : [original, ...rest];
  }, [media, fallbackImage, alt]);

  // Sin fotos ni imagen por defecto: mosaico del pack.
  if (slides.length === 0) {
    return <div className={`${frame} bg-white`}>{fallbackNode}</div>;
  }

  // Sin contenido adicional: mismo aspecto que la versión original.
  if (slides.length === 1 && fallbackImage && slides[0].src === fallbackImage) {
    return (
      <div className={frame}>
        <span aria-hidden className={`absolute top-1/2 left-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full ${toneBlob}`} />
        <span aria-hidden className="absolute bottom-6 left-1/2 h-6 w-1/2 -translate-x-1/2 rounded-[50%] bg-slate-900/10 blur-lg" />
        <div className="animate-float-slow absolute inset-0">
          <Image
            src={fallbackImage}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8 drop-shadow-[0_22px_26px_rgba(15,26,58,0.25)] sm:p-12"
          />
        </div>
      </div>
    );
  }

  const index = Math.min(active, slides.length - 1);
  const current = slides[index];
  const go = (d: number) => setActive((index + d + slides.length) % slides.length);

  return (
    <div className="w-full">
      <div className={`group ${frame}`}>
        <button
          type="button"
          onClick={() => setLightbox(index)}
          aria-label="Ver imagen en grande"
          className="absolute inset-0 cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 rounded-3xl"
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={current.fit === "cover" ? "object-cover" : "object-contain p-8 drop-shadow-[0_22px_26px_rgba(15,26,58,0.25)]"}
          />
          <span className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 text-[#1E3A8A] flex items-center justify-center shadow-md opacity-90 group-hover:scale-110 transition">
            <FaMagnifyingGlassPlus />
          </span>
        </button>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1E3A8A] flex items-center justify-center shadow-md transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Foto siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1E3A8A] flex items-center justify-center shadow-md transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          <FaChevronRight />
        </button>
      </div>

      {(current.title || current.description) && (
        <div className="mt-3 text-center text-slate-700">
          {current.title && <p className="font-bold">{current.title}</p>}
          {current.description && (
            <p className="text-sm text-slate-500">{current.description}</p>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {slides.map((s, i) => (
          <button
            key={s.src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === index}
            className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-white transition ${
              i === index
                ? "ring-[3px] ring-brand-500 scale-105 shadow-card"
                : "ring-1 ring-slate-200 opacity-75 hover:opacity-100"
            }`}
          >
            <Image
              src={s.src}
              alt=""
              fill
              sizes="96px"
              className={s.fit === "cover" ? "object-cover" : "object-contain p-1"}
            />
          </button>
        ))}
      </div>

      <Lightbox slides={slides} index={lightbox} onChange={setLightbox} />
    </div>
  );
}
