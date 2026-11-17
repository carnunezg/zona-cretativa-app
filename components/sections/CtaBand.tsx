import Link from "next/link";
import { FaCalendarCheck, FaWhatsapp } from "react-icons/fa6";
import Reveal from "@/components/motion/Reveal";
import { whatsappLink } from "@/lib/site";

/** Franja final de llamado a la acción. */
export default function CtaBand({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <section className="px-4 py-10 sm:py-14">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-700 via-brand-600 to-brand-500 px-6 py-12 text-center shadow-lift sm:px-12 sm:py-16">
        <span aria-hidden className="animate-float-slow absolute -top-10 -left-10 h-40 w-40 rounded-full bg-sun-400/30 blur-2xl" />
        <span aria-hidden className="animate-float absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-pink-500/30 blur-2xl" />
        <span aria-hidden className="absolute top-6 right-10 hidden h-4 w-4 rounded-full bg-sun-300 sm:block" />
        <span aria-hidden className="absolute bottom-10 left-16 hidden h-3 w-3 rounded-full bg-white/70 sm:block" />

        <div className="relative">
          <h2 className="text-3xl leading-tight font-extrabold text-white sm:text-4xl md:text-5xl">¿Lista la fiesta? 🎉</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/85 sm:text-lg">
            Asegura tu fecha hoy y deja que los niños vivan una celebración inolvidable.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/reservar" className="zc-btn zc-btn-sun zc-shine w-full max-w-xs px-8 text-base sm:w-auto">
              <FaCalendarCheck /> Reservar ahora
            </Link>
            <a
              href={whatsappLink("Hola, quiero consultar por una reserva", whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="zc-btn zc-btn-ghost w-full max-w-xs px-8 text-base sm:w-auto"
            >
              <FaWhatsapp /> Hablar por WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
