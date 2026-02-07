"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types/product";
import { FaWhatsapp } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push(`/productos/${product.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        bg-white
        rounded-2xl
        shadow-md hover:shadow-xl
        p-3 flex flex-col
        w-full
        sm:w-[180px] md:w-full
        border border-slate-200
        cursor-pointer
      "
    >
      {/* IMAGEN */}
      <div className="relative w-full h-36 sm:h-32 md:h-48 mb-3 overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* NOMBRE */}
      <h2 className="text-lg sm:text-base md:text-xl font-extrabold text-center mb-2 text-[#1E3A8A]">
        {product.name}
      </h2>

      {/* DIMENSIONES */}
      <p className="text-center font-semibold text-[#475569] text-sm sm:text-xs md:text-sm">
        Medidas
      </p>
      <p className="text-center text-[#0F172A] text-sm sm:text-xs md:text-sm mb-2">
        {product.dimensions}
      </p>

      {/* PRECIO + CTA */}
      <div className="mt-auto flex flex-col gap-2">
        <div className="text-[#0F172A] font-extrabold text-sm sm:text-xs md:text-lg text-center py-1.5">
          CLP ${product.price}
        </div>

        <a
          href={`https://wa.me/56949034475?text=${encodeURIComponent(
            `Hola, quiero reservar: ${product.name}`,
          )}`}
          target="_blank"
          onClick={(e) => e.stopPropagation()} // 🔥 clave
          className="
            w-full
            inline-flex items-center justify-center gap-1.5
            bg-[#16A34A] hover:bg-[#15803D]
            text-white
            py-1.5
            rounded-xl
            text-sm sm:text-xs md:text-sm
            font-semibold
            transition-colors
          "
        >
          <FaWhatsapp className="text-base sm:text-sm" />
          Reservar Ahora
        </a>
      </div>
    </motion.div>
  );
}
