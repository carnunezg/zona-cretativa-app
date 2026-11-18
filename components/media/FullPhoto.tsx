import Image from "next/image";

/**
 * Foto subida desde el portal mostrada COMPLETA (sin recortes) dentro de un
 * marco de proporción fija: la foto va «contenida» y el espacio sobrante se
 * rellena con la misma imagen difuminada. Sirve para fotos verticales u
 * horizontales por igual. El contenedor debe tener `position: relative`.
 */
export default function FullPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Clases extra para la foto principal (p. ej. efecto al pasar el mouse). */
  className?: string;
}) {
  return (
    <>
      <Image src={src} alt="" aria-hidden fill sizes="64px" className="scale-110 object-cover opacity-70 blur-xl" />
      <span aria-hidden className="absolute inset-0 bg-white/20" />
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-contain ${className}`} />
    </>
  );
}
