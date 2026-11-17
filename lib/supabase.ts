import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Solo se usan la URL del proyecto y la clave pública "anon".
// Esa clave está pensada para el navegador: la seguridad la aplican las
// políticas RLS definidas en supabase/schema.sql. NUNCA pongas aquí la
// clave "service_role".
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const MEDIA_BUCKET = "media";

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return client;
}
