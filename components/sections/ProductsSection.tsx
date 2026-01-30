import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsSection() {
  return (
    <section id="productos" className="w-full relative pt-16 scroll-mt-28">
      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Productos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* CURVA FINAL */}
      <div className="mt-16 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-[70px] sm:h-[90px]"
        >
          <defs>
            <linearGradient id="gradientHero" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgb(251 191 36)"
                stopOpacity="0.95"
              />
              <stop
                offset="50%"
                stopColor="rgb(252 165 50)"
                stopOpacity="0.85"
              />
              <stop
                offset="100%"
                stopColor="rgb(253 186 116)"
                stopOpacity="0.9"
              />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C240,90 480,0 720,20 960,40 1200,80 1440,40 L1440,0 L0,0 Z"
            fill="url(#gradientHero)"
          />
        </svg>
      </div>
    </section>
  );
}
