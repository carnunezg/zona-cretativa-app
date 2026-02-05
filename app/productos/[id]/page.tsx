import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FaClock,
  FaChild,
  FaRulerCombined,
  FaCircleCheck,
  FaWhatsapp,
} from "react-icons/fa6";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductoDetallePage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <section className="pt-28 sm:pt-32 pb-16 px-4 bg-gradient-to-b from-blue-800/95 via-blue-400/90 to-blue-100/85">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* IMAGEN */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={520}
            height={420}
            className="object-contain"
            priority
          />
        </div>

        {/* INFO */}
        <div
          className="
            bg-white/85 backdrop-blur-md
            rounded-3xl
            p-5 sm:p-8
            shadow-xl
          "
        >
          {/* TITULO */}
          <h1
            className="
            text-xl
            sm:text-3xl
            md:text-4xl
            font-extrabold
            text-[#1E3A8A]
            mb-2
          "
          >
            {product.name}
          </h1>

          {/* PRECIO */}
          <p
            className="
            text-lg
            sm:text-xl
            md:text-2xl
            font-extrabold
            text-[#F59E0B]
            mb-3
          "
          >
            CLP ${product.price}
          </p>

          {/* ESTADO */}
          <span
            className="
            inline-flex items-center gap-2
            bg-green-100 text-green-700
            text-xs sm:text-sm
            font-semibold
            px-3 sm:px-4
            py-1
            rounded-full
            mb-4
          "
          >
            <FaCircleCheck className="text-sm sm:text-base" />
            Disponible para arriendo
          </span>

          {/* DESCRIPCIÓN */}
          <p
            className="
            text-sm
            sm:text-base
            text-slate-600
            leading-relaxed
            mb-5
          "
          >
            {product.description}
          </p>

          {/* DETALLES */}
          <ul
            className="
            space-y-2
            sm:space-y-3
            text-sm
            sm:text-base
            text-slate-700
            mb-6
          "
          >
            <li className="flex items-center gap-3">
              <FaClock className="text-[#2563EB] text-base sm:text-lg" />
              <span>
                <b>Tiempo de arriendo:</b> {product.duration}
              </span>
            </li>

            <li className="flex items-center gap-3">
              <FaChild className="text-[#2563EB] text-base sm:text-lg" />
              <span>
                <b>Edad recomendada:</b> {product.age}
              </span>
            </li>

            <li className="flex items-center gap-3">
              <FaRulerCombined className="text-[#2563EB] text-base sm:text-lg" />
              <span>
                <b>Medidas:</b> {product.dimensions}
              </span>
            </li>
          </ul>

          {/* CTA */}
          <a
            href={`https://wa.me/56949034475?text=${encodeURIComponent(
              `Hola, quiero reservar el producto: ${product.name}`,
            )}`}
            target="_blank"
            className="
              inline-flex items-center justify-center gap-2
              w-full sm:w-auto
              bg-[#16A34A] hover:bg-[#15803D]
              text-white font-bold
              px-5 sm:px-6
              py-3
              rounded-xl
              transition-colors
              text-sm sm:text-base
            "
          >
            <FaWhatsapp className="text-lg" />
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
