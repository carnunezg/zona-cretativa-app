import Link from "next/link";
import { PageShell } from "@/components/PageHeader";

export default function NotFound() {
  return (
    <PageShell className="flex items-start justify-center">
      <div className="max-w-md w-full bg-white/90 rounded-3xl shadow-xl p-8 text-center border border-slate-200">
        <p className="text-6xl font-extrabold text-[#F59E0B] mb-2">404</p>
        <h1 className="text-2xl font-bold text-[#1E3A8A] mb-3">
          Esta página no existe
        </h1>
        <p className="text-slate-600 mb-6">
          Puede que el enlace haya cambiado. Vuelve al inicio para ver nuestros servicios.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </PageShell>
  );
}
