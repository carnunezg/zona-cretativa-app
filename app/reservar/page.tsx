import type { Metadata } from "next";
import { Suspense } from "react";
import { FaBolt, FaGift, FaWhatsapp } from "react-icons/fa6";
import BookingForm from "@/components/booking/BookingForm";
import { PageBody, PageHero } from "@/components/PageHeader";
import { getSiteData } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Reservar",
  description:
    "Reserva en línea servicios infantiles e inflables para tu celebración: elige los servicios y la fecha, y te confirmamos por WhatsApp.",
  alternates: { canonical: "/reservar" },
};

export default async function ReservarPage() {
  const { products, packs, media, contact } = await getSiteData();
  return (
    <>
      <PageHero
        eyebrow="Reserva en línea"
        title="Reserva tu celebración"
        subtitle="Elige tus servicios, la fecha y tus datos. Te contactamos por WhatsApp para confirmar tu reserva."
        highlights={[
          { icon: FaBolt, label: "Solicitud en 2 minutos" },
          { icon: FaGift, label: "Packs con precio especial" },
          { icon: FaWhatsapp, label: "Te confirmamos por WhatsApp" },
        ]}
      />
      <PageBody>
        <Suspense>
          <BookingForm products={products} packs={packs} media={media} contact={contact} />
        </Suspense>
      </PageBody>
    </>
  );
}
