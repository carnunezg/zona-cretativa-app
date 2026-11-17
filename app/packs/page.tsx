import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaGift, FaPiggyBank, FaPuzzlePiece, FaWandMagicSparkles } from "react-icons/fa6";
import PackCard from "@/components/PackCard";
import { PageBody, PageHero } from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import { getSiteData } from "@/lib/catalog";
import { coverFor, packProductImages } from "@/lib/media";
import { clp } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Packs",
  description:
    "Packs de servicios infantiles a precio especial: castillo inflable, cama elástica, piscina de pelotas, resbalín, ponys saltarines y más para tu celebración.",
  alternates: { canonical: "/packs" },
};

export default async function PackPage() {
  const { packs, products, media, contact } = await getSiteData();
  const bestSaving = packs.reduce((m, p) => Math.max(m, p.regularPrice - p.price), 0);
  const from = packs.length ? Math.min(...packs.map((p) => p.price)) : null;

  return (
    <>
      <PageHero
        eyebrow="Ahorra más"
        title="Packs con precio especial"
        subtitle="Combinaciones de servicios pensadas para cada edad y espacio. Mientras más servicios, más diversión y más ahorro."
        highlights={[
          { icon: FaGift, label: `${packs.length} packs` },
          ...(bestSaving > 0 ? [{ icon: FaPiggyBank, label: `Ahorra hasta ${clp(bestSaving)}` }] : []),
          ...(from ? [{ icon: FaWandMagicSparkles, label: `Desde ${clp(from)}` }] : []),
        ]}
      />

      <PageBody>
        <RevealGroup as="ul" className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((pack) => (
            <RevealItem as="li" key={pack.id} className="h-full">
              <PackCard
                pack={pack}
                cover={coverFor(media, { type: "pack", id: pack.id })}
                productImages={packProductImages(pack, products, media)}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-14 max-w-6xl">
          <Link
            href="/reservar"
            className="group relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-brand-100 bg-linear-to-r from-brand-50 via-white to-sun-50 p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:flex-row sm:p-8 sm:text-left"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-3xl text-white shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
              <FaPuzzlePiece />
            </span>
            <span className="flex-1">
              <span className="block text-2xl font-extrabold text-brand-900">¿Prefieres armar tu propia combinación?</span>
              <span className="mt-1 block text-slate-600">
                Elige servicio por servicio al reservar: si tu selección coincide con un pack, el precio especial se aplica solo.
              </span>
            </span>
            <span className="zc-btn zc-btn-white shrink-0 text-sm group-hover:bg-brand-700 group-hover:text-white">
              Armar mi reserva <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </PageBody>

      <CtaBand whatsappNumber={contact.whatsappNumber} />
      <div className="pb-10" />
    </>
  );
}
