import { packs } from "@/data/packs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaClock,
  FaChild,
  FaCircleCheck,
  FaWhatsapp,
  FaArrowLeft,
} from "react-icons/fa6";

export const dynamicParams = false;

export function generateStaticParams() {
  return packs.map((pack) => ({
    id: pack.id.toString(),
  }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PackDetallePage({ params }: Props) {
  const { id } = await params;
  const pack = packs.find((p) => p.id === Number(id));

  if (!pack) notFound();

  return (
    <section className="pt-28 sm:pt-32 pb-16 px-4 bg-gradient-to-b from-blue-800/95 via-blue-400/90 to-blue-100/85">
      <Link
        href="/packs"
        className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm sm:text-base font-semibold mb-6"
      >
        <FaArrowLeft />
        Volver
      </Link>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div className="flex justify-center">
          <Image
            src={pack.image}
            alt={pack.title}
            width={520}
            height={420}
            className="object-contain rounded-2xl shadow-lg"
            priority
          />
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-xl">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mb-2">
            {pack.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#F59E0B] mb-3">
            CLP ${pack.price}
          </p>

          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-4">
            <FaCircleCheck />
            Disponible para arriendo
          </span>

          <p className="text-sm sm:text-base text-slate-600 mb-5">
            {pack.description}
          </p>

          <ul className="space-y-3 text-sm sm:text-base text-slate-700 mb-6">
            <li className="flex items-center gap-3">
              <FaClock className="text-blue-600" />
              <b>Tiempo de arriendo:</b> {pack.duration}
            </li>

            <li className="flex items-center gap-3">
              <FaChild className="text-blue-600" />
              <b>Edad recomendada:</b> {pack.age}
            </li>
          </ul>

          <a
            href={`https://wa.me/56949034475?text=${encodeURIComponent(
              `Hola, quiero reservar el pack: ${pack.title}`,
            )}`}
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm sm:text-base"
          >
            <FaWhatsapp />
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
