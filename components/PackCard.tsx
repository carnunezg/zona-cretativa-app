import { Pack } from "@/types/pack";
import { FaWhatsapp } from "react-icons/fa6";

interface Props {
  pack: Pack;
}

export default function ComboCard({ pack }: Props) {
  const whatsappMessage = `Hola, quiero reservar: ${pack.title} 🎉`;

  return (
    <div
      className=" bg-white rounded-2xl shadow-md hover:shadow-xl 
    transition-transform duration-300 ease-out 
    hover:-translate-y-1 hover:scale-105
    p-4 flex flex-col"
    >
      <h3 className="text-2xl font-bold text-pink-500 mb-2">{pack.title}</h3>

      <p className="text-gray-700 mb-6">{pack.description}</p>

      <div className="mt-4 flex flex-col gap-3">
        <div className="bg-fuchsia-500 text-white font-bold text-lg text-center py-2 w-full rounded-xl">
          Precio: ${pack.price}
        </div>

        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white py-2 rounded-xl"
        >
          <FaWhatsapp /> Reservar Pack
        </a>
      </div>
    </div>
  );
}
