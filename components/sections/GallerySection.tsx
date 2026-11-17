"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CatalogPack, CatalogProduct } from "@/types/catalog";
import type { MediaItem } from "@/types/media";
import Lightbox, { type LightboxSlide } from "@/components/media/Lightbox";
import VideoPlayer from "@/components/media/VideoPlayer";
import SectionHeading from "@/components/SectionHeading";

const MAX_PHOTOS = 8;
const MAX_VIDEOS = 3;

/**
 * Galería de la portada: fotos y videos de la sección «Galería» del portal y
 * los marcados como «Destacar en inicio» en servicios y packs.
 * Si no hay ninguno, la sección no se muestra.
 */
export default function GallerySection({
  media,
  products,
  packs,
}: {
  media: MediaItem[];
  products: CatalogProduct[];
  packs: CatalogPack[];
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { photos, videos, slides, infoOf } = useMemo(() => {
    const infoOf = (m: MediaItem): { name: string; href?: string } | null => {
      if (m.section === "gallery") return { name: m.title || "Zona Creativa" };
      if (m.product_id) {
        const p = products.find((x) => x.id === m.product_id);
        return p ? { name: p.name, href: `/productos/${p.slug}` } : null;
      }
      if (m.pack_id) {
        const p = packs.find((x) => x.id === m.pack_id);
        return p ? { name: p.title, href: `/packs/${p.slug}` } : null;
      }
      return null;
    };
    const shown = media.filter((m) => (m.section === "gallery" || m.featured) && infoOf(m));
    const photos = shown.filter((m) => m.kind === "image").slice(0, MAX_PHOTOS);
    const videos = shown.filter((m) => m.kind !== "image").slice(0, MAX_VIDEOS);
    const slides: LightboxSlide[] = photos.map((m) => {
      const info = infoOf(m)!;
      return {
        src: m.url,
        alt: m.title || info.name,
        title: m.title || info.name,
        description: m.description,
        href: info.href,
        hrefLabel: info.href ? `Ver ${info.name}` : undefined,
      };
    });
    return { photos, videos, slides, infoOf };
  }, [media, products, packs]);

  if (photos.length === 0 && videos.length === 0) return null;

  return (
    <section id="galeria" className="relative w-full scroll-mt-28 py-14 sm:py-20">
      <div className="relative max-w-6xl mx-auto px-4">
        {photos.length > 0 && (
          <>
            <SectionHeading eyebrow="Galería" title="Así se viven nuestras fiestas" subtitle="Momentos reales de celebraciones con Zona Creativa." />

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {photos.map((m, i) => {
                const info = infoOf(m)!;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`Ver foto: ${m.title || info.name}`}
                    className="group relative aspect-square w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] overflow-hidden rounded-2xl shadow-md hover:shadow-xl border-4 border-white bg-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
                  >
                    <Image
                      src={m.url}
                      alt={m.title || info.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-900/85 to-transparent px-3 pt-8 pb-2 text-left text-white text-xs sm:text-sm font-bold">
                      {m.title || info.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {videos.length > 0 && (
          <>
            <div className={photos.length > 0 ? "mt-14" : ""}>
              <SectionHeading eyebrow="Videos" title="Míralos en acción" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {videos.map((v) => {
                const info = infoOf(v)!;
                return (
                  <figure
                    key={v.id}
                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-2xl shadow-md border border-slate-200 p-3"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <VideoPlayer item={v} />
                    </div>
                    <figcaption className="pt-3 text-center">
                      <p className="font-extrabold text-[#1E3A8A]">{v.title || info.name}</p>
                      {v.description && (
                        <p className="text-sm text-[#475569]">{v.description}</p>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Lightbox slides={slides} index={lightbox} onChange={setLightbox} />
    </section>
  );
}
