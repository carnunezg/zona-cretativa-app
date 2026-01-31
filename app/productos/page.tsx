import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ProductosPage() {
  return (
    <section
      className="
        text-center p-8
        bg-gradient-to-b from-orange-500/95 via-orange-400/85 to-orange-300/90
        pt-32 sm:pt-36 md:pt-40
      "
    >
      <h1 className="mb-6 text-center">
        <span
          className="
            inline-block
            bg-fuchsia-600
            text-white
            text-2xl sm:text-2xl
            font-semibold
            px-5 sm:px-6
            py-1.5 sm:py-2
            rounded-2xl
          "
        >
          Nuestros Productos
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
