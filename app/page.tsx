import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center
      bg-gradient-to-b from-pink-100 via-blue-100 to-white"
    >
      <div
        className="
        relative
        w-[340px]
        sm:w-[420px]
        md:w-[520px]
        lg:w-[620px]
      "
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
