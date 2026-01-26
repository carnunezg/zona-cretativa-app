import Image from "next/image";
import { Product } from "@/types/product";
import { FaWhatsapp } from "react-icons/fa6";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const whatsappMessage = `Hola, quiero reservar: ${product.name}`;

  return (
    <div
      className="
    bg-white rounded-2xl shadow-md hover:shadow-xl 
    transition-transform duration-300 ease-out 
    hover:-translate-y-1 hover:scale-105
    p-4 flex flex-col
  "
    >
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain rounded-xl"
        />
      </div>

      <h2 className="text-xl font-extrabold text-center mb-3 tracking-wide text-fuchsia-600">
        {product.name}
      </h2>

      <p className="text-center font-bold text-gray-800">Dimensiones:</p>

      <p className="text-center text-gray-700">"{product.dimensions}"</p>

      <div className="mt-4 flex flex-col gap-3">
        <div className="bg-fuchsia-500 text-white font-bold text-lg text-center py-2 w-full rounded-xl">
          Precio: ${product.price}
        </div>

        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(
            `Hola, quiero reservar: ${product.name}`,
          )}`}
          target="_blank"
          className="w-full inline-flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-white py-2 rounded-xl"
        >
          <FaWhatsapp /> Reservar
        </a>
      </div>
    </div>
  );
}
