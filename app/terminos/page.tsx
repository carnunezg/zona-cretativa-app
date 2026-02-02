export default function TerminosPage() {
  return (
    <section
      className="
        flex justify-center px-4 sm:px-8
        pt-32 sm:pt-36 md:pt-40 pb-16
         bg-gradient-to-b  from-blue-800/95 via-blue-400/90 to-blue-100/85
      "
    >
      <div
        className="
          max-w-3xl w-full
          bg-white
          rounded-3xl
          shadow-lg
          p-8 sm:p-12
          border border-slate-200
        "
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#1E3A8A] mb-8">
          Términos y Condiciones
        </h1>

        <div className="space-y-6 text-[#0F172A] leading-relaxed text-sm sm:text-base">
          <div>
            <h3 className="font-bold text-[#2563EB] mb-1">Reserva y pago</h3>
            <p>
              Para reservar tu fecha, debes abonar el{" "}
              <b className="text-[#F59E0B]">10% del valor total</b> mediante
              transferencia. El saldo restante se cancela el día del evento,
              durante la instalación de la plaza blanda.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#2563EB] mb-1">
              Cambios o cancelaciones
            </h3>
            <p>
              Si necesitas cancelar, debes avisarnos con al menos{" "}
              <b>7 días de anticipación</b>. Pasado este plazo, podrás
              reprogramar tu reserva (sujeto a disponibilidad), sin reembolso.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#2563EB] mb-1">
              Duración del arriendo
            </h3>
            <p>
              El arriendo tiene una duración de <b>4 a 5 horas</b>, con retiro
              máximo a las <b>20:00 hrs</b>.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#2563EB] mb-1">
              Responsabilidad por daños
            </h3>
            <p>
              La persona que arrienda es responsable del buen uso de los juegos.
              En caso de daño, se aplicará un cobro del{" "}
              <b className="text-[#DC2626]">20%</b> del valor de fábrica. Si el
              juego queda inutilizable, se deberá cubrir el{" "}
              <b className="text-[#DC2626]">100%</b> de su valor.
            </p>
            <p className="mt-2 text-[#475569]">
              🤍 Cuidemos juntos los juegos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
