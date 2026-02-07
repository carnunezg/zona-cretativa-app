import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import PacksSection from "@/components/sections/PacksSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="productos">
        <AnimateOnScroll>
          <ProductsSection />
        </AnimateOnScroll>
      </section>

      <section id="packs">
        <AnimateOnScroll>
          <PacksSection />
        </AnimateOnScroll>
      </section>

      <ScrollToTopButton />
    </>
  );
}
