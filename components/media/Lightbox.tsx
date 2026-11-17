"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";

export interface LightboxSlide {
  src: string;
  alt: string;
  title?: string | null;
  description?: string | null;
  href?: string;
  hrefLabel?: string;
  fit?: "contain" | "cover";
}

interface Props {
  slides: LightboxSlide[];
  index: number | null;
  onChange: (index: number | null) => void;
}

export default function Lightbox({ slides, index, onChange }: Props) {
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null && slides.length > 0;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + slides.length) % slides.length);
    },
    [index, onChange, slides.length],
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onChange]);

  if (!open || index === null) return null;
  const slide = slides[index];
  const many = slides.length > 1;

  // Portal al <body>: evita que un contenedor con transform (animaciones)
  // limite el visor al tamaño de la sección.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide.title || slide.alt}
      className="fixed inset-0 z-[70] flex flex-col bg-blue-950/95 backdrop-blur-sm"
      onClick={() => onChange(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm font-semibold text-white/80">
          {many ? `${index + 1} / ${slides.length}` : ""}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onChange(null)}
          aria-label="Cerrar"
          className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-2xl transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          <FaXmark />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 mx-2 sm:mx-16">
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          className="object-contain select-none"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {many && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1E3A8A] flex items-center justify-center shadow-lg transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1E3A8A] flex items-center justify-center shadow-lg transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      <div
        className="px-4 py-4 text-center text-white min-h-[4.5rem]"
        onClick={(e) => e.stopPropagation()}
      >
        {slide.title && <p className="font-extrabold text-lg">{slide.title}</p>}
        {slide.description && (
          <p className="text-sm text-white/80 max-w-2xl mx-auto mt-1">
            {slide.description}
          </p>
        )}
        {slide.href && (
          <Link
            href={slide.href}
            className="inline-block mt-2 bg-yellow-400 hover:bg-yellow-300 text-[#1E3A8A] font-bold text-sm py-2 px-5 rounded-full transition-colors"
          >
            {slide.hrefLabel ?? "Ver más"}
          </Link>
        )}
      </div>
    </div>,
    document.body,
  );
}
