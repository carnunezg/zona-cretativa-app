"use client";

import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import type { CatalogProduct } from "@/types/catalog";
import type { MediaItem } from "@/types/media";
import { coverFor } from "@/lib/media";

import "swiper/css";
import "swiper/css/pagination";

export default function ProductsSection({ products, media }: { products: CatalogProduct[]; media: MediaItem[] }) {
  if (!products.length) return null;
  return (
    <section
      id="productos"
      className="relative w-full scroll-mt-28 py-14 sm:py-20"
    >
      <div className="relative max-w-6xl mx-auto px-4">
        <SectionHeading eyebrow="Nuestros servicios" title="Servicios para cada celebración" subtitle="Inflables, cama elástica, piscina de pelotas y mucho más." />

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
            1024: { slidesPerView: 4 },
          }}
          className="zc-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="h-auto! px-1 pt-3 pb-5">
              <ProductCard product={product} cover={coverFor(media, { type: "product", id: product.id })} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 text-center">
          <Link href="/productos" className="zc-btn zc-btn-white group text-sm">
            Ver todos los servicios
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

    </section>
  );
}
