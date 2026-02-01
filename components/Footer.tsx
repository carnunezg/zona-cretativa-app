import {
  FaTruck,
  FaShieldHeart,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaFaceSmile,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative bg-[#F8FAFC] text-[#0F172A]">
      {/* MEDIA LUNA HACIA ARRIBA */}
      <div className="absolute -top-16 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-[70px] sm:h-[90px]"
        >
          <path
            d="
              M0,90
              C360,10 1080,10 1440,90
              L1440,0
              L0,0
              Z
            "
            fill="#F8FAFC"
          />
        </svg>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-8">
        {/* ICONOS INFORMATIVOS */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center justify-items-center mb-10">
              <div className="flex flex-col items-center gap-2">
                <FaFaceSmile className="text-3xl text-[#2563EB]" />
                <p className="text-sm font-semibold text-[#0F172A]">
                  Momentos felices
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <FaTruck className="text-3xl text-[#2563EB]" />
                <p className="text-sm font-semibold text-[#0F172A]">
                  Entrega coordinada
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <FaShieldHeart className="text-3xl text-[#2563EB]" />
                <p className="text-sm font-semibold text-[#0F172A]">
                  Uso responsable
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <FaWhatsapp className="text-3xl text-[#2563EB]" />
                <p className="text-sm font-semibold text-[#0F172A]">
                  Contacto directo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEA SEPARADORA */}
        <div className="w-full border-t border-slate-300/60 mb-8"></div>

        {/* REDES SOCIALES */}
        <div className="text-center">
          <p className="text-xs mb-3 font-medium text-[#475569]">
            Síguenos en nuestras redes
          </p>

          <div className="flex justify-center gap-6 text-xl mb-3">
            <a
              href="https://www.facebook.com/zonacreativapf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:text-[#1E3A8A] transition"
              aria-label="Facebook Zona Creativa"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/zonacreativapf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:text-[#1E3A8A] transition"
              aria-label="Instagram Zona Creativa"
            >
              <FaInstagram />
            </a>

            <a
              href="mailto:zonacreativapf@gmail.com"
              className="text-[#2563EB] hover:text-[#1E3A8A] transition"
              aria-label="Correo Zona Creativa"
            >
              <FaEnvelope />
            </a>
          </div>

          <p className="text-[11px] text-[#475569]">
            © 2026 Zona Creativa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
