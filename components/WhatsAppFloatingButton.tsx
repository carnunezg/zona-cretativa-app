"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppFloatingButton({ number }: { number: string }) {
  const pathname = usePathname();
  // En el formulario de reserva el botón tapaba el resumen en celulares.
  if (pathname?.startsWith("/reservar")) return null;

  return (
    <a
      href={whatsappLink("Hola, quiero reservar en Zona Creativa", number)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="
        fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#16A34A] hover:bg-[#15803D] text-white
        shadow-lg shadow-green-900/30
        transition-transform hover:scale-110
        focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300
      "
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
