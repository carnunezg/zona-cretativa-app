import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { FaClock, FaChild, FaGift, FaHourglassHalf, FaRulerCombined } from "react-icons/fa6";
import ItemDetail from "@/components/ItemDetail";
import PackCard from "@/components/PackCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getSiteData, LEGACY_PRODUCT_SLUGS } from "@/lib/catalog";
import { coverFor, mediaFor, packProductImages } from "@/lib/media";
import { clp } from "@/lib/pricing";
import { toneFor } from "@/lib/tones";

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

  const { products, packs, media, contact } = await getSiteData();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const hourly = product.billingType === "hour";
  const amount = hourly ? product.hourlyRate : product.unitPrice;
  const included = !hourly && product.unitPrice === 0;
  // Packs que incluyen este servicio (para sugerir el ahorro).
  const withProduct = packs.filter((p) => p.slots.some((s) => s.productIds.includes(product.id))).slice(0, 3);

  return (
    <ItemDetail
      media={mediaFor(media, { type: "product", id: product.id })}
      section={{ label: "Servicios", href: "/productos" }}
      title={product.name}
      badge={hourly ? { icon: FaHourglassHalf, label: "Por hora" } : included ? { icon: FaGift, label: "Adicional sin costo" } : undefined}
      image={product.image}
      tone={toneFor(product.slug)}
      priceLabel={included ? "Sin costo" : hourly ? "Valor por hora" : "Valor"}
      price={included ? "Incluido" : amount ? clp(amount) : "Consultar"}
      priceSuffix={hourly && amount ? "/ hora" : undefined}
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
      related={
        withProduct.length
          ? {
              title: "Ahorra con un pack",
              subtitle: `Estos packs incluyen ${product.name} a precio especial.`,
              content: (
                <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {withProduct.map((pack) => (
                    <RevealItem as="li" key={pack.id} className="h-full">
                      <PackCard pack={pack} cover={coverFor(media, { type: "pack", id: pack.id })} productImages={packProductImages(pack, products, media)} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              ),
            }
          : undefined
      }
    />
  );
}
