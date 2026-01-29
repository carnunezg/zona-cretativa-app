"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section
      className="
        relative
        flex-1
        flex items-center justify-center
        overflow-hidden
      "
    >
      <div className="relative z-10 mt-7">
        <Image
          src="/images/zona creativa sf.png"
          alt="Zona Creativa"
          width={900}
          height={650}
          priority
          className="
            mx-auto
            w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px]
            contrast-125
            saturate-110
            brightness-105
            pointer-events-none
            
          "
        />
      </div>
    </section>
  );
}
