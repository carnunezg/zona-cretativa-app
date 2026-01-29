export default function TerminosPage() {
  return (
    <section className="flex justify-center px-4 sm:px-8 py-16">
      <div
        className="
          max-w-3xl w-full
          bg-white/85 backdrop-blur-md
          rounded-3xl
          shadow-xl
          p-8 sm:p-12
          border border-white/40
        "
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-fuchsia-700 mb-8">
          Términos y Condiciones
        </h1>

        <div className="space-y-6 text-gray-800 leading-relaxed text-sm sm:text-base">
          <div>
            <h3 className="font-bold text-fuchsia-600 mb-1">Reserva y pago</h3>
            <p>
              Para reservar tu fecha, debes abonar el <b>40% del valor total</b>
              mediante transferencia. El saldo restante se cancela el día del
              evento, durante la instalación de la plaza blanda.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-fuchsia-600 mb-1">
              Cambios o cancelaciones
            </h3>
            <p>
              Si necesitas cancelar, debes avisarnos con al menos{" "}
              <b>7 días de anticipación</b> para recibir el reembolso de tu
              abono. Pasado este plazo, podrás reprogramar tu reserva (sujeto a
              disponibilidad), sin reembolso.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-fuchsia-600 mb-1">
              Duración del arriendo
            </h3>
            <p>
              El arriendo tiene una duración de <b>5 a 6 horas</b>, con retiro
              máximo a las <b>20:00 hrs</b>.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-fuchsia-600 mb-1">
              Responsabilidad por daños
            </h3>
            <p>
              La persona que arrienda es responsable del buen uso de los juegos.
              En caso de daño, se aplicará un cobro del <b>20%</b> del valor de
              fábrica del juego afectado. Si el juego queda inutilizable por mal
              uso, se deberá cubrir el
              <b> 100% de su valor</b>.
            </p>
            <p className="mt-2">🤍 Cuidemos juntos los juegos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
