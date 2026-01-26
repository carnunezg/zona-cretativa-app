import { FaWhatsapp } from "react-icons/fa";

export default function ContactoPage() {
  return (
    <section className="p-8 text-center w-full min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-white">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="mb-6">
        Si quieres más información sobre nuestros productos,
        <br />
        escríbenos.
      </p>

      <a
        href="https://wa.me/56949034475"
        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl"
      >
        <FaWhatsapp /> WhatsApp
      </a>
    </section>
  );
}
