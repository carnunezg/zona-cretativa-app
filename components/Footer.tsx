import Image from "next/image";
import Link from "next/link";
import { FaCalendarCheck, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "@/lib/site";
import type { SiteContact } from "@/types/catalog";

const LINKS = [
  { href: "/productos", label: "Servicios" },
  { href: "/packs", label: "Packs" },
  { href: "/reservar", label: "Reservar en línea" },
  { href: "/contacto", label: "Contacto" },
];
const LEGAL = [
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/condiciones", label: "Requisitos del espacio" },
];

export default function Footer({ contact }: { contact: SiteContact }) {
  const socials = [
    { href: contact.instagram, label: "Instagram", icon: FaInstagram },
    { href: contact.facebook, label: "Facebook", icon: FaFacebook },
    { href: whatsappLink(undefined, contact.whatsappNumber), label: "WhatsApp", icon: FaWhatsapp },
  ].filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-brand-900 to-brand-950 text-white">
      <span aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-sun-400/10 blur-3xl" />
      <span aria-hidden className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-28 sm:px-6 sm:pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <Link href="/" aria-label="Zona Creativa - Inicio" className="inline-block">
              <Image src="/images/logo-zona-creativa-nav.webp" alt="Zona Creativa" width={520} height={347} className="h-20 w-auto" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Servicios infantiles para cumpleaños y celebraciones. Creamos espacios para disfrutar.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} de Zona Creativa`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun-400 hover:text-brand-900"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Explora">
            <p className="text-sm font-bold tracking-[0.14em] text-sun-300 uppercase">Explora</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Información">
            <p className="text-sm font-bold tracking-[0.14em] text-sun-300 uppercase">Información</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/75 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold tracking-[0.14em] text-sun-300 uppercase">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={whatsappLink(undefined, contact.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/80 hover:text-white">
                  <FaWhatsapp className="text-base text-emerald-400" /> {contact.whatsapp}
                </a>
              </li>
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 break-all text-white/80 hover:text-white">
                    <FaEnvelope className="shrink-0 text-base text-sun-300" /> {contact.email}
                  </a>
                </li>
              )}
            </ul>
            <Link href="/reservar" className="zc-btn zc-btn-sun mt-5 py-2.5 text-sm">
              <FaCalendarCheck /> Reservar ahora
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Zona Creativa · Todos los derechos reservados</p>
          <p>Hecho con cariño para las mejores celebraciones 🎈</p>
        </div>
      </div>
    </footer>
  );
}
