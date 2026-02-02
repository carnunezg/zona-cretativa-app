import Image from "next/image";
import { Product } from "@/types/product";
import { FaWhatsapp } from "react-icons/fa6";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.03]
        p-3 flex flex-col
        w-full
        sm:w-[180px] md:w-full
        border border-slate-200
      "
    >
      {/* IMAGEN */}
      <div className="relative w-full h-36 sm:h-32 md:h-48 mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain rounded-xl"
        />
      </div>

      {/* NOMBRE */}
      <h2 className="text-lg sm:text-base md:text-xl font-extrabold text-center mb-2 text-[#1E3A8A]">
        {product.name}
      </h2>

      {/* DIMENSIONES */}
      <p className="text-center font-semibold text-[#475569] text-sm sm:text-xs md:text-sm">
        Medidas
      </p>
      <p className="text-center text-[#0F172A] text-sm sm:text-xs md:text-sm mb-2">
        {product.dimensions}
      </p>

      {/* PRECIO + CTA */}
      <div className="mt-auto flex flex-col gap-2">
        {/* PRECIO */}
        <div
          className="
            text-[#0F172A]
            font-extrabold
            text-sm sm:text-xs md:text-lg
            text-center
            py-1.5
            rounded-xl
          "
        >
          CLP ${product.price}
        </div>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(
            `Hola, quiero reservar: ${product.name}`,
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
          Reservar Ahora
        </a>
      </div>
    </div>
  );
}
