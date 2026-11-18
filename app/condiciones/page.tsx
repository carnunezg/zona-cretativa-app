import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaBroom,
  FaCircleCheck,
  FaDropletSlash,
  FaFileContract,
  FaHouse,
  FaLayerGroup,
  FaRulerCombined,
  FaSeedling,
  FaSun,
  FaTableCellsLarge,
  FaWhatsapp,
} from "react-icons/fa6";
import { PageBody, PageHero } from "@/components/PageHeader";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getSiteData } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Requisitos del espacio",
  description:
    "Superficies recomendadas y requisitos del espacio para instalar nuestros servicios infantiles en interior o exterior.",
  alternates: { canonical: "/condiciones" },
};

const SURFACES = [
  { icon: FaLayerGroup, label: "Piso flotante", color: "bg-sun-100 text-sun-600" },
  { icon: FaTableCellsLarge, label: "Cerámica", color: "bg-brand-100 text-brand-700" },
  { icon: FaSeedling, label: "Pasto parejo y seco", color: "bg-emerald-100 text-emerald-600" },
  { icon: FaRulerCombined, label: "Áreas niveladas y sin piedras", color: "bg-pink-100 text-pink-600" },
];

const CHECKLIST = [
  "El espacio está limpio, seco y es seguro para la instalación y el uso por parte de los niños.",
  "Cuentas con el espacio suficiente para la correcta instalación.",
  "La superficie es una de las recomendadas: pareja, nivelada y sin piedras.",
  "El pasto y toda la superficie están completamente secos: sin lluvia, riego ni rocío.",
];

export default async function CondicionesEspacioPage() {
  const { contact } = await getSiteData();
  return (
    <>
      <PageHero
        eyebrow="Antes del evento"
        title="Requisitos del espacio"
        subtitle="Así preparamos juntos un lugar seguro para que los niños jueguen sin preocupaciones."
        highlights={[
          { icon: FaHouse, label: "Interior" },
          { icon: FaSun, label: "Exterior" },
        ]}
      />

      <PageBody>
        <div className="mx-auto max-w-5xl space-y-10">
          <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-slate-200/70 bg-white p-6 text-center shadow-card sm:flex-row sm:p-8 sm:text-left">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-400 text-3xl text-white shadow-md">
              <FaBroom />
            </span>
            <p className="text-lg leading-relaxed text-slate-700">
              Nuestros productos pueden instalarse tanto en <b className="text-brand-800">interior como exterior</b>, siempre que el espacio esté
              limpio, seco y sea seguro para la instalación y el uso por parte de los niños.
            </p>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-center text-3xl font-extrabold text-brand-900 sm:text-4xl">Superficies recomendadas</h2>
            </Reveal>
            <RevealGroup className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {SURFACES.map(({ icon: Icon, label, color }) => (
                <RevealItem
                  key={label}
                  className="group flex flex-col items-center rounded-3xl border border-slate-200/70 bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6"
                >
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${color}`}>
                    <Icon />
                  </span>
                  <span className="mt-3 font-bold text-brand-900">{label}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="flex flex-col items-center gap-5 rounded-3xl border-2 border-sky-200 bg-linear-to-br from-sky-50 to-white p-6 text-center shadow-card sm:flex-row sm:p-8 sm:text-left">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-3xl text-white shadow-md">
              <FaDropletSlash />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-brand-900 sm:text-2xl">Todo debe estar completamente seco</h2>
              <p className="mt-2 leading-relaxed text-slate-700">
                El <b className="text-brand-800">pasto</b>, el piso y toda la zona de instalación deben estar <b className="text-brand-800">secos</b>:
                no riegues el día del evento ni la noche anterior y evita el agua acumulada. Si la superficie está mojada o húmeda, por la
                seguridad de los niños no podremos instalar los servicios.
              </p>
            </div>
          </Reveal>

          <Reveal className="rounded-3xl bg-linear-to-br from-brand-700 to-brand-500 p-6 text-white shadow-lift sm:p-8">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Antes del evento, verifica que:</h2>
            <ul className="mt-5 space-y-3">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/90">
                  <FaCircleCheck className="mt-1 shrink-0 text-sun-300" /> {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-2">
            <a
              href={whatsappLink("Hola, quiero consultar si mi espacio sirve para instalar los servicios", contact.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600">
                <FaWhatsapp />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-brand-900">¿Dudas con tu espacio?</span>
                <span className="block text-sm text-slate-500">Con gusto te orientamos 🤍</span>
              </span>
              <FaArrowRight className="text-brand-400 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/terminos"
              className="group flex items-center gap-4 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-xl text-brand-700">
                <FaFileContract />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-brand-900">Términos y condiciones</span>
                <span className="block text-sm text-slate-500">Reserva, pago y cancelaciones</span>
              </span>
              <FaArrowRight className="text-brand-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </PageBody>
    </>
  );
}
