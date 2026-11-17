import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { FaClock, FaChild, FaRulerCombined } from "react-icons/fa6";
import ItemDetail from "@/components/ItemDetail";
import { getSiteData, LEGACY_PRODUCT_SLUGS } from "@/lib/catalog";
import { mediaFor } from "@/lib/media";
import { productPriceLabel } from "@/lib/pricing";

interface Props {
  params: Promise<{ slug: string }>;
}

// Servicios nuevos creados en el portal se generan al primer visitante.
export const dynamicParams = true;

export async function generateStaticParams() {
  const { products } = await getSiteData();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getSiteData();
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  const description = product.description ?? `${product.name} para cumpleaños y celebraciones infantiles.`;
  return {
    title: `${product.name} para cumpleaños y celebraciones`,
    description,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: { title: product.name, description, images: [product.image] },
  };
}

export default async function ProductoDetallePage({ params }: Props) {
  const { slug } = await params;
  // Direcciones antiguas (/productos/1): redirigir a la nueva.
  if (LEGACY_PRODUCT_SLUGS[slug]) permanentRedirect(`/productos/${LEGACY_PRODUCT_SLUGS[slug]}`);

  const { products, media, contact } = await getSiteData();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const price = productPriceLabel(product);
  return (
    <ItemDetail
      media={mediaFor(media, { type: "product", id: product.id })}
      title={product.name}
      image={product.image}
      price={price === "Incluido" || price === "Consultar" ? price : `CLP ${price}`}
      description={product.description}
      features={product.features}
      facts={[
        { icon: FaClock, label: "Duración", value: product.duration },
        { icon: FaChild, label: "Edad recomendada", value: product.age },
        { icon: FaRulerCombined, label: "Medidas", value: product.dimensions },
      ]}
      reserveHref={`/reservar?servicio=${product.slug}`}
      whatsappMessage={`Hola, quiero consultar por: ${product.name}`}
      whatsappNumber={contact.whatsappNumber}
      backHref="/productos"
      backLabel="Volver a productos"
    />
  );
}
