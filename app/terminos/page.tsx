import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarXmark,
  FaClock,
  FaHandHoldingHeart,
  FaHouseCircleCheck,
  FaMoneyCheckDollar,
  FaShieldHeart,
  FaWhatsapp,
} from "react-icons/fa6";
import { PageBody, PageHero } from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getSiteData } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de reserva, pago, cancelación, duración del servicio y responsabilidad por daños de Zona Creativa.",
  alternates: { canonical: "/terminos" },
};

const TERMS = [
  {
    icon: FaMoneyCheckDollar,
    color: "bg-emerald-100 text-emerald-600",
    title: "Reserva y pago",
    key: "10% de abono",
    body: (
      <>
        Para reservar tu fecha, debes abonar el <b className="text-sun-600">10% del valor total</b> mediante transferencia. El saldo restante se
        cancela el día del evento, durante la instalación de la plaza blanda.
      </>
    ),
  },
  {
    icon: FaCalendarXmark,
    color: "bg-sun-100 text-sun-600",
    title: "Cambios o cancelaciones",
    key: "7 días de aviso",
    body: (
      <>
        Si necesitas cancelar, debes avisarnos con al menos <b>7 días de anticipación</b>. Pasado este plazo, podrás reprogramar tu reserva
        (sujeto a disponibilidad), sin reembolso.
      </>
    ),
  },
  {
    icon: FaClock,
    color: "bg-brand-100 text-brand-700",
    title: "Duración del servicio",
    key: "4 horas",
    body: (
      <>
        El servicio tiene una duración de <b>4 horas</b>, con retiro máximo a las <b>20:00 hrs</b>.
      </>
    ),
  },
  {
    icon: FaShieldHeart,
    color: "bg-pink-100 text-pink-600",
    title: "Responsabilidad por daños",
    key: "Buen uso",
    body: (
      <>
        La persona que contrata es responsable del buen uso de los servicios. En caso de daño, se aplicará un cobro del{" "}
        <b className="text-red-600">20%</b> del valor de fábrica. Si el servicio queda inutilizable, se deberá cubrir el{" "}
        <b className="text-red-600">100%</b> de su valor.
      </>
    ),
  },
];

export default async function TerminosPage() {
  const { contact } = await getSiteData();
  return (
    <>
      <PageHero
        eyebrow="Información"
        title="Términos y condiciones"
        subtitle="Todo lo que necesitas saber antes de reservar, explicado de forma simple y clara."
      />

      <PageBody>
        <div className="mx-auto max-w-5xl">
          <RevealGroup className="grid gap-5 md:grid-cols-2">
            {TERMS.map(({ icon: Icon, color, title, key, body }, i) => (
              <RevealItem
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7"
              >
                <span aria-hidden className="absolute top-5 right-6 font-display text-5xl font-extrabold text-slate-100 transition-colors group-hover:text-brand-50">
                  0{i + 1}
                </span>
                <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 ${color}`}>
                  <Icon />
                </span>
                <h2 className="relative mt-5 text-2xl font-extrabold text-brand-900">{title}</h2>
                <span className="relative mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold tracking-wide text-slate-600 uppercase">
                  {key}
                </span>
                <p className="relative mt-3 leading-relaxed text-slate-700">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-pink-50 px-5 py-4 text-center font-semibold text-pink-700 ring-1 ring-pink-100">
            <FaHandHoldingHeart className="shrink-0 text-xl" /> Cuidemos juntos los servicios.
          </Reveal>

          <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/condiciones"
              className="group flex items-center gap-4 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-xl text-brand-700">
                <FaHouseCircleCheck />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-brand-900">Requisitos del espacio</span>
                <span className="block text-sm text-slate-500">Revisa dónde se pueden instalar los servicios</span>
              </span>
              <FaArrowRight className="text-brand-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappLink("Hola, tengo una consulta sobre los términos del servicio", contact.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600">
                <FaWhatsapp />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-brand-900">¿Te quedó alguna duda?</span>
                <span className="block text-sm text-slate-500">Escríbenos por WhatsApp y te ayudamos</span>
              </span>
              <FaArrowRight className="text-brand-400 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </PageBody>
    </>
  );
}
