import { packs } from "@/data/packs";
import PackCard from "@/components/PackCard";

export default function PacksSection() {
  return (
    <section
      id="packs"
      className="
    w-full
    pt-8
    pb-16
    -mt-25  /* sube la sección sobre la curva anterior */
    scroll-mt-28

  "
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Packs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packs.slice(0, 3).map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </section>
  );
}
