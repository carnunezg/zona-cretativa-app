import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarCheck, FaChild, FaClock, FaGift, FaHourglassHalf, FaRulerCombined } from "react-icons/fa6";
import type { CatalogProduct } from "@/types/catalog";
import type { MediaItem } from "@/types/media";
import { clp } from "@/lib/pricing";
import { toneFor } from "@/lib/tones";

interface Props {
  product: CatalogProduct;
  /** Portada elegida en el portal (si no hay, se usa la imagen por defecto). */
  cover?: MediaItem;
}

export default function ProductCard({ product, cover }: Props) {
  const href = `/productos/${product.slug}`;
  const tone = toneFor(product.slug);
  const hourly = product.billingType === "hour";
  const amount = hourly ? product.hourlyRate : product.unitPrice;
  const included = !hourly && product.unitPrice === 0;

  return (
    <article
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-slate-200/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-lift hover:ring-2 ${tone.ring}`}
    >
      {/* Imagen sobre fondo de color con círculo decorativo */}
      <div className={`relative aspect-[5/4] w-full overflow-hidden bg-linear-to-br ${tone.bg}`}>
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.title || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        ) : (
          <>
            <span
              aria-hidden
              className={`absolute top-1/2 left-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full ${tone.blob} transition-transform duration-700 group-hover:scale-110`}
            />
            <span aria-hidden className="absolute bottom-3 left-1/2 h-4 w-1/2 -translate-x-1/2 rounded-[50%] bg-slate-900/10 blur-md" />
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-6 drop-shadow-[0_14px_18px_rgba(15,26,58,0.22)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.07] group-hover:-rotate-2"
            />
          </>
        )}
        {/* Brillo que recorre la imagen al pasar el mouse */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
        />
        {hourly && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-violet-700 uppercase shadow-sm backdrop-blur">
            <FaHourglassHalf /> Por hora
          </span>
        )}
        {included && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-emerald-700 uppercase shadow-sm backdrop-blur">
            <FaGift /> Incluido
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.35rem] leading-tight font-extrabold text-brand-900">
          {/* Enlace "estirado": toda la tarjeta es clicable y accesible por teclado */}
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[1.75rem] focus:outline-none focus-visible:after:ring-4 focus-visible:after:ring-sun-400"
          >
            {product.name}
          </Link>
        </h3>

        {product.description && <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">{product.description}</p>}

        {(product.dimensions || product.duration || product.age) && (
          <ul className="mt-3 space-y-1.5 text-[13px] text-slate-600">
            {product.dimensions && (
              <li className="flex items-start gap-2">
                <FaRulerCombined className={`mt-0.5 shrink-0 ${tone.accent}`} /> {product.dimensions}
              </li>
            )}
            {(product.duration || product.age) && (
              <li className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {product.duration && (
                  <span className="inline-flex items-center gap-2">
                    <FaClock className={tone.accent} /> {product.duration}
                  </span>
                )}
                {product.age && (
                  <span className="inline-flex items-center gap-2">
                    <FaChild className={tone.accent} /> {product.age}
                  </span>
                )}
              </li>
            )}
          </ul>
        )}

        {/* Precio y botón */}
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-3 border-t border-dashed border-slate-200 pt-4">
            <div className="leading-none">
              <span className="block text-[11px] font-bold tracking-[0.12em] whitespace-nowrap text-slate-400 uppercase">
                {included ? "Sin costo" : hourly ? "Por hora" : "Valor"}
              </span>
              <span className="mt-1.5 block text-[1.45rem] font-extrabold whitespace-nowrap text-brand-800">
                {included ? "Incluido" : amount ? clp(amount) : "Consultar"}
                {hourly && amount ? <span className="ml-0.5 text-xs font-semibold text-slate-400">/h</span> : null}
              </span>
            </div>
            <Link
              href={`/reservar?servicio=${product.slug}`}
              className="zc-btn zc-btn-green relative z-10 shrink-0 px-3.5 py-2.5 text-sm"
              aria-label={`Reservar ${product.name}`}
            >
              <FaCalendarCheck /> Reservar
            </Link>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-colors group-hover:text-brand-800">
            Ver detalle <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
