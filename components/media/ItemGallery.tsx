"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlassPlus } from "react-icons/fa6";
import type { MediaItem } from "@/types/media";
import Lightbox, { type LightboxSlide } from "./Lightbox";
import FullPhoto from "./FullPhoto";

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

/** Elemento de la galería: una foto, o el mosaico con los servicios del pack. */
type GalleryItem = { type: "image"; slide: LightboxSlide } | { type: "node"; key: string };

/**
 * Galería del detalle de producto/pack.
 * - Siempre empieza con la imagen original del servicio o, en los packs, con el
 *   mosaico de los servicios que incluye (así el cliente ve qué trae).
 * - Después siguen las fotos subidas desde el portal (primero la portada).
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

  const items = useMemo<GalleryItem[]>(() => {
    const photos = media.filter((m) => m.kind === "image");
    const toItem = (m: (typeof photos)[number]): GalleryItem => ({
      type: "image",
      slide: { src: m.url, alt: m.title || alt, title: m.title, description: m.description, fit: "cover" },
    });
    const cover = photos.find((m) => m.is_cover);
    const uploaded = [...(cover ? [cover] : []), ...photos.filter((m) => m !== cover)].map(toItem);
    const first: GalleryItem[] = fallbackImage
      ? [{ type: "image", slide: { src: fallbackImage, alt, fit: "contain" } }]
      : fallbackNode
        ? [{ type: "node", key: "mosaico" }]
        : [];
    return [...first, ...uploaded];
  }, [media, fallbackImage, fallbackNode, alt]);

  // Solo las fotos se abren en grande (el mosaico no).
  const slides = useMemo(() => items.flatMap((it) => (it.type === "image" ? [it.slide] : [])), [items]);

  // Sin fotos subidas: mosaico del pack, tal como antes.
  if (items.length === 0 || (items.length === 1 && items[0].type === "node")) {
    return <div className={`${frame} bg-white`}>{fallbackNode}</div>;
  }

  // Sin fotos subidas: imagen original con el mismo aspecto de siempre.
  if (items.length === 1 && fallbackImage) {
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

  const index = Math.min(active, items.length - 1);
  const item = items[index];
  const current = item.type === "image" ? item.slide : null;
  const go = (d: number) => setActive((index + d + items.length) % items.length);

  return (
    <div className="w-full">
      <div className={`group ${frame} ${current ? "" : "bg-white"}`}>
        {!current && <div className="absolute inset-0">{fallbackNode}</div>}
        {current && (
        <button
          type="button"
          onClick={() => setLightbox(slides.indexOf(current))}
          aria-label="Ver imagen en grande"
          className="absolute inset-0 cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 rounded-3xl"
        >
          {current.fit === "cover" ? (
            // Fotos subidas: completas, sin recortar (verticales u horizontales).
            <FullPhoto key={current.src} src={current.src} alt={current.alt} priority={index === 0} sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8 drop-shadow-[0_22px_26px_rgba(15,26,58,0.25)]"
            />
          )}
          <span className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 text-[#1E3A8A] flex items-center justify-center shadow-md opacity-90 group-hover:scale-110 transition">
            <FaMagnifyingGlassPlus />
          </span>
        </button>
        )}

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

      {current && (current.title || current.description) && (
        <div className="mt-3 text-center text-slate-700">
          {current.title && <p className="font-bold">{current.title}</p>}
          {current.description && (
            <p className="text-sm text-slate-500">{current.description}</p>
          )}
        </div>
      )}

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {items.map((it, i) => (
          <button
            key={(it.type === "image" ? it.slide.src : it.key) + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={it.type === "node" ? "Ver servicios incluidos" : `Ver foto ${i + 1}`}
            aria-current={i === index}
            className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-white transition ${
              i === index
                ? "ring-[3px] ring-brand-500 scale-105 shadow-card"
                : "ring-1 ring-slate-200 opacity-75 hover:opacity-100"
            }`}
          >
            {it.type === "node" ? (
              <span className="pointer-events-none absolute inset-0">{fallbackNode}</span>
            ) : (
              <Image
                src={it.slide.src}
                alt=""
                fill
                sizes="96px"
                className={it.slide.fit === "cover" ? "object-cover" : "object-contain p-1"}
              />
            )}
          </button>
        ))}
      </div>

      <Lightbox slides={slides} index={lightbox} onChange={setLightbox} />
    </div>
  );
}
