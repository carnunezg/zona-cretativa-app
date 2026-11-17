import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { FaClock, FaChild, FaBoxOpen } from "react-icons/fa6";
import ItemDetail from "@/components/ItemDetail";
import PackImage from "@/components/PackImage";
import { getSiteData } from "@/lib/catalog";
import { mediaFor, packProductImages } from "@/lib/media";
import { clp } from "@/lib/pricing";

interface Props {
  params: Promise<{ slug: string }>;
}

// Packs nuevos creados en el portal se generan al primer visitante.
export const dynamicParams = true;

export async function generateStaticParams() {
  const { packs } = await getSiteData();
  return packs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { packs } = await getSiteData();
  const pack = packs.find((p) => p.slug === slug);
  if (!pack) return {};
  const description = `${pack.includes}. ${pack.description ?? "Pack de servicios infantiles a precio especial."}`;
  return {
    title: pack.title,
    description,
    alternates: { canonical: `/packs/${pack.slug}` },
    openGraph: { title: pack.title, description, images: pack.image ? [pack.image] : undefined },
  };
}

export default async function PackDetallePage({ params }: Props) {
  const { slug } = await params;
  const { packs, products, media, contact } = await getSiteData();

  // Direcciones antiguas (/packs/1): redirigir al pack con ese número.
  if (/^\d+$/.test(slug)) {
    const byNumber = packs.find((p) => p.number === Number(slug));
    if (byNumber) permanentRedirect(`/packs/${byNumber.slug}`);
  }

  const pack = packs.find((p) => p.slug === slug);
  if (!pack) notFound();

  const savings = pack.regularPrice - pack.price;
  return (
    <ItemDetail
      media={mediaFor(media, { type: "pack", id: pack.id })}
      title={pack.title}
      image={pack.image}
      imageFallback={<PackImage image={null} productImages={packProductImages(pack, products, media)} alt={pack.title} sizes="50vw" />}
      price={`CLP ${clp(pack.price)}`}
      oldPrice={savings > 0 ? clp(pack.regularPrice) : undefined}
      description={pack.description}
      features={pack.features}
      facts={[
        { icon: FaBoxOpen, label: "Incluye", value: pack.includes },
        { icon: FaClock, label: "Tiempo de arriendo", value: pack.duration },
        { icon: FaChild, label: "Edad recomendada", value: pack.age },
      ]}
      reserveHref={`/reservar?pack=${pack.slug}`}
      whatsappMessage={`Hola, quiero consultar por el ${pack.title}`}
      whatsappNumber={contact.whatsappNumber}
      backHref="/packs"
      backLabel="Volver a packs"
    />
  );
}
