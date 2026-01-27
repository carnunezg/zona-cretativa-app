import { FaWhatsapp } from "react-icons/fa";

export default function ContactoPage() {
  return (
    <section
      className="
  min-h-screen
  flex justify-center items-start
  pt-20 sm:pt-24
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

        <p className="mb-5 text-sm text-gray-1000">
          Si quieres más información sobre nuestros productos, escríbenos.
        </p>

        <a
          href="https://wa.me/56949034475"
          className="
            inline-flex items-center gap-2
            bg-green-500 hover:bg-green-400
            text-white px-6 py-3
            rounded-xl
            transition shadow-md
          "
        >
          <FaWhatsapp className="text-xl" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}
