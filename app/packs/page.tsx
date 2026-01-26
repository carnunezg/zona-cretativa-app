import PackCard from "@/components/PackCard";
import { packs } from "@/data/packs";

export default function PackPage() {
  return (
    <section className="text-center p-8 w-full min-h-screen bg-gradient-to-b from-pink-100 via-blue-100 to-white">
      <h1 className="text-3xl font-bold mb-6">Packs y Promociones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packs.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </section>
  );
}
