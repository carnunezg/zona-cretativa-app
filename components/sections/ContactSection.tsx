import { FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { socialHandle, whatsappLink } from "@/lib/site";
import type { SiteContact } from "@/types/catalog";

interface Props {
  /** "section" para el inicio (h2) o "page" para /contacto (h1) */
  variant?: "section" | "page";
  contact: SiteContact;
}

export default function ContactSection({ variant = "section", contact }: Props) {
  const Heading = variant === "page" ? "h1" : "h2";
  const channels = [
    { href: contact.instagram, label: "Instagram", detail: socialHandle(contact.instagram), icon: FaInstagram, color: "from-pink-500 to-orange-400" },
    { href: contact.facebook, label: "Facebook", detail: socialHandle(contact.facebook).replace(/^@/, ""), icon: FaFacebook, color: "from-brand-600 to-brand-400" },
    { href: `mailto:${contact.email}`, label: "Correo", detail: contact.email, icon: FaEnvelope, color: "from-sun-500 to-sun-400" },
  ].filter((c) => c.detail && c.href && c.href !== "mailto:");

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-lift">
      <div className="grid md:grid-cols-[1.05fr_1fr]">
        <div className="relative overflow-hidden bg-linear-to-br from-brand-700 to-brand-500 p-8 text-white sm:p-10">
          <span aria-hidden className="animate-float-slow absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-sun-400/30 blur-2xl" />
          <span className="zc-eyebrow bg-white/15 text-white ring-white/25">Hablemos</span>
          <Heading className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">¿Tienes dudas? Te ayudamos</Heading>
          <p className="mt-3 text-white/85">
            Escríbenos por WhatsApp y te respondemos a la brevedad para ayudarte a armar la celebración perfecta.
          </p>
          <a
            href={whatsappLink("Hola, quiero más información sobre Zona Creativa", contact.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="zc-btn zc-btn-green zc-shine relative mt-7 w-full sm:w-auto"
          >
            <FaWhatsapp className="text-xl" /> Escribir por WhatsApp
          </a>
          <p className="relative mt-3 text-sm font-semibold text-white/80">{contact.whatsapp}</p>
        </div>

        <ul className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          {channels.map(({ href, label, detail, icon: Icon, color }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${color}`}>
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-brand-900">{label}</span>
                  <span className="block truncate text-sm text-slate-500">{detail}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
