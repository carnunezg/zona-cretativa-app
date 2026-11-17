import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaChevronRight,
  FaCircleCheck,
  FaHandHoldingHeart,
  FaHouse,
  FaShieldHeart,
  FaTruckFast,
  FaWhatsapp,
} from "react-icons/fa6";
import ItemGallery from "@/components/media/ItemGallery";
import ItemVideos from "@/components/media/ItemVideos";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import { whatsappLink } from "@/lib/site";
import type { Tone } from "@/lib/tones";
import type { MediaItem } from "@/types/media";

export interface DetailFact {
  icon: IconType;
  label: string;
  value: string | null;
}

/** Servicio incluido en un pack (con enlace a su detalle). */
export interface IncludedItem {
  name: string;
  quantity: number;
  image: string;
  href: string;
}

interface Props {
  /** Fotos y videos de este servicio o pack (vienen del portal). */
  media: MediaItem[];
  /** «Servicios» o «Packs» (migas de pan y etiqueta superior). */
  section: { label: string; href: string };
  title: string;
  /** Etiqueta destacada sobre el título (p. ej. «Pack 1», «Por hora»). */
  badge?: { icon: IconType; label: string };
  image: string | null;
  /** Contenido alternativo si no hay imagen (mosaico de un pack). */
  imageFallback?: React.ReactNode;
  tone: Tone;
  priceLabel: string;
  price: string;
  priceSuffix?: string;
  oldPrice?: string;
  /** «Ahorras $11.000 (18%)» */
  savings?: string;
  description: string | null;
  facts: DetailFact[];
  includes?: IncludedItem[];
  features?: string[];
  reserveHref: string;
  whatsappMessage: string;
  whatsappNumber: string;
  /** Tarjetas sugeridas al final (otros packs o packs que incluyen este servicio). */
  related?: { title: string; subtitle: string; content: React.ReactNode };
}

const TRUST = [
  { icon: FaCircleCheck, label: "Confirmación inmediata", color: "text-emerald-500" },
  { icon: FaTruckFast, label: "Llevamos, instalamos y retiramos", color: "text-brand-500" },
  { icon: FaShieldHeart, label: "Reserva con solo $1.000", color: "text-pink-500" },
];

/** Plantilla común para el detalle de servicios y packs. */
export default function ItemDetail({
  media,
  section,
  title,
  badge,
  image,
  imageFallback,
  tone,
  priceLabel,
  price,
  priceSuffix,
  oldPrice,
  savings,
  description,
  facts,
  includes,
  features,
  reserveHref,
  whatsappMessage,
  whatsappNumber,
  related,
}: Props) {
  const shownFacts = facts.filter((f) => f.value);
  const BadgeIcon = badge?.icon;

  return (
    <>
      {/* Encabezado */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand-950 via-brand-800 to-brand-600 px-4 pt-28 pb-36 sm:px-6 sm:pt-32 sm:pb-40">
        <span aria-hidden className="animate-float-slow pointer-events-none absolute -top-24 -right-20 h-80 w-80 rounded-full bg-sun-400/25 blur-3xl" />
        <span aria-hidden className="animate-float pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
        <span aria-hidden className="animate-float-slow absolute top-[35%] right-[12%] hidden h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 md:block" />

        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Ruta" className="animate-pop flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <FaHouse className="text-xs" /> Inicio
            </Link>
            <FaChevronRight className="text-[10px] text-white/40" />
            <Link href={section.href} className="transition-colors hover:text-white">
              {section.label}
            </Link>
            <FaChevronRight className="text-[10px] text-white/40" />
            <span className="font-semibold text-white" aria-current="page">
              {title}
            </span>
          </nav>

          <div className="animate-pop mt-6 flex flex-wrap items-center gap-2" style={{ animationDelay: "80ms" }}>
            {badge && BadgeIcon && (
              <span className="inline-flex items-center gap-2 rounded-full bg-sun-400 px-3.5 py-1 text-xs font-extrabold tracking-wide text-brand-950 uppercase shadow-lg">
                <BadgeIcon /> {badge.label}
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1 text-xs font-bold text-emerald-200 ring-1 ring-white/20 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Disponible para reservar
            </span>
          </div>
          <h1 className="animate-pop mt-3 max-w-3xl text-4xl leading-[1.05] font-extrabold text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "140ms" }}>
            {title}
          </h1>
        </div>

        <div className="absolute -bottom-px left-0 w-full leading-none" aria-hidden>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-[50px] w-full sm:h-[80px]">
            <path d="M0,50 C300,100 600,0 900,40 C1150,72 1300,90 1440,60 L1440,100 L0,100 Z" fill="#f6f8fd" />
          </svg>
        </div>
      </section>

      {/* Contenido */}
      <section className="relative -mt-28 px-4 pb-6 sm:-mt-32 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
          <Reveal className="lg:sticky lg:top-28">
            <ItemGallery media={media} fallbackImage={image} fallbackNode={imageFallback} alt={title} toneBg={tone.bg} toneBlob={tone.blob} />
          </Reveal>

          <Reveal delay={0.08} className="overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-slate-200/70">
            {/* Precio */}
            <div className="relative overflow-hidden border-b border-slate-100 bg-linear-to-br from-brand-50 via-white to-sun-50/60 p-6 sm:p-8">
              <span aria-hidden className={`absolute -top-12 -right-10 h-36 w-36 rounded-full ${tone.blob} blur-2xl`} />
              <p className="relative text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">{priceLabel}</p>
              <div className="relative mt-1.5 flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="text-4xl font-extrabold text-brand-800 sm:text-5xl">
                  {price}
                  {priceSuffix && <span className="text-lg font-bold text-slate-400"> {priceSuffix}</span>}
                </span>
                {oldPrice && <span className="mb-1.5 text-lg font-semibold text-slate-400 line-through">{oldPrice}</span>}
              </div>
              {savings && (
                <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                  <FaHandHoldingHeart /> {savings}
                </span>
              )}
              <p className="relative mt-3 text-xs text-slate-500">El traslado se cotiza aparte según tu comuna.</p>
            </div>

            <div className="space-y-7 p-6 sm:p-8">
              {description && <p className="text-base leading-relaxed whitespace-pre-line text-slate-600">{description}</p>}

              {shownFacts.length > 0 && (
                <ul className={`grid gap-3 ${shownFacts.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {shownFacts.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ${tone.accent}`}>
                        <Icon />
                      </span>
                      <p className="mt-2.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">{label}</p>
                      <p className="mt-0.5 text-sm leading-snug font-bold text-ink">{value}</p>
                    </li>
                  ))}
                </ul>
              )}

              {includes && includes.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-extrabold text-brand-900">Este pack incluye</p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {includes.map((item) => (
                      <li key={item.href + item.name}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-3 rounded-2xl p-2 ring-1 ring-slate-200 transition hover:bg-brand-50/50 hover:ring-brand-300"
                        >
                          <span className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-linear-to-br ${tone.bg}`}>
                            <Image src={item.image} alt="" fill sizes="48px" className="object-contain p-1" />
                          </span>
                          <span className="min-w-0 flex-1 text-sm leading-tight font-semibold text-ink">{item.name}</span>
                          {item.quantity > 1 && (
                            <span className="rounded-full bg-brand-700 px-2 py-0.5 text-xs font-extrabold text-white">×{item.quantity}</span>
                          )}
                          <FaChevronRight className="mr-1 text-xs text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {features && features.length > 0 && (
                <div>
                  <p className="mb-3 text-sm font-extrabold text-brand-900">Características</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <FaCircleCheck className="mt-0.5 shrink-0 text-emerald-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Acciones */}
              <div className="space-y-3">
                <Link href={reserveHref} className="zc-btn zc-btn-green zc-shine group w-full py-4 text-base">
                  <FaCalendarCheck className="text-lg" /> Reservar en línea
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={whatsappLink(whatsappMessage, whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-emerald-500 px-6 py-3 font-bold text-emerald-700 transition hover:bg-emerald-50"
                >
                  <FaWhatsapp className="text-lg" /> Consultar por WhatsApp
                </a>
              </div>

              <ul className="grid gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-3 sm:gap-3">
                {TRUST.map(({ icon: Icon, label, color }) => (
                  <li key={label} className="flex items-center gap-2 sm:flex-col sm:text-center">
                    <Icon className={`shrink-0 text-lg ${color}`} />
                    <span className="text-xs leading-snug font-semibold">{label}</span>
                  </li>
                ))}
              </ul>

              <p className="text-center text-xs text-slate-500">
                Revisa nuestros{" "}
                <Link href="/terminos" className="font-semibold underline hover:text-brand-600">
                  términos y condiciones
                </Link>{" "}
                y los{" "}
                <Link href="/condiciones" className="font-semibold underline hover:text-brand-600">
                  requisitos del espacio
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>

        <div className="px-0">
          <ItemVideos media={media} />
        </div>
      </section>

      {related && (
        <section className="px-4 pt-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">{related.title}</h2>
              <p className="mt-2 text-slate-500">{related.subtitle}</p>
            </Reveal>
            {related.content}
          </div>
        </section>
      )}

      <CtaBand whatsappNumber={whatsappNumber} />
    </>
  );
}
