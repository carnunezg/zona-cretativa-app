import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "node:crypto";

/**
 * El portal administrativo llama aquí al guardar cambios del sitio web, para
 * que la página se actualice al instante (sin esperar los 60 segundos).
 * Protegido con la clave REVALIDATE_SECRET (encabezado «x-revalidate-secret»).
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  const ok =
    !!secret && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  if (!ok) return Response.json({ ok: false }, { status: 401 });

  revalidatePath("/", "layout");
  return Response.json({ ok: true, revalidated: new Date().toISOString() });
}
