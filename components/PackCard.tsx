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
        bg-white rounded-2xl shadow-md hover:shadow-xl 
        transition-transform duration-300 ease-out 
        hover:-translate-y-1 hover:scale-105
        p-3 flex flex-col
        w-full sm:w-[180px] md:w-full
      "
    >
      {/* Imagen */}
      <div className="relative w-full h-44 sm:h-40 md:h-56 mb-3">
        <Image
          src={pack.image}
          alt={pack.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Título */}
      <h2 className="text-lg sm:text-base md:text-xl font-extrabold text-center mb-2 text-fuchsia-600">
        {pack.title}
      </h2>

      {/* Descripción */}
      <p className="text-center font-semibold text-gray-800 text-sm sm:text-xs md:text-sm">
        Incluye:
      </p>
      <p className="text-center text-gray-700 text-sm sm:text-xs md:text-sm">
        "{pack.description}"
      </p>

      {/* Precios y botón */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="bg-gray-300 text-gray-600 text-sm sm:text-xs text-center py-1 rounded-xl line-through font-medium">
          Antes: CLP ${pack.oldPrice}
        </div>
        <div className="bg-fuchsia-500 text-white font-bold text-sm sm:text-xs md:text-lg text-center py-1.5 rounded-xl">
          Ahora: CLP ${pack.price}
        </div>

        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(
            `Hola, quiero reservar: ${pack.title}`,
          )}`}
          target="_blank"
          className="w-full inline-flex items-center justify-center gap-1 sm:gap-1.5 bg-green-500 hover:bg-green-400 text-white py-1 sm:py-1.5 rounded-xl text-sm sm:text-xs md:text-sm"
        >
          <FaWhatsapp className="text-base sm:text-sm" /> Reservar Pack
        </a>
      </div>
    </div>
  );
}
