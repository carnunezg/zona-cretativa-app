import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ya no es un sitio 100 % estático: el contenido viene del portal
  // administrativo (Supabase) y las páginas se regeneran solas.
  images: {
    // Las fotos subidas desde el portal ya llegan optimizadas (WebP, máx. 1920 px).
    unoptimized: true,
  },
};

export default nextConfig;
