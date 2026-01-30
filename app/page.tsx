import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import PacksSection from "@/components/sections/PacksSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <>
      {/* HERO – NARANJA FUERTE */}
      <HeroSection />

      {/* PRODUCTOS – NARANJA SUAVE */}
      <section
        id="productos"
        className="
          pt-24
          scroll-mt-24
          bg-orange-200
        "
      >
        <AnimateOnScroll>
          <ProductsSection />
        </AnimateOnScroll>
      </section>

      {/* PACKS – NARANJA MÁS INTENSO */}
      <section id="packs" className="pt-24 scroll-mt-24 bg-orange-300">
        <AnimateOnScroll>
          <PacksSection />
        </AnimateOnScroll>
      </section>

      {/* BOTÓN FLOTANTE */}
      <ScrollToTopButton />
    </>
  );
}
