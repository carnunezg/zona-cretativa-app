"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full flex justify-center pt-35 sm:pt-16 md:pt-12">
      <div
        className={`
          relative w-[340px] sm:w-[420px] md:w-[520px] lg:w-[620px]
          transition-transform duration-1000 ease-out
          ${animate ? "rotate-[360deg]" : "rotate-0"}
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
