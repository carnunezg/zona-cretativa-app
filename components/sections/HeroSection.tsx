"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="
        relative
        min-h-[100svh]
        md:h-[75vh]
        lg:h-[80vh]
        pt-24 sm:pt-28
        pb-0
        overflow-hidden
        flex items-center justify-center
      "
    >
      {/* FONDO */}
      <Image
        src="/images/fondoamanda.jpeg"
        alt="Fondo Zona Creativa"
        fill
        priority
        className="object-cover"
      />

      {/* OVERLAY AZUL MARCA */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/95 via-blue-800/90 to-blue-700/85" />

      {/* EFECTOS DE LUZ */}
      <div className="absolute top-[-140px] right-[-140px] w-[340px] h-[340px] bg-yellow-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-160px] left-[-160px] w-[360px] h-[360px] bg-white/20 rounded-full blur-3xl" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <Image
          src="/images/logo nuevo sin fondo.png"
          alt="Zona Creativa"
          width={1400}
          height={1000}
          priority
          className="
            mx-auto
            w-[360px] sm:w-[420px] md:w-[600px] lg:w-[680px] xl:w-[760px]
            -translate-y-6 sm:-translate-y-4 md:-translate-y-6 lg:-translate-y-8
            drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)]
          "
        />
      </div>

      {/* CURVA FINAL – MEDIALUNA LIMPIA */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-[70px] sm:h-[90px]"
        >
          <path
            d="
              M0,0
              C360,80 1080,80 1440,0
              L1440,90
              L0,90
              Z
            "
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}
