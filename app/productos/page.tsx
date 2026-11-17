import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaBolt, FaGift, FaPuzzlePiece, FaTag } from "react-icons/fa6";
import ProductCard from "@/components/ProductCard";
import { PageBody, PageHero } from "@/components/PageHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import { getSiteData, isListed } from "@/lib/catalog";
import { coverFor } from "@/lib/media";
import { clp } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Castillos inflables, cama elástica, piscina de pelotas, resbalín, ponys saltarines, pinta caritas y más para cumpleaños infantiles. Revisa medidas, edades y precios.",
  alternates: { canonical: "/productos" },
};

export default async function ProductosPage() {
  const { products: all, packs, media, contact } = await getSiteData();
  const products = all.filter(isListed);
  const prices = products.map((p) => (p.billingType === "hour" ? p.hourlyRate : p.unitPrice)).filter((v): v is number => !!v && v > 0);
  const from = prices.length ? Math.min(...prices) : null;
  const bestSaving = packs.reduce((m, p) => Math.max(m, p.regularPrice - p.price), 0);

  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Nuestros servicios"
        subtitle="Inflables, cama elástica, piscina de pelotas y mucho más para que cada celebración sea inolvidable."
        highlights={[
          { icon: FaPuzzlePiece, label: `${products.length} servicios disponibles` },
          ...(from ? [{ icon: FaTag, label: `Desde ${clp(from)}` }] : []),
          { icon: FaBolt, label: "Reserva al instante" },
        ]}
      />

      <PageBody>
        <RevealGroup as="ul" className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <RevealItem as="li" key={product.id} className="h-full">
              <ProductCard product={product} cover={coverFor(media, { type: "product", id: product.id })} />
            </RevealItem>
          ))}
        </RevealGroup>

        {packs.length > 0 && (
          <Reveal className="mx-auto mt-14 max-w-6xl">
            <Link
              href="/packs"
              className="group relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-sun-200 bg-linear-to-r from-sun-50 via-white to-pink-50 p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:flex-row sm:p-8 sm:text-left"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sun-400 text-3xl text-brand-900 shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <FaGift />
              </span>
              <span className="flex-1">
                <span className="block text-2xl font-extrabold text-brand-900">¿Vas a contratar varios servicios?</span>
                <span className="mt-1 block text-slate-600">
                  Con nuestros packs pagas menos{bestSaving > 0 ? ` y ahorras hasta ${clp(bestSaving)}` : ""}.
                </span>
              </span>
              <span className="zc-btn zc-btn-white shrink-0 text-sm group-hover:bg-brand-700 group-hover:text-white">
                Ver packs <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        )}
      </PageBody>

      <CtaBand whatsappNumber={contact.whatsappNumber} />
      <div className="pb-10" />
    </>
  );
}
