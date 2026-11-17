import Link from "next/link";
import type { IconType } from "react-icons";
import { FaCalendarCheck, FaCircleCheck, FaWhatsapp, FaArrowLeft, FaStar } from "react-icons/fa6";
import ItemGallery from "@/components/media/ItemGallery";
import ItemVideos from "@/components/media/ItemVideos";
import { whatsappLink } from "@/lib/site";
import type { MediaItem } from "@/types/media";

export interface DetailFact {
  icon: IconType;
  label: string;
  value: string | null;
}

interface Props {
  /** Fotos y videos de este servicio o pack (vienen del portal). */
  media: MediaItem[];
  title: string;
  image: string | null;
  /** Contenido alternativo si no hay imagen (mosaico de un pack). */
  imageFallback?: React.ReactNode;
  price: string;
  oldPrice?: string;
  description: string | null;
  facts: DetailFact[];
  features?: string[];
  reserveHref: string;
  whatsappMessage: string;
  whatsappNumber: string;
  backHref: string;
  backLabel: string;
}

/** Plantilla común para el detalle de servicios y packs. */
export default function ItemDetail({
  media,
  title,
  image,
  imageFallback,
  price,
  oldPrice,
  description,
  facts,
  features,
  reserveHref,
  whatsappMessage,
  whatsappNumber,
  backHref,
  backLabel,
}: Props) {
  const shownFacts = facts.filter((f) => f.value);
  return (
    <section className="flex-1 pt-28 sm:pt-32 pb-16 px-4 bg-gradient-to-b from-blue-800/95 via-blue-400/90 to-blue-100/85">
      <div className="max-w-6xl mx-auto">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm sm:text-base font-semibold mb-6 transition-colors"
        >
          <FaArrowLeft />
          {backLabel}
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">
          <ItemGallery media={media} fallbackImage={image} fallbackNode={imageFallback} alt={title} />

          <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-xl md:sticky md:top-28">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mb-2">
              {title}
            </h1>

            <p className="flex flex-wrap items-baseline gap-x-3 mb-3">
              {oldPrice && (
                <span className="text-base sm:text-lg text-slate-500 line-through font-semibold">
                  CLP {oldPrice}
                </span>
              )}
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#F59E0B]">
                {price}
              </span>
            </p>

            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 rounded-full mb-4">
              <FaCircleCheck className="text-sm sm:text-base" />
              Disponible para reservar
            </span>

            {description && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5 whitespace-pre-line">
                {description}
              </p>
            )}

            {shownFacts.length > 0 && (
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-700 mb-6">
                {shownFacts.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon className="text-[#2563EB] text-base sm:text-lg mt-0.5 shrink-0" />
                    <span>
                      <b>{label}:</b> {value}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {features && features.length > 0 && (
              <div className="mb-6">
                <p className="font-bold text-[#2563EB] mb-2">Características</p>
                <ul className="space-y-1.5 text-sm sm:text-base text-slate-700">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <FaStar className="text-yellow-400 mt-1 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href={reserveHref}
                className="
                  inline-flex items-center justify-center gap-2
                  w-full sm:w-auto
                  bg-[#16A34A] hover:bg-[#15803D]
                  text-white font-bold
                  px-5 sm:px-6
                  py-3
                  rounded-xl
                  transition-colors
                  text-sm sm:text-base
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300
                "
              >
                <FaCalendarCheck className="text-lg" />
                Reservar en línea
              </Link>
              <a
                href={whatsappLink(whatsappMessage, whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  w-full sm:w-auto
                  bg-white hover:bg-green-50
                  border-2 border-[#16A34A]
                  text-[#15803D] font-bold
                  px-5 sm:px-6
                  py-2.5
                  rounded-xl
                  transition-colors
                  text-sm sm:text-base
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300
                "
              >
                <FaWhatsapp className="text-lg" />
                Consultar por WhatsApp
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Revisa nuestros{" "}
              <Link href="/terminos" className="underline hover:text-[#2563EB]">
                términos y condiciones
              </Link>{" "}
              y los{" "}
              <Link href="/condiciones" className="underline hover:text-[#2563EB]">
                requisitos del espacio
              </Link>
              .
            </p>
          </div>
        </div>

        <ItemVideos media={media} />
      </div>
    </section>
  );
}
