import Reveal from "@/components/motion/Reveal";

/** Encabezado de sección: etiqueta, título y bajada, centrados y animados. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-10 max-w-2xl text-center">
      <span className={light ? "zc-eyebrow bg-white/15 text-white ring-white/25" : "zc-eyebrow"}>{eyebrow}</span>
      <h2 className={`mt-3 text-3xl leading-tight font-extrabold sm:text-4xl md:text-[2.75rem] ${light ? "text-white" : "text-brand-900"}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-3 text-base sm:text-lg ${light ? "text-white/85" : "text-slate-600"}`}>{subtitle}</p>}
    </Reveal>
  );
}
