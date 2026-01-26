import PackCard from "@/components/PackCard";
import { packs } from "@/data/packs";

export default function PackPage() {
  return (
    <section className="p-8 bg-green-50">
      <h1 className="text-3xl font-bold mb-6">Combos y Promociones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packs.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </section>
  );
}
