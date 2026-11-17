"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaBoxOpen,
  FaCalendarCheck,
  FaChevronRight,
  FaFacebook,
  FaFileContract,
  FaHouse,
  FaHouseCircleCheck,
  FaInstagram,
  FaTags,
  FaWhatsapp,
} from "react-icons/fa6";
import { whatsappLink } from "@/lib/site";
import type { SiteContact } from "@/types/catalog";

const LINKS = [
  { href: "/", label: "Inicio", icon: FaHouse },
  { href: "/productos", label: "Servicios", icon: FaBoxOpen },
  { href: "/packs", label: "Packs", icon: FaTags },
  { href: "/terminos", label: "Términos", icon: FaFileContract },
  { href: "/condiciones", label: "Requisitos del espacio", icon: FaHouseCircleCheck },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export default function Navbar({ contact }: { contact: SiteContact }) {
  const pathname = usePathname() ?? "/";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú del celular al cambiar de página (patrón recomendado por React).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const solid = scrolled || open;
  const socials = [
    { href: contact.instagram, label: "Instagram", icon: FaInstagram },
    { href: contact.facebook, label: "Facebook", icon: FaFacebook },
    { href: whatsappLink(undefined, contact.whatsappNumber), label: "WhatsApp", icon: FaWhatsapp },
  ].filter((s) => s.href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Principal"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-3 py-2 transition-all duration-500 sm:px-4 ${
          solid
            ? "bg-white/85 shadow-[0_10px_40px_-12px_rgba(15,26,58,0.35)] ring-1 ring-slate-200/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-1.5">
          {/* Botón de menú (celular) */}
          <button
            type="button"
            className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden ${
              solid ? "text-brand-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute top-1.5 left-0 h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>

          <Link href="/" aria-label="Zona Creativa - Inicio" className="shrink-0">
            <Image
              src="/images/logo-zona-creativa-nav.webp"
              alt="Zona Creativa"
              width={520}
              height={347}
              priority
              className={`w-auto transition-all duration-500 ${scrolled ? "h-11 sm:h-12" : "h-14 sm:h-16"}`}
            />
          </Link>
        </div>

        {/* Enlaces (escritorio): cápsula con indicador deslizante */}
        <ul
          className={`hidden items-center gap-1 rounded-full p-1 transition-colors duration-500 lg:flex ${
            solid ? "bg-slate-100/80 ring-1 ring-slate-200/60" : "bg-white/10 ring-1 ring-white/20 backdrop-blur-md"
          }`}
        >
          {LINKS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href} className="relative">
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full shadow-sm ${solid ? "bg-brand-700" : "bg-white"}`}
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 block rounded-full px-4 py-2 text-[0.93rem] font-semibold whitespace-nowrap transition-colors duration-300 xl:px-5 ${
                    active
                      ? solid
                        ? "text-white"
                        : "text-brand-800"
                      : solid
                        ? "text-slate-600 hover:bg-white hover:text-brand-800"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link href="/reservar" className="zc-btn zc-btn-sun hidden px-5 py-2.5 text-sm lg:inline-flex">
            <FaCalendarCheck /> Reservar
          </Link>
          <span className={`mx-1 hidden h-6 w-px xl:block ${solid ? "bg-slate-200" : "bg-white/25"}`} aria-hidden />
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} de Zona Creativa`}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition-all duration-300 hover:-translate-y-0.5 sm:h-10 sm:w-10 sm:text-lg ${
                solid
                  ? "bg-slate-100 text-brand-800 hover:bg-brand-700 hover:text-white"
                  : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white hover:text-brand-800"
              }`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </nav>

      {/* Menú del celular */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={reduce ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl bg-white/95 p-2 shadow-[0_20px_50px_-15px_rgba(15,26,58,0.45)] ring-1 ring-slate-200/70 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1">
              {LINKS.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 font-semibold transition-colors ${
                        active ? "bg-brand-50 text-brand-800" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? "bg-brand-700 text-white" : "bg-slate-100 text-brand-700"}`}>
                        <Icon />
                      </span>
                      <span className="flex-1">{label}</span>
                      <FaChevronRight className="text-xs text-slate-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 border-t border-slate-100 p-2 pt-3">
              <Link href="/reservar" className="zc-btn zc-btn-green w-full">
                <FaCalendarCheck /> Reservar en línea
              </Link>
              <div className="mt-3 flex justify-center gap-2">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de Zona Creativa`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg text-brand-800 transition-colors hover:bg-brand-700 hover:text-white"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
