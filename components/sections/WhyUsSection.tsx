import { FaFaceSmile, FaShieldHeart, FaTruck, FaWandMagicSparkles } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const FEATURES = [
  {
    icon: FaFaceSmile,
    title: "Momentos felices",
    text: "Servicios pensados para que los niños se diviertan de principio a fin.",
    color: "bg-sun-100 text-sun-600",
  },
  {
    icon: FaTruck,
    title: "Entrega coordinada",
    text: "Llevamos, instalamos y retiramos los servicios en el horario acordado.",
    color: "bg-brand-100 text-brand-700",
  },
  {
    icon: FaShieldHeart,
    title: "Uso responsable",
    text: "Servicios en buen estado y normas claras para que todos jueguen seguros.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: FaWandMagicSparkles,
    title: "Packs a tu medida",
    text: "Combina servicios y ahorra con precios especiales por pack.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="¿Por qué elegirnos?"
          title="Celebraciones sin preocupaciones"
          subtitle="Tú disfrutas del cumpleaños; nosotros nos encargamos de los servicios."
        />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text, color }) => (
            <RevealItem
              key={title}
              className="group flex items-start gap-4 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:block sm:p-6"
            >
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${color}`}>
                <Icon />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-brand-900 sm:mt-5">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:mt-1.5">{text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
