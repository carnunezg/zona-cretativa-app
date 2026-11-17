import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { CatalogPack, CatalogProduct, SiteContact, SiteData, SiteHero } from "@/types/catalog";
import type { MediaItem } from "@/types/media";
import { DEFAULT_CONTACT, DEFAULT_HERO, digitsOnly } from "@/lib/site";

/**
 * Datos del sitio leídos desde Supabase EN EL SERVIDOR (quedan en el HTML,
 * bueno para Google). Todo lo administra el portal: servicios, packs, precios,
 * fotos y textos. Las páginas se regeneran solas (ver `revalidate` en el layout)
 * y al instante cuando el portal avisa a /api/revalidate.
 *
 * Usa solo la clave pública «anon»: la base de datos le entrega únicamente el
 * catálogo publicado (función web_catalog), las fotos y los textos del sitio.
 */

type RawProduct = {
  id: string;
  slug: string;
  name: string;
  billing_type: "unit" | "hour";
  unit_price: number | null;
  hourly_rate: number | null;
  hourly_rate_combo: number | null;
  description: string | null;
  dimensions: string | null;
  age: string | null;
  duration: string | null;
  features: string[] | null;
};
type RawPack = {
  id: string;
  slug: string;
  number: number;
  name: string;
  age: string | null;
  price: number;
  description: string | null;
  duration: string | null;
  features: string[] | null;
  slots: { label: string; quantity: number; product_ids: string[] }[];
};

/** Imagen por defecto de cada servicio mientras no tenga portada subida. */
const PRODUCT_IMAGES: [RegExp, string][] = [
  [/castillo|inflable/, "/images/servicios/castillo-inflable.webp"], // el castillo del portal
  [/piscina|pelota/, "/images/piscinasf.webp"],
  [/resbal/, "/images/resbalinsf.webp"],
  [/pony|poni/, "/images/ponysf.webp"],
  [/cama|elastica|trampolin/, "/images/servicios/cama-elastica.webp"],
  [/hockey/, "/images/servicios/air-hockey.webp"],
  [/goma|\beva\b/, "/images/servicios/goma-eva.webp"],
  [/pasto/, "/images/servicios/pasto-sintetico.webp"],
  [/pinta|carita/, "/images/servicios/pinta-caritas.webp"],
];
// Los packs muestran el mosaico con las imágenes individuales de sus servicios.
const PACK_IMAGES: Record<number, string> = {};

export { isListed } from "@/lib/pricing";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function defaultProductImage(name: string) {
  const n = normalize(name);
  return PRODUCT_IMAGES.find(([re]) => re.test(n))?.[1] ?? "/images/logo-zona-creativa.webp";
}

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY (revisa .env.local o Vercel).");
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/**
 * Lee todo el contenido del sitio (una vez por solicitud gracias a `cache`).
 * Si Supabase falla se lanza el error: al regenerar una página, Next.js
 * mantiene la versión anterior en vez de publicar una página vacía.
 */
export const getSiteData = cache(async (): Promise<SiteData> => {
  const db = supabase();
  const [catalog, media, content] = await Promise.all([
    db.rpc("web_catalog"),
    db
      .from("media_items")
      .select("id, product_id, pack_id, section, kind, storage_path, url, title, description, position, is_cover, featured, width, height, created_at")
      .order("position", { ascending: true })
      .order("created_at", { ascending: true }),
    db.from("site_content").select("key, value"),
  ]);
  const failed = catalog.error ?? media.error ?? content.error;
  if (failed) throw new Error(`No se pudo leer el contenido del sitio: ${failed.message}`);

  const rawProducts = ((catalog.data as { products?: RawProduct[] })?.products ?? []) as RawProduct[];
  const rawPacks = ((catalog.data as { packs?: RawPack[] })?.packs ?? []) as RawPack[];

  const products: CatalogProduct[] = rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name.trim(),
    billingType: p.billing_type === "hour" ? "hour" : "unit",
    unitPrice: p.unit_price,
    hourlyRate: p.hourly_rate,
    hourlyRateCombo: p.hourly_rate_combo,
    description: p.description,
    dimensions: p.dimensions,
    age: p.age,
    duration: p.duration,
    features: p.features ?? [],
    image: defaultProductImage(p.name),
  }));

  const priceOf = (id: string) => products.find((p) => p.id === id)?.unitPrice ?? null;
  const packs: CatalogPack[] = rawPacks.map((k) => {
    const slots = k.slots.map((s) => ({ label: s.label, quantity: s.quantity, productIds: s.product_ids }));
    // Precio normal: en componentes con alternativas se usa la más económica.
    const regularPrice = slots.reduce((sum, s) => {
      const prices = s.productIds.map(priceOf).filter((v): v is number => v != null);
      return sum + s.quantity * (prices.length ? Math.min(...prices) : 0);
    }, 0);
    return {
      id: k.id,
      slug: k.slug,
      number: k.number,
      name: k.name,
      title: `Pack ${k.number} ${k.name}`,
      age: k.age,
      price: k.price,
      regularPrice,
      includes: slots.map((s) => `${s.quantity > 1 ? `${s.quantity} ` : ""}${s.label}`).join(" + "),
      description: k.description,
      duration: k.duration,
      features: k.features ?? [],
      slots,
      image: PACK_IMAGES[k.number] ?? null,
    };
  });

  const values = Object.fromEntries((content.data ?? []).map((r) => [r.key, r.value])) as Record<string, unknown>;
  const hero: SiteHero = { ...DEFAULT_HERO, ...(values.hero as Partial<SiteHero> | undefined) };
  const rawContact = { ...DEFAULT_CONTACT, ...(values.contact as Partial<SiteContact> | undefined) };
  const contact: SiteContact = { ...rawContact, whatsappNumber: digitsOnly(rawContact.whatsapp) || DEFAULT_CONTACT.whatsappNumber };

  return { products, packs, media: (media.data ?? []) as MediaItem[], hero, contact };
});

/** Direcciones antiguas (/productos/1, /packs/2) → nuevas, para no perder visitas. */
export const LEGACY_PRODUCT_SLUGS: Record<string, string> = {
  "1": "castillo-inflable",
  "2": "castillo-inflable",
  "3": "piscina-de-pelotas-160cm",
  "4": "resbalin",
  "5": "pony-saltarin",
};
