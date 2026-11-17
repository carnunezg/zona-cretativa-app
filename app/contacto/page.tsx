import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { PageBody, PageHero } from "@/components/PageHeader";
import { getSiteData } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp o reserva en línea los servicios infantiles e inflables para tu celebración.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactoPage() {
  const { contact } = await getSiteData();
  return (
    <>
      <PageHero eyebrow="Contacto" title="Estamos para ayudarte" subtitle="Resolvemos tus dudas y te ayudamos a armar la celebración perfecta." />
      <PageBody>
        <ContactSection variant="section" contact={contact} />
      </PageBody>
    </>
  );
}
