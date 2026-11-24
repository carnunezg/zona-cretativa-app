"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCalendarDays,
  FaCheck,
  FaCircleCheck,
  FaCircleInfo,
  FaClock,
  FaCopy,
  FaGift,
  FaHourglassHalf,
  FaHouse,
  FaLocationDot,
  FaMapPin,
  FaMinus,
  FaPaperPlane,
  FaPenToSquare,
  FaPhone,
  FaPlus,
  FaReceipt,
  FaTrashCan,
  FaTriangleExclamation,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { CatalogPack, CatalogProduct, SiteContact } from "@/types/catalog";
import type { MediaItem } from "@/types/media";
import { coverFor, packProductImages } from "@/lib/media";
import PackIncludes from "@/components/PackIncludes";
import { clp, estimateTotal, isListed, packSelection, productPriceLabel, type Selection } from "@/lib/pricing";
import { getSupabase } from "@/lib/supabase";
import { COMMITMENT_AMOUNT, whatsappLink } from "@/lib/site";
import { toneFor } from "@/lib/tones";

const COMMUNES = [
  "Concepción", "Talcahuano", "San Pedro de la Paz", "Hualpén", "Chiguayante",
  "Penco", "Tomé", "Coronel", "Lota", "Hualqui",
];

/** Fecha u horario bloqueado (de la función pública web_blocked_dates; sin motivo). */
type Block = { start_date: string; end_date: string; start_time: string | null; end_time: string | null };

/** Horarios cada 30 minutos (08:00 a 23:30). */
const TIMES = Array.from({ length: 32 }, (_, i) => {
  const m = 8 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
});

/** Duración máxima de los servicios de valor fijo (Pinta Caritas se cobra por hora y no tiene tope). */
const MAX_HOURS = 4;

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function durationLabel(start: string, end: string) {
  const mins = toMinutes(end) - toMinutes(start);
  if (mins <= 0) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h ? `${h} ${h === 1 ? "hora" : "horas"}` : ""}${h && m ? " y " : ""}${m ? `${m} min` : ""}`;
}

function chileDate(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(d);
}

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const text = new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
  return text.charAt(0).toUpperCase() + text.slice(1);
}

type Done = { code: string; total: number; date: string };

/** Encabezado de cada paso: número, ícono, título y bajada. */
function StepHeader({ n, done, icon: Icon, title, subtitle }: { n: number; done: boolean; icon: IconType; title: string; subtitle: string }) {
  return (
    <div className="mb-5 flex items-start gap-4">
      <span
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl text-white shadow-lg transition-colors duration-500 ${
          done ? "bg-linear-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/30" : "bg-linear-to-br from-brand-600 to-brand-800 shadow-brand-700/30"
        }`}
      >
        {done ? <FaCheck /> : <Icon />}
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sun-400 text-[11px] font-extrabold text-brand-900 ring-2 ring-white">
          {n}
        </span>
      </span>
      <div className="min-w-0">
        <h2 className="text-xl leading-tight font-extrabold text-brand-900 sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

/** Copia un dato al portapapeles y confirma con «Copiado». */
function CopyButton({ value, label, wide = false }: { value: string; label: string; wide?: boolean }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copiar ${label}`}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full text-xs font-bold transition ${
        copied ? "bg-emerald-500 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
      } ${wide ? "px-4 py-2" : "h-9 w-9 sm:h-8 sm:w-auto sm:px-3"}`}
    >
      {copied ? <FaCheck /> : <FaCopy />}
      <span className={wide ? "" : "hidden sm:inline"}>{copied ? "Copiado" : wide ? `Copiar ${label}` : "Copiar"}</span>
    </button>
  );
}

/** Campo de texto con ícono a la izquierda. */
function Field({
  label,
  icon: Icon,
  optional,
  className = "",
  children,
}: {
  label: string;
  icon?: IconType;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-bold text-brand-900">
        {label} {optional && <span className="font-medium text-slate-400">(opcional)</span>}
      </span>
      <span className="relative mt-1.5 block">
        {Icon && <Icon className="pointer-events-none absolute top-3.5 left-3.5 text-brand-400" />}
        {children}
      </span>
    </label>
  );
}

export default function BookingForm({
  products,
  packs,
  media,
  contact,
}: {
  products: CatalogProduct[];
  packs: CatalogPack[];
  media: MediaItem[];
  contact: SiteContact;
}) {
  const params = useSearchParams();
  const reduce = useReducedMotion();

  // Preselección desde «Reservar» de una tarjeta (?servicio=… o ?pack=…).
  const [selection, setSelection] = useState<Selection>(() => {
    const pack = packs.find((p) => p.slug === params.get("pack"));
    if (pack) return packSelection(pack, products) ?? {};
    const product = products.find((p) => p.slug === params.get("servicio"));
    return product ? { [product.id]: product.billingType === "hour" ? 2 : 1 } : {};
  });
  const [date, setDate] = useState("");
  // Fechas bloqueadas por Zona Creativa (la base también las rechaza al reservar).
  const [blocked, setBlocked] = useState<Block[]>([]);
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    let active = true;
    supabase.rpc("web_blocked_dates").then(({ data, error }) => {
      if (active && !error && Array.isArray(data)) setBlocked(data as Block[]);
    });
    return () => {
      active = false;
    };
  }, []);
  const [start, setStart] = useState("15:00");
  const [end, setEnd] = useState("19:00");
  const [form, setForm] = useState({ name: "", phone: "", address: "", commune: "", reference: "", notes: "", website: "" });
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Al enviar, llevar la vista directo al resultado (no al comienzo de la página).
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), 60);
    return () => window.clearTimeout(t);
  }, [done, reduce]);

  const estimate = useMemo(() => estimateTotal(products, packs, selection), [products, packs, selection]);
  const chosen = products.filter((p) => (selection[p.id] ?? 0) > 0);
  const listed = products.filter(isListed);
  const extras = products.filter((p) => !isListed(p));
  const minDate = chileDate(1);
  const maxDate = chileDate(365);
  const duration = durationLabel(start, end);
  // El tope de 4 horas aplica si hay algún servicio de valor fijo (o aún no se elige ninguno).
  const limited = chosen.length === 0 || chosen.some((p) => p.billingType !== "hour");
  const overLimit = limited && toMinutes(end) - toMinutes(start) > MAX_HOURS * 60;

  // Al cambiar el inicio, mantener el término dentro del rango permitido.
  function changeStart(value: string) {
    setStart(value);
    const span = toMinutes(end) - toMinutes(value);
    if (span <= 0 || (limited && span > MAX_HOURS * 60)) {
      const target = toMinutes(value) + (limited ? MAX_HOURS * 60 : 4 * 60);
      setEnd([...TIMES].reverse().find((t) => toMinutes(t) <= target && toMinutes(t) > toMinutes(value)) ?? TIMES[TIMES.length - 1]);
    }
  }

  // Avance del formulario (para los checks y la barra de progreso).
  const step1 = chosen.length > 0;
  // Bloqueos del día elegido: de día completo, o solo un horario que se cruza con el evento.
  const dayBlocks = date ? blocked.filter((b) => date >= b.start_date && date <= b.end_date) : [];
  const fullDayBlocked = dayBlocks.some((b) => !b.start_time);
  const hourClash = fullDayBlocked
    ? null
    : (dayBlocks.find((b) => b.start_time && start < b.end_time!.slice(0, 5) && end > b.start_time.slice(0, 5)) ?? null);
  const dateProblem = fullDayBlocked
    ? `Lo sentimos, el ${longDate(date).toLowerCase()} no tenemos disponibilidad. Elige otra fecha o escríbenos por WhatsApp.`
    : hourClash
      ? `Ese día no tenemos disponibilidad entre las ${hourClash.start_time!.slice(0, 5)} y las ${hourClash.end_time!.slice(0, 5)}. Elige otro horario.`
      : "";
  const step2 = !!date && !!duration && !overLimit && !dateProblem;
  const step3 = form.name.trim().length >= 2 && form.phone.trim().length >= 6 && form.address.trim().length >= 5 && form.commune.trim().length >= 2;
  const progress = [step1, step2, step3, accepted].filter(Boolean).length;

  const setQty = (id: string, qty: number) =>
    setSelection((s) => {
      const next = { ...s };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  function addPack(pack: CatalogPack) {
    const add = packSelection(pack, products);
    if (!add) return;
    setSelection((s) => {
      const next = { ...s };
      for (const [id, q] of Object.entries(add)) next[id] = (next[id] ?? 0) + q;
      return next;
    });
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!chosen.length) return setError("Elige al menos un servicio.");
    if (!date) return setError("Elige la fecha del evento.");
    if (dateProblem) return setError(dateProblem);
    if (end <= start) return setError("La hora de término debe ser posterior a la de inicio.");
    if (overLimit) return setError(`Los servicios tienen una duración máxima de ${MAX_HOURS} horas. Ajusta el horario.`);
    if (!accepted) return setError("Debes aceptar los términos y condiciones.");

    const supabase = getSupabase();
    if (!supabase) return setError("Las reservas en línea no están disponibles en este momento. Escríbenos por WhatsApp.");

    setBusy(true);
    const { data, error: rpcError } = await supabase.rpc("create_web_booking", {
      p_booking: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        commune: form.commune,
        reference: form.reference,
        notes: form.notes,
        website: form.website, // campo trampa antibots (oculto)
        event_date: date,
        start_time: start,
        end_time: end,
      },
      p_items: chosen.map((p) => ({ product_id: p.id, quantity: selection[p.id] })),
    });
    setBusy(false);
    if (rpcError) {
      setError(rpcError.message || "No se pudo registrar la reserva. Inténtalo nuevamente o escríbenos por WhatsApp.");
      return;
    }
    const r = data as { code: string; total: number; event_date: string };
    setDone({ code: r.code, total: r.total, date: r.event_date });
  }

  /* ───────────── Solicitud recibida: la confirmamos por WhatsApp ───────────── */
  if (done) {
    const serviceList = chosen
      .map((p) => {
        const q = selection[p.id] ?? 0;
        return p.billingType === "hour" ? `${p.name} (${q} h)` : `${q} ${p.name}`;
      })
      .join(", ");
    const message = [
      "Hola Zona Creativa 👋 Acabo de enviar una solicitud de reserva desde la página web.",
      "",
      `*Código:* ${done.code}`,
      `*Nombre:* ${form.name.trim()}`,
      `*Fecha:* ${longDate(done.date)}, ${start} a ${end} hrs`,
      `*Servicios:* ${serviceList}`,
      `*Dirección:* ${form.address.trim()}, ${form.commune.trim()}`,
    ].join("\n");
    const nextSteps: { icon: IconType; title: string; text: React.ReactNode }[] = [
      { icon: FaCircleCheck, title: "Solicitud recibida", text: "Tus datos ya llegaron a nuestro equipo." },
      {
        icon: FaWhatsapp,
        title: "Te escribimos por WhatsApp",
        text: (
          <>
            Revisamos la disponibilidad para tu fecha y te contactamos al{" "}
            <b className="whitespace-nowrap text-brand-900">{form.phone.trim()}</b>.
          </>
        ),
      },
      {
        icon: FaCalendarCheck,
        title: "Confirmamos tu reserva",
        text: "Coordinamos los detalles contigo. Tu reserva queda confirmada cuando te lo indiquemos por WhatsApp.",
      },
    ];

    return (
      <motion.div
        ref={resultRef}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl scroll-mt-24 overflow-hidden sm:scroll-mt-28 rounded-[2rem] bg-white shadow-lift ring-1 ring-slate-200/70"
      >
        {/* Encabezado */}
        <div className="relative overflow-hidden bg-linear-to-br from-brand-500 via-brand-600 to-brand-800 px-6 pt-10 pb-16 text-center text-white">
          <span aria-hidden className="animate-float absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10" />
          <span aria-hidden className="animate-float-slow absolute -right-8 -bottom-12 h-44 w-44 rounded-full bg-sun-300/20" />
          <span className="animate-pop relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-brand-600 shadow-xl">
            <FaPaperPlane />
          </span>
          <h2 className="relative mt-5 text-3xl font-extrabold sm:text-4xl">¡Recibimos tu solicitud!</h2>
          <p className="relative mx-auto mt-2 max-w-md text-white/90">
            Gracias, {form.name.trim().split(/\s+/)[0]}. Muy pronto te contactaremos para confirmar tu reserva 🎉
          </p>
        </div>

        <div className="-mt-9 space-y-6 px-5 pb-8 sm:px-10">
          {/* Código y resumen */}
          <div className="relative rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-200/70">
            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">Código de tu solicitud</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="font-mono text-xl font-extrabold whitespace-nowrap text-brand-800 min-[400px]:text-2xl sm:text-3xl sm:tracking-wider">{done.code}</p>
                <CopyButton value={done.code} label="código" />
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sun-100 px-3 py-1 text-xs font-bold text-sun-700 ring-1 ring-sun-200">
                <FaHourglassHalf /> Pendiente de confirmación
              </span>
            </div>
            <dl className="mt-4 grid gap-2 border-t border-dashed border-slate-200 pt-4 text-sm sm:grid-cols-3">
              <div className="flex items-center gap-2 sm:flex-col sm:text-center">
                <FaCalendarDays className="text-brand-500" />
                <dd className="font-semibold text-slate-700">{longDate(done.date)}</dd>
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:text-center">
                <FaClock className="text-sun-500" />
                <dd className="font-semibold text-slate-700">
                  {start} a {end} hrs
                </dd>
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:text-center">
                <FaReceipt className="text-emerald-500" />
                <dd className="font-semibold text-slate-700">Total {clp(done.total)}</dd>
              </div>
            </dl>
          </div>

          {/* ¿Qué sigue? */}
          <section className="rounded-2xl bg-brand-50/60 p-5 ring-1 ring-brand-100 sm:p-6">
            <h3 className="text-lg font-extrabold text-brand-900">¿Qué sigue?</h3>
            <ol className="mt-4 space-y-4">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg shadow-sm ${
                      i === 0 ? "bg-emerald-500 text-white" : i === 1 ? "bg-[#25D366] text-white" : "bg-white text-brand-600 ring-1 ring-brand-200"
                    }`}
                  >
                    <s.icon />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-brand-900">
                      {i + 1}. {s.title}
                    </p>
                    <p className="text-sm leading-6 text-slate-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <p className="flex items-start gap-2 rounded-xl bg-sun-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-sun-200">
            <FaCircleInfo className="mt-0.5 shrink-0 text-sun-500" />
            <span>
              <b className="text-brand-900">Aún no necesitas pagar nada.</b> Cuando confirmemos tu fecha te enviaremos por WhatsApp los
              datos para el compromiso de {clp(COMMITMENT_AMOUNT)}; el resto se paga el día del evento.
            </span>
          </p>

          <a
            href={whatsappLink(message, contact.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="zc-btn zc-btn-green zc-shine w-full py-4 text-base"
          >
            <FaWhatsapp className="text-xl" /> ¿Tienes dudas? Escríbenos por WhatsApp
          </a>

          <Link href="/" className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800">
            <FaHouse /> Volver al inicio
          </Link>
        </div>
      </motion.div>
    );
  }

  const input =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pr-3 pl-10 text-sm text-ink transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none";
  const card = "rounded-[1.75rem] bg-white p-5 shadow-card ring-1 ring-slate-200/70 sm:p-7";

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_370px] [&>*]:min-w-0">
      <div className="space-y-6">
        {/* Progreso */}
        <div className="rounded-2xl bg-white px-5 py-4 shadow-card ring-1 ring-slate-200/70">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-brand-900">Tu avance</span>
            <span className="font-semibold text-slate-500">{progress} de 4 pasos</span>
          </div>
          <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-brand-500 via-brand-600 to-emerald-500"
              initial={false}
              animate={{ width: `${Math.max(6, (progress / 4) * 100)}%` }}
              transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* 1. Servicios */}
        <section className={card}>
          <StepHeader n={1} done={step1} icon={FaGift} title="Elige tus servicios" subtitle="Agrega un pack completo o arma tu combinación. Si coincide con un pack, el precio especial se aplica solo." />

          {packs.length > 0 && (
            <div className="mb-6">
              <p className="mb-2.5 flex items-center gap-2 text-sm font-bold text-brand-900">
                <FaGift className="text-pink-600" /> Agrega un pack con un clic
              </p>
              <ul className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pt-1 pb-3 [scrollbar-width:thin]">
                {packs.map((p) => {
                  const pct = p.regularPrice > 0 ? Math.round(((p.regularPrice - p.price) / p.regularPrice) * 100) : 0;
                  return (
                    <li key={p.id} className="snap-start">
                      <button
                        type="button"
                        onClick={() => addPack(p)}
                        className="group relative flex h-full w-60 flex-col rounded-2xl bg-linear-to-br from-brand-50 to-white p-3.5 text-left ring-1 ring-brand-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card hover:ring-2 hover:ring-brand-300"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-brand-800 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-white uppercase">Pack {p.number}</span>
                          {pct > 0 && <span className="rounded-full bg-pink-600 px-2 py-0.5 text-[10px] font-extrabold text-white">-{pct}%</span>}
                        </span>
                        <span className="mt-2 block text-sm leading-tight font-extrabold text-brand-900">{p.name}</span>
                        <span className="sr-only">Incluye: {p.includes}</span>
                        <PackIncludes slots={p.slots} images={packProductImages(p, products, media)} variant="tiles" className="mt-2.5" />
                        <span className="mt-auto flex items-end justify-between gap-2 pt-3">
                          <span className="text-lg font-extrabold text-brand-800">{clp(p.price)}</span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90">
                            <FaPlus className="text-xs" />
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <p className="mb-2.5 text-sm font-bold text-brand-900">O elige servicio por servicio</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {listed.map((p) => {
              const qty = selection[p.id] ?? 0;
              const hourly = p.billingType === "hour";
              const cover = coverFor(media, { type: "product", id: p.id });
              const tone = toneFor(p.slug);
              const selected = qty > 0;
              return (
                <li
                  key={p.id}
                  className={`relative flex items-center gap-3 rounded-2xl p-2.5 transition-all duration-300 ${
                    selected ? "bg-brand-50/70 ring-2 ring-brand-500 shadow-card" : "bg-white ring-1 ring-slate-200 hover:ring-slate-300"
                  }`}
                >
                  <span className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16 bg-linear-to-br ${tone.bg}`}>
                    <Image src={cover?.url ?? p.image} alt="" fill sizes="64px" className={cover ? "object-cover" : "object-contain p-1.5"} />
                    <AnimatePresence>
                      {selected && (
                        <motion.span
                          initial={reduce ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] text-white shadow"
                        >
                          <FaCheck />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm leading-tight font-bold text-ink">{p.name}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brand-600">
                      {hourly && <FaHourglassHalf className="text-violet-500" />}
                      {productPriceLabel(p)}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-white p-1 ring-1 ring-slate-200">
                    <button
                      type="button"
                      onClick={() => setQty(p.id, qty - 1)}
                      disabled={qty === 0}
                      aria-label={`Quitar ${p.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 text-brand-800 transition hover:bg-slate-100 disabled:opacity-25"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="w-7 text-center text-sm font-extrabold text-ink tabular-nums sm:w-9">
                      {qty}
                      {hourly && qty > 0 ? "h" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(p.id, Math.min(hourly ? 8 : 20, qty + 1))}
                      aria-label={`Agregar ${p.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 bg-brand-600 text-white shadow-sm transition hover:scale-105 hover:bg-brand-700"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>

          {extras.length > 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-4">
              <p className="text-sm font-bold text-emerald-800">Adicionales sin costo</p>
              <p className="mt-0.5 text-xs text-emerald-700/80">Agrégalos solo si los necesitas para tu espacio.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {extras.map((p) => {
                  const on = (selection[p.id] ?? 0) > 0;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setQty(p.id, on ? 0 : 1)}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all ${
                        on ? "bg-emerald-600 text-white shadow-md" : "bg-white text-emerald-800 ring-1 ring-emerald-200 hover:ring-emerald-400"
                      }`}
                    >
                      {on ? <FaCheck /> : <FaPlus className="text-xs" />} {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* 2. Fecha y horario */}
        <section className={card}>
          <StepHeader n={2} done={step2} icon={FaCalendarDays} title="Fecha y horario" subtitle="¿Cuándo es la celebración? Elige el día y el horario de uso de los servicios." />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Fecha" icon={FaCalendarDays}>
              <input type="date" required min={minDate} max={maxDate} value={date} onChange={(e) => setDate(e.target.value)} className={input} />
            </Field>
            <Field label="Inicio" icon={FaClock}>
              <select value={start} onChange={(e) => changeStart(e.target.value)} className={input}>
                {TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Término" icon={FaClock}>
              <select value={end} onChange={(e) => setEnd(e.target.value)} className={input}>
                {TIMES.filter((t) => toMinutes(t) > toMinutes(start) || t === end).map((t) => {
                  const tooLong = limited && toMinutes(t) - toMinutes(start) > MAX_HOURS * 60;
                  return (
                    <option key={t} value={t} disabled={tooLong && t !== end}>
                      {t}
                      {tooLong ? ` (máx. ${MAX_HOURS} h)` : ""}
                    </option>
                  );
                })}
              </select>
            </Field>
          </div>
          {dateProblem && (
            <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              <FaTriangleExclamation className="mt-0.5 shrink-0" /> {dateProblem}
            </p>
          )}
          {!dateProblem && dayBlocks.length > 0 && (
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-sun-200 bg-sun-50 p-3 text-sm text-slate-700">
              <FaClock className="mt-0.5 shrink-0 text-sun-500" />
              <span>
                Ese día no atendemos{" "}
                {dayBlocks.map((b, i) => (
                  <b key={i}>
                    {i > 0 ? " ni " : ""}entre las {b.start_time!.slice(0, 5)} y las {b.end_time!.slice(0, 5)}
                  </b>
                ))}
                . Tu horario sí está disponible.
              </span>
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {date && (
              <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ${fullDayBlocked ? "bg-red-50 text-red-700 line-through" : "bg-brand-50 text-brand-800"}`}>
                <FaCalendarCheck className="text-brand-500" /> {longDate(date)}
              </span>
            )}
            {duration && overLimit ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3.5 py-1.5 text-sm font-semibold text-red-600">
                <FaTriangleExclamation /> Máximo {MAX_HOURS} horas de servicio
              </span>
            ) : duration ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-sun-50 px-3.5 py-1.5 text-sm font-semibold text-sun-600">
                <FaHourglassHalf /> {duration} de diversión
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3.5 py-1.5 text-sm font-semibold text-red-600">
                <FaTriangleExclamation /> El término debe ser después del inicio
              </span>
            )}
          </div>
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-brand-50/70 px-3.5 py-2.5 text-xs leading-5 text-slate-600 ring-1 ring-brand-100">
            <FaClock className="mt-0.5 shrink-0 text-brand-500" />
            {limited ? (
              <span>
                Los servicios tienen una duración de <b className="text-brand-900">hasta {MAX_HOURS} horas</b>.
                {chosen.some((p) => p.billingType === "hour") && " Pinta Caritas se cobra por hora: elige las horas en el paso 1."}
              </span>
            ) : (
              <span>Pinta Caritas se cobra por hora: elige las horas que necesitas en el paso 1.</span>
            )}
          </p>
          <p className="mt-3 text-xs text-slate-500">Las reservas en línea se hacen con al menos un día de anticipación. Para hoy, escríbenos por WhatsApp.</p>
        </section>

        {/* 3. Datos */}
        <section className={card}>
          <StepHeader n={3} done={step3} icon={FaUser} title="Tus datos" subtitle="Los usamos solo para coordinar la entrega e instalación." />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre completo" icon={FaUser}>
              <input required minLength={2} maxLength={80} autoComplete="name" placeholder="Tu nombre" {...field("name")} className={input} />
            </Field>
            <Field label="Teléfono / WhatsApp" icon={FaPhone}>
              <input required type="tel" inputMode="tel" maxLength={30} autoComplete="tel" placeholder="+56 9 1234 5678" {...field("phone")} className={input} />
            </Field>
            <Field label="Dirección del evento" icon={FaLocationDot} className="sm:col-span-2">
              <input required minLength={5} maxLength={200} autoComplete="street-address" placeholder="Calle, número, depto." {...field("address")} className={input} />
            </Field>
            <Field label="Comuna" icon={FaMapPin}>
              <input required minLength={2} maxLength={80} list="zc-comunas" placeholder="Ej. Concepción" {...field("commune")} className={input} />
              <datalist id="zc-comunas">
                {COMMUNES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Referencia" icon={FaHouse} optional>
              <input maxLength={200} placeholder="Ej. casa esquina, portón verde" {...field("reference")} className={input} />
            </Field>
            <Field label="Comentario" icon={FaPenToSquare} optional className="sm:col-span-2">
              <textarea rows={3} maxLength={500} placeholder="Cuéntanos algo más de tu evento" {...field("notes")} className={`${input} resize-y`} />
            </Field>
            {/* Campo trampa: invisible para las personas; los robots lo completan. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                No completar
                <input tabIndex={-1} autoComplete="off" {...field("website")} />
              </label>
            </div>
          </div>
        </section>
      </div>

      {/* Resumen tipo boleta */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-slate-200/70 lg:flex lg:max-h-[calc(100dvh-8.5rem)] lg:flex-col">
          <div className="relative shrink-0 overflow-hidden bg-linear-to-br from-brand-800 via-brand-700 to-brand-600 px-5 py-5 text-white [@media(max-height:760px)]:py-3.5">
            <span aria-hidden className="absolute -top-8 -right-6 h-28 w-28 rounded-full bg-sun-300/25 blur-xl" />
            <p className="relative flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-sun-200 uppercase">
              <FaReceipt /> Resumen
            </p>
            <h2 className="relative mt-1 text-2xl font-extrabold [@media(max-height:760px)]:text-xl">Tu reserva</h2>
            {(date || duration) && (
              <p className="relative mt-2 text-sm text-white/85">
                <span>{date ? longDate(date) : "Fecha por elegir"}</span> · {start} a {end} hrs
              </p>
            )}
          </div>

          <div className="min-h-0 flex-1 p-5 lg:overflow-y-auto lg:[scrollbar-width:thin]">
            {chosen.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <FaGift className="mx-auto text-3xl text-slate-300" />
                <p className="mt-2 text-sm font-semibold text-slate-500">Aún no eliges servicios</p>
                <p className="mt-0.5 text-xs text-slate-400">Agrega un pack o un servicio para comenzar.</p>
              </div>
            ) : (
              <ul className="space-y-2.5">
                <AnimatePresence initial={false}>
                  {chosen.map((p) => {
                    const qty = selection[p.id];
                    const hourly = p.billingType === "hour";
                    const line = !hourly && p.unitPrice != null ? p.unitPrice * qty : null;
                    const cover = coverFor(media, { type: "product", id: p.id });
                    return (
                      <motion.li
                        key={p.id}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
                        className="group flex items-center gap-3"
                      >
                        <span className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-linear-to-br ${toneFor(p.slug).bg}`}>
                          <Image src={cover?.url ?? p.image} alt="" fill sizes="40px" className={cover ? "object-cover" : "object-contain p-1"} />
                        </span>
                        <span className="min-w-0 flex-1 text-sm">
                          <span className="block truncate font-semibold text-ink">{p.name}</span>
                          <span className="text-xs text-slate-400">
                            {hourly ? `${qty} ${qty === 1 ? "hora" : "horas"}` : `Cantidad: ${qty}`}
                          </span>
                        </span>
                        <span className="text-sm font-bold text-slate-700 tabular-nums">{line === null ? "" : line === 0 ? "Incluido" : clp(line)}</span>
                        <button
                          type="button"
                          onClick={() => setQty(p.id, 0)}
                          aria-label={`Quitar ${p.name} del resumen`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <FaTrashCan />
                        </button>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>
            )}

            {estimate.applied.length > 0 && (
              <div className="mt-4 rounded-2xl bg-linear-to-br from-pink-50 to-sun-50 p-3.5 ring-1 ring-pink-100">
                {estimate.applied.map((a, i) => (
                  <p key={a.pack.id + i} className="flex items-center gap-2 text-sm font-bold text-brand-900">
                    <FaGift className="text-pink-600" /> {a.pack.title} aplicado
                  </p>
                ))}
                <p className="mt-1 flex items-center justify-between text-sm font-bold text-emerald-700">
                  <span>Descuento pack</span>
                  <span>-{clp(estimate.savings)}</span>
                </p>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-dashed border-slate-200 bg-white px-5 pt-4 pb-5 lg:shadow-[0_-12px_24px_-18px_rgba(15,26,58,0.35)]">
            <div>
              <div className="flex items-end justify-between gap-3">
                <span className="text-sm leading-tight font-bold text-slate-600">
                  Total estimado
                  <span className="block text-[11px] font-medium text-slate-400">sin traslado</span>
                </span>
                <motion.span
                  key={estimate.total}
                  initial={reduce ? false : { scale: 1.15, color: "#16a34a" }}
                  animate={{ scale: 1, color: "#172f8e" }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl font-extrabold tabular-nums"
                >
                  {clp(estimate.total)}
                </motion.span>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-slate-500 [@media(max-height:760px)]:lg:hidden">No incluye el traslado (flete), que depende de tu comuna y te informamos por WhatsApp.</p>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-3.5 [@media(max-height:760px)]:lg:mt-3 [@media(max-height:760px)]:lg:p-2.5 text-sm text-slate-700 ring-1 ring-slate-200/70 transition hover:ring-brand-200">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-brand-600" />
              <span>
                Acepto los{" "}
                <Link href="/terminos" target="_blank" className="font-semibold text-brand-600 underline">
                  términos y condiciones
                </Link>{" "}
                y los{" "}
                <Link href="/condiciones" target="_blank" className="font-semibold text-brand-600 underline">
                  requisitos del espacio
                </Link>
                .
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.p
                  role="alert"
                  initial={reduce ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  <FaTriangleExclamation className="mt-0.5 shrink-0" /> {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" disabled={busy} className="zc-btn zc-btn-green zc-shine group mt-4 w-full py-3.5 text-base disabled:opacity-60">
              {busy ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Enviando…
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-lg" /> Enviar solicitud de reserva
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-500 [@media(max-height:760px)]:lg:hidden">
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-emerald-500" /> Te confirmamos la reserva por WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <FaCircleCheck className="text-pink-500" /> No pagas nada hasta que confirmemos tu fecha
              </li>
            </ul>

            <a
              href={whatsappLink("Hola, tengo una consulta sobre una reserva", contact.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 [@media(max-height:760px)]:lg:hidden"
            >
              <FaWhatsapp className="text-lg" /> ¿Dudas? Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </aside>
    </form>
  );
}
