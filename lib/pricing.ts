// Precios del catálogo para mostrar en la web y estimar el total de una reserva.
// El total DEFINITIVO lo calcula la base de datos al confirmar la reserva
// (mismo algoritmo que el portal administrativo).
import type { CatalogPack, CatalogProduct } from "@/types/catalog";

export function clp(value: number) {
  return `$${Math.round(value || 0).toLocaleString("es-CL")}`;
}

/** Precio visible de un servicio: «$25.000», «Incluido», «$15.000 / hora» o «Consultar». */
export function productPriceLabel(p: CatalogProduct) {
  if (p.billingType === "hour") return p.hourlyRate ? `${clp(p.hourlyRate)} / hora` : "Consultar";
  if (p.unitPrice == null) return "Consultar";
  return p.unitPrice === 0 ? "Incluido" : clp(p.unitPrice);
}

/**
 * Servicios que se muestran en el catálogo. Los adicionales sin costo (Goma Eva,
 * Pasto Sintético) solo se agregan si el cliente los pide al reservar.
 */
export const isListed = (p: CatalogProduct) => !(p.billingType !== "hour" && p.unitPrice === 0);

export type Selection = Record<string, number>; // productId -> cantidad (en servicios por hora: horas)

/**
 * Reconocimiento de packs (copia del algoritmo del portal): se aplica el pack
 * de mayor ahorro mientras alguno encaje. Devuelve el total estimado.
 */
export function estimateTotal(products: CatalogProduct[], packs: CatalogPack[], selection: Selection) {
  const byId = new Map(products.map((p) => [p.id, p]));
  const available: Record<string, number> = {};
  const price: Record<string, number> = {};
  let hourly = 0;
  const others = (id: string) => Object.entries(selection).some(([pid, q]) => pid !== id && q > 0);

  for (const [pid, qty] of Object.entries(selection)) {
    const p = byId.get(pid);
    if (!p || !(qty > 0)) continue;
    if (p.billingType === "hour") {
      const rate = others(pid) ? p.hourlyRateCombo : p.hourlyRate;
      hourly += qty * (rate ?? 0);
      continue;
    }
    available[pid] = (available[pid] ?? 0) + qty;
    price[pid] = Math.max(0, p.unitPrice ?? 0);
  }

  const valueOf = (m: Record<string, number>) => Object.entries(m).reduce((s, [pid, q]) => s + q * (price[pid] ?? 0), 0);
  const regular = valueOf(available);
  const applied: { pack: CatalogPack; savings: number }[] = [];

  for (let guard = 0; guard < 20; guard++) {
    let best: { pack: CatalogPack; consumed: Record<string, number>; savings: number; units: number } | null = null;
    for (const pack of packs) {
      if (!pack.slots.length) continue;
      const left = { ...available };
      const consumed: Record<string, number> = {};
      let ok = true;
      for (const slot of pack.slots) {
        let need = slot.quantity;
        const options = [...slot.productIds].sort((a, b) => (left[b] ?? 0) - (left[a] ?? 0) || a.localeCompare(b));
        for (const pid of options) {
          if (need <= 0) break;
          const take = Math.min(need, left[pid] ?? 0);
          if (take > 0) {
            left[pid] -= take;
            consumed[pid] = (consumed[pid] ?? 0) + take;
            need -= take;
          }
        }
        if (need > 0) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      const savings = valueOf(consumed) - pack.price;
      if (savings <= 0) continue;
      const units = Object.values(consumed).reduce((s, q) => s + q, 0);
      if (!best || savings > best.savings || (savings === best.savings && (units > best.units || (units === best.units && pack.number < best.pack.number)))) {
        best = { pack, consumed, savings, units };
      }
    }
    if (!best) break;
    for (const [pid, q] of Object.entries(best.consumed)) available[pid] -= q;
    applied.push({ pack: best.pack, savings: best.savings });
  }

  const total = applied.reduce((s, a) => s + a.pack.price, 0) + valueOf(available) + hourly;
  return { total, regular: regular + hourly, savings: regular + hourly - total, applied };
}

/** Servicios que se agregan al elegir un pack (en alternativas, la primera por nombre: piscina de 120 cm). */
export function packSelection(pack: CatalogPack, products: CatalogProduct[]): Selection | null {
  const out: Selection = {};
  for (const slot of pack.slots) {
    const options = products
      .filter((p) => slot.productIds.includes(p.id))
      .sort((a, b) => a.name.localeCompare(b.name, "es", { numeric: true, sensitivity: "base" }));
    if (!options.length) return null;
    out[options[0].id] = (out[options[0].id] ?? 0) + slot.quantity;
  }
  return out;
}
