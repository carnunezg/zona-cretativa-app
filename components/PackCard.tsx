import { Pack } from "@/types/pack";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";

interface Props {
  pack: Pack;
}

export default function ComboCard({ pack }: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.03]
        p-3 flex flex-col
        w-full sm:w-[180px] md:w-full
        border border-slate-200
      "
    >
      {/* IMAGEN */}
      <div className="relative w-full h-44 sm:h-40 md:h-56 mb-3">
        <Image
          src={pack.image}
          alt={pack.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* TÍTULO */}
      <h2 className="text-lg sm:text-base md:text-xl font-extrabold text-center mb-2 text-[#1E3A8A]">
        {pack.title}
      </h2>

      {/* DESCRIPCIÓN */}
      <p className="text-center font-semibold text-[#475569] text-sm sm:text-xs md:text-sm">
        Incluye
      </p>
      <p className="text-center text-[#0F172A] text-sm sm:text-xs md:text-sm mb-3">
        {pack.description}
      </p>

      {/* PRECIOS + CTA */}
      <div className="mt-auto flex flex-col gap-2">
        {/* PRECIO ANTES */}
        <div
          className="
            bg-slate-100
            text-slate-500
            text-sm sm:text-xs
            text-center
            py-1
            rounded-xl
            line-through
            font-medium
          "
        >
          Antes: CLP ${pack.oldPrice}
        </div>

        {/* PRECIO AHORA */}
        <div
          className="
            bg-[#FACC15]
            text-[#0F172A]
            font-extrabold
            text-sm sm:text-xs md:text-lg
            text-center
            py-1.5
            rounded-xl
          "
        >
          Ahora: CLP ${pack.price}
        </div>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(
            `Hola, quiero reservar el pack: ${pack.title}`,
          )}`}
          target="_blank"
          className="
            w-full
            inline-flex items-center justify-center gap-1.5
            bg-[#16A34A] hover:bg-[#15803D]
            text-white
            py-1.5
            rounded-xl
            text-sm sm:text-xs md:text-sm
            font-semibold
            transition-colors
          "
        >
          <FaWhatsapp className="text-base sm:text-sm" />
          Reservar Pack
        </a>
      </div>
    </div>
  );
}
