import Image from "next/image";

/**
 * Imagen de un pack: su foto propia si existe; si no, un mosaico con los
 * servicios que incluye (así los packs nuevos se ven bien sin subir fotos).
 */
export default function PackImage({
  image,
  productImages,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  image: string | null;
  productImages: (string | null)[];
  alt: string;
  sizes?: string;
}) {
  if (image) {
    return <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />;
  }
  const tiles = [...new Set(productImages.filter((x): x is string => Boolean(x)))].slice(0, 4);
  const cols = tiles.length <= 1 ? "grid-cols-1" : "grid-cols-2";
  return (
    <div role="img" aria-label={alt} className={`grid h-full w-full ${cols} gap-1 bg-gradient-to-br from-blue-50 to-yellow-50 p-1.5`}>
      {tiles.map((src, i) => (
        <div
          key={src}
          className={`relative rounded-lg bg-white/70 ${tiles.length === 3 && i === 0 ? "row-span-2" : ""}`}
        >
          <Image src={src} alt="" fill sizes="20vw" className="object-contain p-1" />
        </div>
      ))}
    </div>
  );
}
