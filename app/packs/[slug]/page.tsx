import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { FaClock, FaChild, FaGift, FaLayerGroup } from "react-icons/fa6";
import ItemDetail from "@/components/ItemDetail";
import PackCard from "@/components/PackCard";
import PackImage from "@/components/PackImage";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getSiteData } from "@/lib/catalog";
import { coverFor, mediaFor, packProductImages } from "@/lib/media";
import { clp } from "@/lib/pricing";
import { toneFor } from "@/lib/tones";

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
  const percent = pack.regularPrice > 0 ? Math.round((savings / pack.regularPrice) * 100) : 0;
  const includes = pack.slots
    .map((slot) => {
      const product = products.find((p) => slot.productIds.includes(p.id));
      if (!product) return null;
      return {
        name: slot.label,
        quantity: slot.quantity,
        image: coverFor(media, { type: "product", id: product.id })?.url ?? product.image,
        href: `/productos/${product.slug}`,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  const others = packs.filter((p) => p.id !== pack.id).sort((a, b) => Math.abs(a.number - pack.number) - Math.abs(b.number - pack.number)).slice(0, 3);

  return (
    <ItemDetail
      media={mediaFor(media, { type: "pack", id: pack.id })}
      section={{ label: "Packs", href: "/packs" }}
      title={pack.title}
      badge={{ icon: FaGift, label: percent > 0 ? `Pack ${pack.number} · -${percent}%` : `Pack ${pack.number}` }}
      image={pack.image}
      imageFallback={<PackImage image={null} productImages={packProductImages(pack, products, media)} alt={pack.title} sizes="50vw" />}
      tone={toneFor(pack.slug)}
      priceLabel="Precio pack"
      price={clp(pack.price)}
      oldPrice={savings > 0 ? clp(pack.regularPrice) : undefined}
      savings={savings > 0 ? `Ahorras ${clp(savings)} (${percent}%)` : undefined}
      includes={includes}
      description={pack.description}
      features={pack.features}
      facts={[
        { icon: FaLayerGroup, label: "Servicios", value: `${pack.slots.reduce((n, s) => n + s.quantity, 0)} en total` },
        { icon: FaClock, label: "Duración", value: pack.duration },
        { icon: FaChild, label: "Edad recomendada", value: pack.age },
      ]}
      reserveHref={`/reservar?pack=${pack.slug}`}
      whatsappMessage={`Hola, quiero consultar por el ${pack.title}`}
      whatsappNumber={contact.whatsappNumber}
      related={
        others.length
          ? {
              title: "Otros packs",
              subtitle: "Más combinaciones con precio especial para tu celebración.",
              content: (
                <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {others.map((p) => (
                    <RevealItem as="li" key={p.id} className="h-full">
                      <PackCard pack={p} cover={coverFor(media, { type: "pack", id: p.id })} productImages={packProductImages(p, products, media)} />
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
