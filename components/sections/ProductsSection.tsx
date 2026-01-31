"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

// Importa estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";

export default function ProductsSection() {
  return (
    <section
      id="productos"
      className="w-full relative pt-16 scroll-mt-28 bg-gradient-to-b from-orange-500/95 via-orange-400/85 to-orange-300/90"
    >
      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
          Productos
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="relative"
        >
          {products.slice(0, 6).map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botón para ver todos los productos */}
        <div className="mt-6 text-center">
          <Link
            href="/productos"
            className="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
          >
            Ver todos los productos
          </Link>
        </div>

        {/* Dots flotando */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50">
          <style jsx global>{`
            .swiper-pagination {
              position: static !important;
              display: flex;
              justify-content: center;
              gap: 8px;
            }
            .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              background: #f97316 !important; /* naranja */
              opacity: 0.7;
              border-radius: 50%;
              transition: all 0.3s;
            }
            .swiper-pagination-bullet-active {
              opacity: 1;
              transform: scale(1.3);
            }
          `}</style>
        </div>
      </div>

      {/* CURVA FINAL */}
      <div className="mt-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-[70px] sm:h-[90px]"
        >
          <defs>
            <linearGradient id="gradientHero" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgb(251 191 36)"
                stopOpacity="0.95"
              />
              <stop
                offset="50%"
                stopColor="rgb(252 165 50)"
                stopOpacity="0.85"
              />
              <stop
                offset="100%"
                stopColor="rgb(253 186 116)"
                stopOpacity="0.9"
              />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C240,90 480,0 720,20 960,40 1200,80 1440,40 L1440,0 L0,0 Z"
            fill="url(#gradientHero)"
          />
        </svg>
      </div>
    </section>
  );
}
