/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // si quieres seguir con export estático
  images: {
    unoptimized: true, // DESACTIVA la optimización
  },
};

export default nextConfig;
