import Link from "next/link";
import { FaCalendarCheck, FaCircleCheck, FaGamepad, FaWhatsapp } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const STEPS = [
  { icon: FaGamepad, title: "Elige tus servicios", text: "Escoge un pack o arma tu combinación de servicios favoritos." },
  { icon: FaCalendarCheck, title: "Reserva en línea", text: "Indica fecha, horario y dirección. Tu reserva se confirma al instante." },
  { icon: FaWhatsapp, title: "Coordinamos y ¡a jugar!", text: "Transfieres $1.000 de compromiso, coordinamos el traslado y llegamos el día del evento." },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50/70 to-transparent px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Así de fácil" title="Reserva en 3 pasos" subtitle="Sin llamadas ni esperas: elige, reserva y prepárate para la fiesta." />

        <RevealGroup as="ul" className="relative grid gap-6 md:grid-cols-3" stagger={0.15}>
          {/* Línea que une los pasos (escritorio) */}
          <span aria-hidden className="absolute top-10 right-[16%] left-[16%] hidden h-0.5 bg-linear-to-r from-brand-200 via-sun-300 to-brand-200 md:block" />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <RevealItem as="li" key={title} className="relative text-center">
              <span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl text-brand-700 shadow-lift ring-4 ring-white">
                <Icon />
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-sun-400 text-sm font-extrabold text-brand-900 ring-4 ring-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-brand-900">{title}</h3>
              <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-slate-600">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center" delay={0.2}>
          <Link href="/reservar" className="zc-btn zc-btn-green px-8">
            <FaCircleCheck /> Comenzar mi reserva
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
