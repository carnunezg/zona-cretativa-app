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
  /** Clases extra para la imagen original cuando se muestra sola */
  fallbackClassName?: string;
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
  fallbackClassName = "",
}: Props) {
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
    return <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl bg-white/70 shadow-xl">{fallbackNode}</div>;
  }

  // Sin contenido adicional: mismo aspecto que la versión original.
  if (slides.length === 1 && fallbackImage && slides[0].src === fallbackImage) {
    return (
      <div className="flex justify-center">
        <Image
          src={fallbackImage}
          alt={alt}
          width={520}
          height={420}
          className={`object-contain ${fallbackClassName}`}
          priority
        />
      </div>
    );
  }

  const index = Math.min(active, slides.length - 1);
  const current = slides[index];
  const go = (d: number) => setActive((index + d + slides.length) % slides.length);

  return (
    <div className="w-full">
      <div
        className={`group relative w-full aspect-[4/3] rounded-3xl overflow-hidden ${
          current.fit === "cover" ? "bg-white/20 shadow-xl ring-4 ring-white/70" : ""
        }`}
      >
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
            className={current.fit === "cover" ? "object-cover" : "object-contain"}
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
        <div className="mt-3 text-center text-white">
          {current.title && <p className="font-bold">{current.title}</p>}
          {current.description && (
            <p className="text-sm text-white/85">{current.description}</p>
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
            className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-white/70 transition ${
              i === index
                ? "ring-4 ring-yellow-400 scale-105"
                : "ring-2 ring-white/60 opacity-80 hover:opacity-100"
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
