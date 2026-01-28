import { Pack } from "@/types/pack";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";

interface Props {
  pack: Pack;
}

export default function ComboCard({ pack }: Props) {
  const whatsappMessage = `Hola, quiero reservar: ${pack.title} 🎉`;

  return (
    <div
      className="
    bg-white rounded-2xl shadow-md hover:shadow-xl 
    transition-transform duration-300 ease-out 
    hover:-translate-y-1 hover:scale-105
    p-4 flex flex-col
  "
    >
      <div className="relative w-full h-56 sm:h-64 mb-4">
        <Image
          src={pack.image}
          alt={pack.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <h2 className="text-xl font-extrabold text-center mb-3 tracking-wide text-fuchsia-600">
        {pack.title}
      </h2>

      <p className="text-center font-bold text-gray-800">Incluye:</p>

      <p className="text-center text-gray-700">"{pack.description}"</p>

      <div className="mt-4 flex flex-col gap-3">
        <div className="bg-gray-300 text-gray-600 text-sm text-center py-1.5 w-full rounded-xl line-through font-medium">
          Antes: CLP ${pack.oldPrice}
        </div>
        <div className="bg-fuchsia-500 text-white font-bold text-lg text-center py-2 w-full rounded-xl">
          Ahora: CLP ${pack.price}
        </div>

        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(
            `Hola, quiero reservar: ${pack.title}`,
          )}`}
          target="_blank"
          className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white py-2 rounded-xl"
        >
          <FaWhatsapp /> Reservar Pack
        </a>
      </div>
    </div>
  );
}
