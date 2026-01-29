import { FaWhatsapp } from "react-icons/fa";

export default function ContactoPage() {
  return (
    <section
      className="
        flex-1
        flex justify-center items-center
        px-4 sm:px-10
      "
    >
      <div
        className="
          max-w-md w-full
          bg-white/80 backdrop-blur-md
          rounded-3xl
          shadow-xl
          p-8 text-center
          border border-white/40
        "
      >
        <h1 className="text-3xl font-bold mb-4 text-fuchsia-700">Contacto</h1>

        <p className="mb-6 text-gray-700">
          Si tienes dudas o necesitas más información sobre nuestros productos,
          escríbenos por WhatsApp y te responderemos al instante.
        </p>

        <a
          href="https://wa.me/56949034475"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            bg-green-500 hover:bg-green-400
            text-white px-6 py-3
            rounded-xl
            transition shadow-md
          "
        >
          <FaWhatsapp className="text-xl" />
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  );
}
