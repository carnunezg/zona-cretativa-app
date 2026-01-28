import PackCard from "@/components/PackCard";
import { packs } from "@/data/packs";

export default function PackPage() {
  return (
    <section className="text-center p-8 ">
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
          Packs y Promociones
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {packs.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </section>
  );
}
