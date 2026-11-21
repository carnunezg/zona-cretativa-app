import { timingSafeEqual } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

/**
 * Mantiene activo el proyecto de Supabase (el plan gratuito lo pausa tras
 * ~7 días sin actividad). Vercel Cron llama aquí una vez al día (ver
 * vercel.json) y se hace UNA consulta de solo lectura con la clave pública.
 * No modifica nada en la base.
 *
 * Protegida con CRON_SECRET: Vercel envía «Authorization: Bearer <CRON_SECRET>».
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const ok = !!secret && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return Response.json({ ok: false }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return Response.json({ ok: false, error: "Faltan las variables de Supabase" }, { status: 500 });

  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const started = Date.now();
  const { error } = await db.from("site_content").select("key").limit(1);
  if (error) {
    // Queda registrado en Vercel → Logs para revisarlo.
    console.error("keep-alive: Supabase respondió con error:", error.message);
    return Response.json({ ok: false, error: error.message }, { status: 502 });
  }
  return Response.json({ ok: true, at: new Date().toISOString(), ms: Date.now() - started });
}
