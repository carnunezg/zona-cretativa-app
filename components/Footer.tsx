import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-blue/100 py-6 text-center">
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

      <p className="text-sm text-gray-700">
        © 2026 Zona Creativa. Todos los derechos reservados.
      </p>
    </footer>
  );
}
