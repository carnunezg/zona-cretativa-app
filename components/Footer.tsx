import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm py-6 text-center">
      <p className="text-xs sm:text-sm text-gray-900 mb-2">
        Síguenos en nuestras redes
      </p>
      <div className="flex justify-center gap-6 text-2xl mb-3">
        <a
          href="https://www.facebook.com/zonacreativapf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
          aria-label="Facebook Zona Creativa"
        >
          <FaFacebook />
        </a>

        <a
          href="https://www.instagram.com/zonacreativapf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 transition"
          aria-label="Instagram Zona Creativa"
        >
          <FaInstagram />
        </a>

        <a
          href="mailto:zonacreativapf@gmail.com"
          className="hover:text-red-500 transition"
          aria-label="Correo Zona Creativa"
        >
          <FaEnvelope />
        </a>
      </div>

      <p className="text-xs sm:text-sm text-gray-900">
        © 2026 Zona Creativa. Todos los derechos reservados.
      </p>
    </footer>
  );
}
