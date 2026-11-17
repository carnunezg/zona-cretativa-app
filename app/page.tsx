import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProductsSection from "@/components/sections/ProductsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import GallerySection from "@/components/sections/GallerySection";
import PacksSection from "@/components/sections/PacksSection";
import CtaBand from "@/components/sections/CtaBand";
import ContactSection from "@/components/sections/ContactSection";
import Reveal from "@/components/motion/Reveal";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { getSiteData, isListed } from "@/lib/catalog";

export default async function Home() {
  const { products, packs, media, hero, contact } = await getSiteData();
  return (
    <>
      <HeroSection hero={hero} />
      <WhyUsSection />
      <ProductsSection products={products.filter(isListed)} media={media} />
      <HowItWorksSection />
      {/* Solo aparece cuando hay fotos en la galería o destacadas desde el portal */}
      <GallerySection media={media} products={products} packs={packs} />
      <PacksSection packs={packs} products={products} media={media} />
      <CtaBand whatsappNumber={contact.whatsappNumber} />

      <section id="contacto" className="scroll-mt-28 px-4 pt-6 pb-16 sm:pb-24">
        <Reveal>
          <ContactSection contact={contact} />
        </Reveal>
      </section>

      <ScrollToTopButton />
    </>
  );
}
