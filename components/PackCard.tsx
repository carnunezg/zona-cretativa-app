import { Pack } from "@/types/pack";
import { FaWhatsapp } from "react-icons/fa6";

interface Props {
  pack: Pack;
}

export default function ComboCard({ pack }: Props) {
  const whatsappMessage = `Hola, quiero información del ${pack.title} 🎉`;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col">
      <h3 className="text-2xl font-bold text-pink-500 mb-2">{pack.title}</h3>

      <p className="text-gray-700 mb-6">{pack.description}</p>
      <div className="p-2">
        <h1
          className="
    mt-4
    bg-fuchsia-500
    text-white
    font-bold
    text-lg
    text-center
    py-2
    px-4
    rounded-xl
  "
        >
          Precio: ${pack.price}
        </h1>
      </div>

      <a
        href={`https://wa.me/56949034475?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        className="mt-auto inline-flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-white py-3 rounded-xl"
      >
        <FaWhatsapp /> Reservar Pack
      </a>
    </div>
  );
}
