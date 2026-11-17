import type { MetadataRoute } from "next";
import { getSiteData, isListed } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

// Requiere NEXT_PUBLIC_SITE_URL (dirección real) para generar URLs absolutas.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_URL) return [];
  const { products, packs } = await getSiteData();
  const routes = [
    "",
    "/productos",
    "/packs",
    "/reservar",
    "/contacto",
    "/terminos",
    "/condiciones",
    ...products.filter(isListed).map((p) => `/productos/${p.slug}`),
    ...packs.map((p) => `/packs/${p.slug}`),
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
