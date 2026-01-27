"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaBars, FaXmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (path: string) =>
    `
    block px-4 py-2 rounded-lg font-medium transition
    hover:bg-fuchsia-200 hover:text-fuchsia-900
    ${pathname === path ? "bg-fuchsia-500 text-white" : "text-gray-900"}
  `;

  return (
    <nav className="sticky top-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/ZONA CREATIVA.png"
            alt="Logo Zona Creativa"
            width={120}
            height={60}
            className="object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className={linkClass("/")}>
            Inicio
          </Link>
          <Link href="/productos" className={linkClass("/productos")}>
            Productos
          </Link>
          <Link href="/packs" className={linkClass("/packs")}>
            Packs
          </Link>
          <Link
            href="/contacto"
            className={`${linkClass("/contacto")} flex items-center gap-2`}
          >
            <span>Contacto</span>
            <FaWhatsapp className="text-green-500 text-xl" />
          </Link>
        </div>

        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden pointer-events-none">
          <div
            onClick={() => setOpen(false)}
            className={`
      absolute inset-0 bg-black/30 transition-opacity duration-500
      ${open ? "opacity-100 pointer-events-auto" : "opacity-0"}
    `}
          />

          <div
            className={`
      fixed top-0 right-0
      w-72
      bg-white/90 backdrop-blur-md
      rounded-2xl
      shadow-xl
      p-6 pt-15 space-y-3

      transform transition-all duration-300 ease-out
      ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}

      pointer-events-auto
    `}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-900 hover:scale-110 transition"
              aria-label="Cerrar menú"
            >
              <FaXmark />
            </button>

            <Link
              href="/"
              className={linkClass("/")}
              onClick={() => setOpen(false)}
            >
              Inicio
            </Link>

            <Link
              href="/productos"
              className={linkClass("/productos")}
              onClick={() => setOpen(false)}
            >
              Productos
            </Link>

            <Link
              href="/packs"
              className={linkClass("/packs")}
              onClick={() => setOpen(false)}
            >
              Packs
            </Link>

            <Link
              href="/contacto"
              className={`${linkClass("/contacto")} flex items-center gap-2`}
              onClick={() => setOpen(false)}
            >
              <span>Contacto</span>
              <FaWhatsapp className="text-green-500 text-xl" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
