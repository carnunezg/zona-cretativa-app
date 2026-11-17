/**
 * Foto o video administrado desde el portal (tabla media_items de Supabase).
 *  image -> fotografía subida al Storage
 *  video -> archivo de video subido al Storage
 *  embed -> enlace a YouTube o Vimeo
 * Pertenece a un servicio (product_id), a un pack (pack_id) o a una sección del sitio.
 */
export type MediaKind = "image" | "video" | "embed";

export interface MediaItem {
  id: string;
  product_id: string | null;
  pack_id: string | null;
  section: "hero" | "gallery" | "about" | null;
  kind: MediaKind;
  storage_path: string | null;
  url: string;
  title: string | null;
  description: string | null;
  position: number;
  is_cover: boolean;
  featured: boolean;
  width: number | null;
  height: number | null;
  created_at: string;
}
