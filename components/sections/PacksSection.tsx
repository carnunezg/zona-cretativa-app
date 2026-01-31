"use client";

import { packs } from "@/data/packs";
import PackCard from "@/components/PackCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Importa estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";

export default function PacksSection() {
  return (
    <section
      id="packs"
      className="
        w-full
        pt-8
        pb-24   /* aumenté el padding bottom para que los puntos se vean */
        scroll-mt-28
        bg-gradient-to-b from-orange-500/95 via-orange-400/85 to-orange-300/90
      "
    >
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
          Packs
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
            1024: { slidesPerView: 3 },
          }}
          className="relative"
        >
          {packs.map((pack) => (
            <SwiperSlide key={pack.id}>
              <div className="px-2 sm:px-3">
                <PackCard pack={pack} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dots flotando más abajo y más visibles */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <style jsx global>{`
            .swiper-pagination {
              position: static !important;
              display: flex;
              justify-content: center;
              gap: 6px;
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
    </section>
  );
}
