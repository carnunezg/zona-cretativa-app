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
    <section id="packs" className="relative w-full scroll-mt-28 pb-5 sm:pb-10">
      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-5 text-center text-blue-900">
          Packs
        </h2>

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

        <div className="mt-6 text-center">
          <Link
            href="/packs"
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

      <div className="mt-10 w-full border-t border-slate-300/60"></div>
    </section>
  );
}
