"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeño retraso para que la animación se vea al cargar
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="w-full min-h-screen flex items-center justify-center
      bg-gradient-to-b from-pink-100 via-blue-100 to-white"
    >
      <div
        className={`
          relative w-[340px] sm:w-[420px] md:w-[520px] lg:w-[620px]
          transform transition-all duration-1000 ease-out
          ${
            isVisible
              ? "opacity-100 scale-100 rotate-0 translate-y-0"
              : "opacity-0 scale-50 rotate-180 translate-y-20"
          }
        `}
      >
        <Image
          src="/images/ZONA CREATIVA.png"
          alt="Zona Creativa"
          width={900}
          height={650}
          priority
          className="mx-auto"
        />
      </div>
    </section>
  );
}
