"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

export default function ProductsSection() {
  return (
    <section
      id="productos"
      className="relative w-full scroll-mt-28 pb-5 sm:pb-10"
    >
      {/* CONTENIDO */}
      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-5 text-center text-blue-900">
          Productos
        </h2>

        {/* SLIDER */}
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-6"
        >
          {products.slice(0, 6).map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BOTÓN */}
        <div className="mt-6 text-center">
          <Link
            href="/productos"
            className="
              inline-block
              bg-blue-600 hover:bg-blue-700
              text-white font-bold
               text-sm sm:text-xs md:text-sm
              py-2 px-5
              rounded-full
              transition-colors duration-300
            "
          >
            Ver todos
          </Link>
        </div>
      </div>
      {/* LÍNEA SEPARADORA */}
      <div className="mt-10 w-full border-t border-slate-300/60"></div>
    </section>
  );
}
