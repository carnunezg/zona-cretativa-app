"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaBoxOpen, FaCalendarCheck, FaShieldHeart, FaStar, FaTruck } from "react-icons/fa6";
import type { SiteHero } from "@/types/catalog";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Burbujas decorativas (posición, tamaño, color y retardo de la animación). */
const BUBBLES = [
  { c: "left-[3%] top-[62%] h-16 w-16 bg-sun-300/40", d: "0s" },
  { c: "left-[14%] bottom-[18%] h-24 w-24 bg-pink-400/25", d: "1.2s" },
  { c: "right-[8%] top-[16%] h-20 w-20 bg-white/15", d: "0.6s" },
  { c: "right-[18%] bottom-[24%] h-12 w-12 bg-sun-300/45", d: "2s" },
  { c: "left-[52%] top-[14%] h-10 w-10 bg-white/20", d: "1.6s" },
  { c: "left-[38%] bottom-[12%] h-14 w-14 bg-emerald-300/25", d: "0.3s" },
];

const TRUST = [
  { icon: FaCalendarCheck, label: "Reserva en línea" },
  { icon: FaTruck, label: "Entrega coordinada" },
  { icon: FaShieldHeart, label: "Servicios seguros" },
];

export default function HeroSection({ hero }: { hero: SiteHero }) {
  const reduce = useReducedMotion();
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } } };
  const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-28 sm:pt-32 sm:pb-36">
      <Image src="/images/fondoamanda.webp" alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-br from-brand-950/95 via-brand-800/90 to-brand-600/85" />
      {/* Luces de color */}
      <div className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-sun-400/25 blur-3xl" />
      <div className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-pink-500/20 blur-3xl" />
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          aria-hidden
          className={`animate-float-slow absolute hidden rounded-full ring-1 ring-white/20 backdrop-blur-[2px] sm:block ${b.c}`}
          style={{ animationDelay: b.d }}
        />
      ))}

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6"
      >
        {/* Logo (arriba en celulares, a la derecha en escritorio) */}
        <motion.div variants={item} className="relative mx-auto w-[300px] sm:w-[420px] lg:order-2 lg:w-full lg:max-w-[560px]">
          <div className="absolute inset-[12%] rounded-full bg-sun-300/30 blur-3xl" aria-hidden />
          <Image
            src="/images/logo-zona-creativa.webp"
            alt="Zona Creativa"
            width={1242}
            height={828}
            priority
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 560px"
            className="animate-float relative h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        <div className="text-center lg:order-1 lg:text-left">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-xs font-bold tracking-wide text-sun-200 ring-1 ring-white/25 backdrop-blur-md sm:text-sm"
          >
            <FaStar className="text-sun-300" /> Cumpleaños y celebraciones infantiles
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-[2.15rem] leading-[1.08] font-extrabold text-white drop-shadow-sm sm:text-5xl lg:text-[3.6rem]"
          >
            {hero.title}
          </motion.h1>

          <motion.p variants={item} className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:mx-0">
            {hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/reservar" className="zc-btn zc-btn-green zc-shine w-full max-w-xs px-8 text-base sm:w-auto">
              <FaCalendarCheck className="text-lg" /> Reservar en línea
            </Link>
            <Link href="/productos" className="zc-btn zc-btn-ghost w-full max-w-xs px-8 text-base sm:w-auto">
              <FaBoxOpen className="text-lg" /> Ver servicios
            </Link>
          </motion.div>

          <motion.ul variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-sun-300 ring-1 ring-white/20">
                  <Icon />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Ola inferior */}
      <div className="absolute -bottom-px left-0 w-full leading-none" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[70px] w-full sm:h-[110px]">
          <path d="M0,64 C240,120 480,8 720,40 C960,72 1200,124 1440,56 L1440,120 L0,120 Z" fill="#f6f8fd" />
        </svg>
      </div>
    </section>
  );
}
