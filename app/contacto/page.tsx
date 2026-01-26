import { FaWhatsapp } from "react-icons/fa";

export default function ContactoPage() {
  return (
    <section className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="mb-6">¿Quieres cotizar tu evento? Escríbenos</p>
      <a
        href="https://wa.me/56949034475"
        className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl"
      >
        <FaWhatsapp /> WhatsApp
      </a>
    </section>
  );
}
