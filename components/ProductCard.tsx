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
        bg-white rounded-2xl shadow-md hover:shadow-xl 
        transition-transform duration-300 ease-out 
        hover:-translate-y-1 hover:scale-105
        p-3 flex flex-col
        w-full
        sm:w-[180px] md:w-full
      "
    >
      <div className="relative w-full h-36 sm:h-32 md:h-48 mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain rounded-xl"
        />
      </div>

      <h2 className="text-lg sm:text-base md:text-xl font-extrabold text-center mb-2 text-fuchsia-600">
        {product.name}
      </h2>

      <p className="text-center font-semibold text-gray-800 text-sm sm:text-xs md:text-sm">
        Dimensiones:
      </p>
      <p className="text-center text-gray-700 text-sm sm:text-xs md:text-sm">
        "{product.dimensions}"
      </p>

      <div className="mt-3 flex flex-col gap-2">
        <div className="bg-fuchsia-500 text-white font-bold text-sm sm:text-xs md:text-lg text-center py-1 rounded-xl">
          CLP ${product.price}
        </div>

        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(
            `Hola, quiero reservar: ${product.name}`,
          )}`}
          target="_blank"
          className="w-full inline-flex items-center justify-center gap-1 sm:gap-1.5 bg-green-500 hover:bg-green-400 text-white py-1 sm:py-1.5 rounded-xl text-sm sm:text-xs md:text-sm"
        >
          <FaWhatsapp className="text-base sm:text-sm" /> Reservar
        </a>
      </div>
    </div>
  );
}
