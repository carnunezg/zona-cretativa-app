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
      <div>
        <Image
          src="/images/zona creativa sf.png"
          alt="Zona Creativa"
          width={900}
          height={650}
          priority
          className="mx-auto contrast-125 saturate-110 brightness-105"
        />
      </div>
    </section>
  );
}
