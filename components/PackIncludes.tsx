import Image from "next/image";
import { FaGift } from "react-icons/fa6";
import type { PackSlot } from "@/types/catalog";

/**
 * Lo que incluye un pack, con la foto de cada servicio (los clientes
 * reconocen los servicios por la imagen más que por el nombre).
 * - «chips»: pastillas con foto pequeña y nombre (tarjetas de pack).
 * - «tiles»: fotos más grandes en grilla con el nombre debajo (formulario de reserva).
 */
export default function PackIncludes({
  slots,
  images,
  variant = "chips",
  className = "",
}: {
  slots: PackSlot[];
  /** Imagen de cada componente, en el mismo orden que `slots`. */
  images: (string | null)[];
  variant?: "chips" | "tiles";
  className?: string;
}) {
  if (variant === "tiles") {
    return (
      // Solo <span>: se usa dentro de un <button>.
      <span className={`grid grid-cols-3 gap-1.5 ${className}`}>
        {slots.map((s, i) => (
          <span key={s.label} className="flex min-w-0 flex-col items-center gap-1 text-center">
            <span className="relative block aspect-square w-full overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/80">
              {images[i] ? (
                <Image src={images[i]} alt="" fill sizes="80px" className="object-contain p-1" />
              ) : (
                <span className="flex h-full items-center justify-center text-brand-300">
                  <FaGift />
                </span>
              )}
              {s.quantity > 1 && (
                <span className="absolute top-0.5 right-0.5 rounded-full bg-pink-600 px-1.5 text-[10px] leading-4 font-extrabold text-white">
                  ×{s.quantity}
                </span>
              )}
            </span>
            <span className="line-clamp-2 text-[10.5px] leading-tight font-semibold text-slate-600">{s.label}</span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {slots.map((s, i) => (
        <li
          key={s.label}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 py-1 pr-2.5 pl-1 text-[13px] font-medium text-slate-700 ring-1 ring-slate-200/80"
        >
          <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
            {images[i] ? (
              <Image src={images[i]} alt="" fill sizes="32px" className="object-contain p-0.5" />
            ) : (
              <span className="flex h-full items-center justify-center text-[11px] text-brand-300">
                <FaGift />
              </span>
            )}
          </span>
          {s.quantity > 1 ? `${s.quantity} × ` : ""}
          {s.label}
        </li>
      ))}
    </ul>
  );
}
