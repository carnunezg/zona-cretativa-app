// Paleta de tonos para las tarjetas: cada servicio/pack recibe uno estable
// (según su dirección), así el catálogo se ve variado y alegre.
export type Tone = {
  /** Fondo degradado del área de imagen */
  bg: string;
  /** Círculo decorativo detrás del servicio */
  blob: string;
  /** Color de acento (íconos, borde al pasar el mouse) */
  accent: string;
  ring: string;
};

const TONES: Tone[] = [
  { bg: "from-brand-100 via-brand-50 to-white", blob: "bg-brand-200/70", accent: "text-brand-700", ring: "hover:ring-brand-300" },
  { bg: "from-sun-100 via-sun-50 to-white", blob: "bg-sun-300/60", accent: "text-sun-600", ring: "hover:ring-sun-300" },
  { bg: "from-pink-100 via-pink-50 to-white", blob: "bg-pink-200/70", accent: "text-pink-600", ring: "hover:ring-pink-300" },
  { bg: "from-emerald-100 via-emerald-50 to-white", blob: "bg-emerald-200/70", accent: "text-emerald-600", ring: "hover:ring-emerald-300" },
  { bg: "from-sky-100 via-sky-50 to-white", blob: "bg-sky-200/70", accent: "text-sky-600", ring: "hover:ring-sky-300" },
  { bg: "from-violet-100 via-violet-50 to-white", blob: "bg-violet-200/70", accent: "text-violet-600", ring: "hover:ring-violet-300" },
];

export function toneFor(key: string): Tone {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}
