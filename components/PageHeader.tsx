import type { IconType } from "react-icons";

/**
 * Encabezado de las páginas interiores (mismo estilo que la portada): fondo
 * azul con luces y burbujas, etiqueta, título, bajada, datos destacados y una
 * ola que da paso al contenido.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  highlights = [],
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  highlights?: { icon: IconType; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-brand-950 via-brand-800 to-brand-600 px-4 pt-32 pb-28 text-center sm:px-6 sm:pt-36 sm:pb-32">
      <span aria-hidden className="animate-float-slow pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-sun-400/25 blur-3xl" />
      <span aria-hidden className="animate-float pointer-events-none absolute -bottom-32 -left-28 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
      <span aria-hidden className="animate-float-slow absolute top-[30%] left-[8%] hidden h-14 w-14 rounded-full bg-white/10 ring-1 ring-white/20 md:block" />
      <span aria-hidden className="animate-float absolute top-[22%] right-[10%] hidden h-9 w-9 rounded-full bg-sun-300/40 md:block" style={{ animationDelay: "1s" }} />
      <span aria-hidden className="animate-float-slow absolute right-[22%] bottom-[30%] hidden h-6 w-6 rounded-full bg-white/25 md:block" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-3xl">
        <span className="animate-pop inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-sun-200 uppercase ring-1 ring-white/25 backdrop-blur-md">
          {eyebrow}
        </span>
        <h1 className="animate-pop mt-4 text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "80ms" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="animate-pop mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg" style={{ animationDelay: "160ms" }}>
            {subtitle}
          </p>
        )}
        {highlights.length > 0 && (
          <ul className="animate-pop mt-7 flex flex-wrap justify-center gap-2.5" style={{ animationDelay: "240ms" }}>
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md"
              >
                <Icon className="text-sun-300" /> {label}
              </li>
            ))}
          </ul>
        )}
        {children && (
          <div className="animate-pop mt-7" style={{ animationDelay: "300ms" }}>
            {children}
          </div>
        )}
      </div>

      <div className="absolute -bottom-px left-0 w-full leading-none" aria-hidden>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-[50px] w-full sm:h-[80px]">
          <path d="M0,50 C300,100 600,0 900,40 C1150,72 1300,90 1440,60 L1440,100 L0,100 Z" fill="#f6f8fd" />
        </svg>
      </div>
    </section>
  );
}

/** Contenido de una página interior, sobre el fondo claro. */
export function PageBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`relative px-4 pt-8 pb-16 sm:px-6 sm:pb-20 ${className}`}>{children}</section>;
}

/** Fondo azul de página completa (páginas simples como «no encontrada»). */
export function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative flex-1 overflow-hidden bg-linear-to-b from-brand-900 via-brand-600 to-[#f6f8fd] to-[85%] px-4 pt-28 pb-20 sm:px-6 sm:pt-36 md:pt-40 ${className}`}
    >
      <span aria-hidden className="animate-float-slow pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sun-400/20 blur-3xl" />
      <span aria-hidden className="animate-float pointer-events-none absolute top-40 -left-28 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl" />
      <div className="relative">{children}</div>
    </section>
  );
}
