"use client";

import { packs } from "@/data/packs";
import PackCard from "@/components/PackCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

export default function PacksSection() {
  return (
    <section
      id="packs"
      className="relative w-full bg-orange-200 scroll-mt-28 pb-14 sm:pb-16"
    >
      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-orange-500">
          Packs
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
            1024: { slidesPerView: 3 },
          }}
          className="pb-6"
        >
          {packs.map((pack) => (
            <SwiperSlide key={pack.id} className="flex justify-center">
              <PackCard pack={pack} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BOTÓN */}
        <div className="mt-6 text-center">
          <Link
            href="/packs"
            className="
              inline-block
              bg-fuchsia-600 hover:bg-fuchsia-700
              text-white font-bold
              py-2.5 px-8
              rounded-full
              transition-colors duration-300
            "
          >
            Ver todos los packs
          </Link>
        </div>
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
