import type { MediaItem } from "@/types/media";

/** Servicio publicado (sale del portal administrativo). */
export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  billingType: "unit" | "hour";
  /** Precio por unidad en CLP. 0 = incluido; null = consultar. */
  unitPrice: number | null;
  /** Tarifa por hora cuando es el único servicio (servicios por hora). */
  hourlyRate: number | null;
  /** Tarifa por hora cuando se arrienda junto a otros servicios. */
  hourlyRateCombo: number | null;
  description: string | null;
  dimensions: string | null;
  age: string | null;
  duration: string | null;
  features: string[];
  /** Imagen por defecto mientras no haya portada subida desde el portal. */
  image: string;
}

export interface PackSlot {
  label: string;
  quantity: number;
  /** Servicios que sirven para este componente (p. ej. piscina de 120 o 160 cm). */
  productIds: string[];
}

/** Pack publicado (sale del portal administrativo). */
export interface CatalogPack {
  id: string;
  slug: string;
  number: number;
  name: string;
  /** «Pack 1 Diversión Total» */
  title: string;
  age: string | null;
  price: number;
  /** Suma de sus servicios a precio normal (para mostrar el ahorro). */
  regularPrice: number;
  /** «Castillo Inflable + Piscina de Pelotas + 2 Pony Saltarín» */
  includes: string;
  description: string | null;
  duration: string | null;
  features: string[];
  slots: PackSlot[];
  /** Imagen por defecto, si existe (los packs sin foto muestran sus servicios). */
  image: string | null;
}

export interface SiteHero {
  title: string;
  subtitle: string;
}

export interface SiteContact {
  /** Como se muestra: «+56 9 4903 4475» */
  whatsapp: string;
  /** Solo dígitos, para wa.me: «56949034475» */
  whatsappNumber: string;
  email: string;
  instagram: string;
  facebook: string;
}

export interface SiteData {
  products: CatalogProduct[];
  packs: CatalogPack[];
  media: MediaItem[];
  hero: SiteHero;
  contact: SiteContact;
}
