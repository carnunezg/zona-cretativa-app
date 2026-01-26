import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ProductosPage() {
  return (
    <section className="text-center p-8 w-full min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-white">
      <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
