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
} from "react-icons/fa6";
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
            src="/images/logozc.png"
            alt="Logo Zona Creativa"
            width={300}
            height={120}
            priority
            className="h-14 sm:h-16 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className={`${linkClass("/")} flex items-center gap-2`}
          >
            <FaHouse className="text-lg opacity-80" />
            <span>Inicio</span>
          </Link>

          <Link
            href="/productos"
            className={`${linkClass("/productos")} flex items-center gap-2`}
          >
            <FaBoxOpen className="text-lg opacity-80" />
            <span>Productos</span>
          </Link>

          <Link
            href="/packs"
            className={`${linkClass("/packs")} flex items-center gap-2`}
          >
            <FaTags className="text-lg opacity-80" />
            <span>Packs</span>
          </Link>

          <Link
            href="/terminos"
            className={`${linkClass("/terminos")} flex items-center gap-2`}
          >
            <FaFileContract className="text-lg opacity-80" />
            <span>Términos</span>
          </Link>

          <Link
            href="/condiciones"
            className={`${linkClass("/condiciones")} flex items-center gap-2`}
          >
            <FaHouseCircleCheck className="text-lg opacity-80" />
            <span>Condiciones</span>
          </Link>

          <Link
            href="/contacto"
            className={`${linkClass("/contacto")} flex items-center gap-2`}
          >
            <FaWhatsapp />
            <span>Contacto</span>
          </Link>
        </div>

        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/30"
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
              className="absolute top-4 right-4 text-2xl text-gray-900"
              aria-label="Cerrar menú"
            >
              <FaXmark />
            </button>

            <Link
              href="/"
              className={`${linkClass("/")} flex items-center gap-3`}
              onClick={() => setOpen(false)}
            >
              <FaHouse />
              Inicio
            </Link>

            <Link
              href="/productos"
              className={`${linkClass("/productos")} flex items-center gap-3`}
              onClick={() => setOpen(false)}
            >
              <FaBoxOpen />
              Productos
            </Link>

            <Link
              href="/packs"
              className={`${linkClass("/packs")} flex items-center gap-3`}
              onClick={() => setOpen(false)}
            >
              <FaTags />
              Packs
            </Link>
            <Link
              href="/terminos"
              className={`${linkClass("/terminos")} flex items-center gap-3`}
              onClick={() => setOpen(false)}
            >
              <FaFileContract className="text-lg" />
              Términos y Condiciones
            </Link>

            <Link
              href="/condiciones"
              className={`${linkClass("/condiciones")} flex items-center gap-3`}
              onClick={() => setOpen(false)}
            >
              <FaHouseCircleCheck className="text-lg" />
              Condiciones del Espacio
            </Link>
            <Link
              href="/contacto"
              className={`${linkClass("/contacto")} flex items-center gap-3`}
              onClick={() => setOpen(false)}
            >
              <FaWhatsapp />
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
