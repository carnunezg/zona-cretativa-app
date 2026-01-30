"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaWhatsapp,
  FaBars,
  FaXmark,
  FaHouse,
  FaBoxOpen,
  FaTags,
  FaFileContract,
  FaHouseCircleCheck,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ====== CLASES ====== */
  const textColor = scrolled ? "text-gray-900" : "text-white";
  const underlineColor = scrolled ? "after:bg-gray-900" : "after:bg-white";

  const linkClass = (path: string) =>
    `
      relative flex items-center gap-2 font-bold
      transition-colors duration-300
      ${textColor}

      after:content-['']
      after:absolute after:-bottom-1 after:left-1/2
      after:h-[2px] after:w-0
      ${underlineColor}
      after:transition-all after:duration-300

      hover:after:w-full hover:after:left-0
      ${pathname === path ? "after:w-full after:left-0" : ""}
    `;

  const socialIconClass = `
    ${textColor}
    text-2xl
    font-bold
    transition-all duration-300
    hover:scale-110
    hover:-translate-y-0.5
  `;

  return (
    <nav
      className={`
    fixed top-0 left-0 w-full z-40
    px-4 sm:px-6 py-4
    transition-all duration-300
    ${scrolled || open ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent"}
  `}
    >
      <div className="flex items-center justify-between">
        {/* IZQUIERDA: BOTÓN + LOGO */}
        <div className="flex items-center gap-3">
          <button
            className={`md:hidden text-2xl transition-colors ${textColor}`}
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <FaBars />
          </button>

          <Link href="/">
            <Image
              src="/images/logo nuevo sin fondo.png"
              alt="Logo Zona Creativa"
              width={260}
              height={100}
              priority
              className="h-16 sm:h-20 w-auto" // ↑ más grande
            />
          </Link>
        </div>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/productos" className={linkClass("/productos")}>
            <FaBoxOpen /> Productos
          </Link>
          <Link href="/packs" className={linkClass("/packs")}>
            <FaTags /> Packs
          </Link>
          <Link href="/terminos" className={linkClass("/terminos")}>
            <FaFileContract /> Términos
          </Link>
          <Link href="/condiciones" className={linkClass("/condiciones")}>
            <FaHouseCircleCheck /> Condiciones
          </Link>
        </div>

        {/* REDES SOCIALES (MOBILE + DESKTOP) */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/zonacreativapf"
            target="_blank"
            aria-label="Instagram"
            className={socialIconClass}
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/zonacreativapf"
            target="_blank"
            aria-label="Facebook"
            className={socialIconClass}
          >
            <FaFacebook />
          </a>

          <a
            href="https://wa.me/56949034475"
            target="_blank"
            aria-label="WhatsApp"
            className={socialIconClass}
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-xl p-6 space-y-4">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-900"
              aria-label="Cerrar menú"
            >
              <FaXmark />
            </button>

            {[
              ["/productos", "Productos", <FaBoxOpen key="" />],
              ["/packs", "Packs", <FaTags key="" />],
              ["/terminos", "Términos", <FaFileContract key="" />],
              ["/condiciones", "Condiciones", <FaHouseCircleCheck key="" />],
            ].map(([href, label, icon]) => (
              <Link
                key={href as string}
                href={href as string}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 font-semibold text-gray-900 ${
                  pathname === href ? "underline underline-offset-4" : ""
                }`}
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
