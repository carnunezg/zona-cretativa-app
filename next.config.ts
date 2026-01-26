import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Genera HTML estático
  trailingSlash: true, // Para Netlify, crea /index.html en cada ruta
};

export default nextConfig;
