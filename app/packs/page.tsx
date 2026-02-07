import PackCard from "@/components/PackCard";
import { packs } from "@/data/packs";

export default function PackPage() {
  return (
    <section
      className="
        text-center
        bg-gradient-to-b from-blue-800/95 via-blue-400/90 to-blue-100/85
        pt-32 sm:pt-36 md:pt-40
        pb-16
        px-6
      "
    >
      <h1 className="mb-10">
        <span className="inline-block text-white font-bold text-2xl sm:text-3xl">
          Nuestros Packs
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {packs.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </section>
  );
}
