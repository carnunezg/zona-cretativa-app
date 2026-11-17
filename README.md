# Zona Creativa · Página web pública

Sitio web de arriendo de juegos infantiles e inflables.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · publicado en **Vercel**.

## De dónde sale el contenido

**Todo se administra desde el portal administrativo** (sección «Sitio web»), conectado al mismo
proyecto de **Supabase**. Este sitio no tiene datos escritos en el código:

| Qué | Se edita en el portal |
| --- | --- |
| Servicios: nombre, precio, medidas, edad, duración, descripción, visible u oculto | Servicios e inventario · Sitio web → Servicios |
| Packs: juegos que incluye, precio | Packs · Sitio web → Packs |
| Fotos y videos (portada, galería, destacados en inicio) | Sitio web → Fotos y videos |
| Textos de portada y datos de contacto | Sitio web → Contenido del sitio |
| Reservas hechas en la web | Reservas (etiqueta «Web · Nueva») |

Las páginas se regeneran solas **cada 60 segundos**, y **al instante** cuando el portal avisa
a `/api/revalidate` al guardar.

## Reservas en línea (`/reservar`)

El cliente elige juegos o packs, la fecha y sus datos. La reserva **se confirma automáticamente**
en la base de datos (función `create_web_booking`), que:

- revisa el stock de esa fecha;
- calcula el precio con packs y tarifas por hora;
- aplica la protección antispam.

El flete y el abono los completa el administrador en el portal.

## Seguridad

- El sitio usa solo la clave **pública** de Supabase (`anon`). La clave `service_role` nunca se usa aquí.
- La base de datos solo entrega a los visitantes el catálogo publicado, las fotos y los textos del sitio.
  Las reservas, los clientes y los montos no son visibles.

## Variables de entorno

Ver `.env.example`. En local van en `.env.local` (git lo ignora); en Vercel, en
*Project → Settings → Environment Variables*:

- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`: las del mismo proyecto que el portal.
- `REVALIDATE_SECRET`: la misma clave que el portal tiene como `WEB_REVALIDATE_SECRET`.
- `NEXT_PUBLIC_SITE_URL`: dirección pública del sitio (opcional; en Vercel se usa la de producción).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

Las direcciones antiguas (`/productos/1`, `/packs/2`) redirigen a las nuevas (`/productos/castillo-inflable`).
