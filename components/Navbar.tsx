"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaBoxOpen,
  FaTags,
  FaFileContract,
  FaHouseCircleCheck,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Color de texto y líneas
  const textColor = scrolled || open ? "text-gray-900" : "text-white";
  const hamburgerColor = scrolled || open ? "bg-gray-900" : "bg-white";
  const underlineColor =
    scrolled || open ? "after:bg-gray-900" : "after:bg-white";

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
    ${textColor} text-2xl font-bold
    transition-all duration-300
    hover:scale-110
    hover:-translate-y-0.5
  `;

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        px-4 sm:px-6 py-4
        transition-all duration-300
        ${scrolled || open ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"}
      `}
    >
      <div className="flex items-center justify-between relative z-20">
        {/* HAMBURGER + LOGO */}
        <div className="flex items-center gap-3">
          {/* HAMBURGER A LA IZQUIERDA */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
          >
            {/* Línea superior */}
            <span
              className={`
                block h-0.5 w-6 ${hamburgerColor} transform transition duration-300 ease-in-out
                ${open ? "rotate-45 absolute top-1/2 -translate-y-1/2" : ""}
              `}
            />
            {/* Línea del medio */}
            <span
              className={`
                block h-0.5 w-6 ${hamburgerColor} transition-all duration-300 ease-in-out
                ${open ? "opacity-0" : ""}
              `}
            />
            {/* Línea inferior */}
            <span
              className={`
                block h-0.5 w-6 ${hamburgerColor} transform transition duration-300 ease-in-out
                ${open ? "-rotate-45 absolute top-1/2 -translate-y-1/2" : ""}
              `}
            />
          </button>

          {/* LOGO */}
          <Link href="/">
            <Image
              src="/images/logo nuevo sin fondo.png"
              alt="Zona Creativa"
              width={260}
              height={100}
              className="h-16 sm:h-20 w-auto"
            />
          </Link>
        </div>

        {/* MENU DESKTOP */}
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

        {/* REDES SOCIALES */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/zonacreativapf"
            target="_blank"
            className={socialIconClass}
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/zonacreativapf"
            target="_blank"
            className={socialIconClass}
          >
            <FaFacebook />
          </a>
          <a
            href="https://wa.me/56949034475"
            target="_blank"
            className={socialIconClass}
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`
          md:hidden absolute top-full left-0 w-full
          bg-white/90 backdrop-blur-md shadow-lg
          transition-all duration-300
          ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        `}
      >
        <div className="flex flex-col gap-4 p-6">
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
              className={`flex items-center gap-3 font-semibold text-gray-900 hover:text-orange-500`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
