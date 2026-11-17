"use client";

import PackCard from "@/components/PackCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import type { CatalogPack, CatalogProduct } from "@/types/catalog";
import type { MediaItem } from "@/types/media";
import { coverFor, packProductImages } from "@/lib/media";

import "swiper/css";
import "swiper/css/pagination";

export default function PacksSection({
  packs,
  products,
  media,
}: {
  packs: CatalogPack[];
  products: CatalogProduct[];
  media: MediaItem[];
}) {
  if (!packs.length) return null;
  return (
    <section id="packs" className="relative w-full scroll-mt-28 py-14 sm:py-20">
      <div className="relative max-w-6xl mx-auto px-4">
        <SectionHeading eyebrow="Ahorra con packs" title="Packs con precio especial" subtitle="Combina servicios y ahorra en tu celebración." />

        <Swiper
          modules={[Pagination, Autoplay, A11y]}
          slidesPerView={1}
          spaceBetween={20}
          rewind
          pagination={{ clickable: true }}
          autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={650}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="zc-swiper"
        >
          {packs.map((pack) => (
            <SwiperSlide key={pack.id} className="h-auto! px-1 pt-3 pb-5">
              <PackCard
                pack={pack}
                cover={coverFor(media, { type: "pack", id: pack.id })}
                productImages={packProductImages(pack, products, media)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 text-center">
          <Link href="/packs" className="zc-btn zc-btn-white group text-sm">
            Ver todos los packs
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

    </section>
  );
}
