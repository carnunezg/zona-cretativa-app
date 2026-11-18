// Ayudas para las fotos y videos que llegan del portal (ver lib/catalog.ts).
import type { MediaItem } from "@/types/media";

export type MediaOwner = { type: "product" | "pack"; id: string };

export function mediaFor(items: MediaItem[], owner: MediaOwner) {
  return items.filter((m) => (owner.type === "product" ? m.product_id === owner.id : m.pack_id === owner.id));
}

export function coverFor(items: MediaItem[], owner: MediaOwner) {
  return mediaFor(items, owner).find((m) => m.is_cover && m.kind === "image");
}

// ---------- Videos por enlace (YouTube / Vimeo) ----------

export type EmbedInfo =
  | { provider: "youtube"; id: string; embedUrl: string; thumbnail: string }
  | { provider: "vimeo"; id: string; embedUrl: string; thumbnail: null };

export function parseVideoUrl(raw: string): EmbedInfo | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, "");

  let ytId: string | null = null;
  if (host === "youtu.be") ytId = url.pathname.slice(1).split("/")[0];
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") ytId = url.searchParams.get("v");
    const m = url.pathname.match(/^\/(shorts|embed|live)\/([\w-]{6,})/);
    if (m) ytId = m[2];
  }
  if (ytId && /^[\w-]{6,}$/.test(ytId)) {
    return {
      provider: "youtube",
      id: ytId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`,
      thumbnail: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`,
    };
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const m = url.pathname.match(/(\d{6,})/);
    if (m) {
      return { provider: "vimeo", id: m[1], embedUrl: `https://player.vimeo.com/video/${m[1]}?autoplay=1`, thumbnail: null };
    }
  }
  return null;
}

/**
 * Imagen de cada componente de un pack (portada subida o imagen por defecto),
 * en el mismo orden que `pack.slots` (null si el servicio no está publicado).
 */
export function packProductImages(
  pack: { slots: { productIds: string[] }[] },
  products: { id: string; image: string }[],
  items: MediaItem[],
): (string | null)[] {
  return pack.slots.map((s) => {
    const p = products.find((x) => s.productIds.includes(x.id));
    return p ? (coverFor(items, { type: "product", id: p.id })?.url ?? p.image) : null;
  });
}
