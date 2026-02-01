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
      className="relative w-full scroll-mt-28 pb-20 sm:pb-24"
    >
      {/* CONTENIDO */}
      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-orange-500">
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
              bg-fuchsia-600 hover:bg-fuchsia-700
              text-white font-bold
              py-2.5 px-8
              rounded-full
              transition-colors duration-300
            "
          >
            Ver todos los productos
          </Link>
        </div>
      </div>

      {/* CURVA FINAL MEDIA LUNA */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
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
            fill="#FFD6A7"
          />
        </svg>
      </div>

      {/* SWIPER DOTS */}
      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 6px;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #f97316 !important;
          opacity: 0.6;
          border-radius: 9999px;
          transition: all 0.3s;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}
