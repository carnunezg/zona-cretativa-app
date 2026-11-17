// Configuración general de Zona Creativa.
// Los datos de contacto y los textos de portada se editan en el portal
// administrativo (Sitio web → Contenido del sitio); aquí quedan los valores por
// defecto que se usan mientras no se hayan editado.
import type { SiteContact, SiteHero } from "@/types/catalog";

export const SITE_NAME = "Zona Creativa";

export const SITE_DESCRIPTION =
  "Arriendo de servicios infantiles para cumpleaños y celebraciones: castillos inflables, cama elástica, piscina de pelotas, resbalín, ponys saltarines y más.";

// URL pública del sitio (para SEO, sitemap y Open Graph). Se define en el
// entorno de despliegue: NEXT_PUBLIC_SITE_URL=https://tu-dominio.cl
// Si no está definida, en Vercel se usa la dirección de producción del proyecto.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

export const digitsOnly = (v: string) => (v ?? "").replace(/\D/g, "");

export const DEFAULT_HERO: SiteHero = {
  title: "Arriendo de servicios infantiles para cumpleaños y celebraciones",
  subtitle: "Castillos inflables, cama elástica, piscina de pelotas, resbalín, ponys saltarines y mucho más para que los niños vivan un día inolvidable.",
};

export const DEFAULT_CONTACT: SiteContact = {
  whatsapp: "+56 9 4903 4475",
  whatsappNumber: "56949034475",
  email: "zonacreativapf@gmail.com",
  instagram: "https://www.instagram.com/zonacreativapf",
  facebook: "https://www.facebook.com/zonacreativapf",
};

/** Enlace a WhatsApp con mensaje opcional. */
export function whatsappLink(message?: string, number: string = DEFAULT_CONTACT.whatsappNumber) {
  const base = `https://wa.me/${digitsOnly(number) || DEFAULT_CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** «@zonacreativapf» a partir de la URL de Instagram o Facebook. */
export function socialHandle(url: string) {
  try {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
    return path ? `@${path.split("/")[0]}` : url;
  } catch {
    return url;
  }
}
