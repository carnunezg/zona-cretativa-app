import Link from "next/link";
import { FaArrowRight, FaCalendarCheck, FaGift } from "react-icons/fa6";
import type { CatalogPack } from "@/types/catalog";
import type { MediaItem } from "@/types/media";
import { clp } from "@/lib/pricing";
import { toneFor } from "@/lib/tones";
import PackImage from "@/components/PackImage";
import FullPhoto from "@/components/media/FullPhoto";
import PackIncludes from "@/components/PackIncludes";

interface Props {
  pack: CatalogPack;
  /** Portada elegida en el portal. */
  cover?: MediaItem;
  /** Imagen de cada servicio del pack, en el orden de `pack.slots` (mosaico y lista «Incluye»). */
  productImages: (string | null)[];
}

export default function PackCard({ pack, cover, productImages }: Props) {
  const href = `/packs/${pack.slug}`;
  const tone = toneFor(pack.slug);
  const savings = pack.regularPrice - pack.price;
  const percent = pack.regularPrice > 0 ? Math.round((savings / pack.regularPrice) * 100) : 0;

  return (
    <article
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-slate-200/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-lift hover:ring-2 ${tone.ring}`}
    >
      <div className={`relative aspect-[5/4] w-full overflow-hidden bg-linear-to-br ${tone.bg}`}>
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          {cover ? (
            <FullPhoto src={cover.url} alt={cover.title || pack.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          ) : (
            <PackImage image={pack.image} productImages={productImages} alt={pack.title} />
          )}
        </div>
        {/* Degradado inferior para que se lean las etiquetas */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-brand-950/20 to-transparent" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
        />

        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase shadow-lg">
          <FaGift className="text-sun-300" /> Pack {pack.number}
        </span>
        {percent > 0 && (
          <span className="absolute top-3 right-3 flex h-14 w-14 rotate-12 flex-col items-center justify-center rounded-full bg-pink-600 text-white shadow-lg ring-4 ring-white/70 transition-transform duration-500 group-hover:rotate-0">
            <span className="text-base leading-none font-extrabold">-{percent}%</span>
          </span>
        )}
        {pack.age && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand-800 shadow-sm backdrop-blur">
            {pack.age}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.35rem] leading-tight font-extrabold text-brand-900">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[1.75rem] focus:outline-none focus-visible:after:ring-4 focus-visible:after:ring-sun-400"
          >
            {pack.name}
          </Link>
        </h3>

        <p className="mt-3 text-[11px] font-bold tracking-[0.12em] text-slate-400 uppercase">Incluye</p>
        <PackIncludes slots={pack.slots} images={productImages} className="mt-2" />

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-3 border-t border-dashed border-slate-200 pt-4">
            <div className="leading-none">
              {savings > 0 ? (
                <span className="block text-sm font-semibold text-slate-400 line-through">{clp(pack.regularPrice)}</span>
              ) : (
                <span className="block text-[11px] font-bold tracking-[0.12em] text-slate-400 uppercase">Precio pack</span>
              )}
              <span className="mt-1 block text-[1.45rem] font-extrabold whitespace-nowrap text-brand-800">{clp(pack.price)}</span>
            </div>
            <Link
              href={`/reservar?pack=${pack.slug}`}
              className="zc-btn zc-btn-green relative z-10 shrink-0 px-3.5 py-2.5 text-sm"
              aria-label={`Reservar ${pack.title}`}
            >
              <FaCalendarCheck /> Reservar
            </Link>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
              Ver detalle <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            {savings > 0 && <span className="text-xs font-bold text-emerald-600">Ahorras {clp(savings)}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
