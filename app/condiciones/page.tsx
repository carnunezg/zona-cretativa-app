export default function CondicionesEspacioPage() {
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
          Requisitos del Espacio
        </h1>

        <div className="space-y-6 text-[#0F172A] leading-relaxed text-sm sm:text-base">
          <p>
            Nuestros productos pueden instalarse tanto en{" "}
            <b>interior como exterior</b>, siempre que el espacio esté limpio,
            seco y sea seguro para la instalación y el uso por parte de los
            niños.
          </p>

          <div>
            <p className="font-semibold mb-2 text-[#2563EB]">
              Superficies recomendadas:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Piso flotante</li>
              <li>Cerámica</li>
              <li>Pasto parejo</li>
              <li>Áreas niveladas y sin piedras</li>
            </ul>
          </div>

          <p>
            Antes del evento, te pedimos verificar que cuentas con el{" "}
            <b>espacio suficiente</b> para la correcta instalación.
          </p>

          <p className="text-[#16A34A] font-medium">
            Si tienes dudas o necesitas orientación, con gusto te ayudamos 🤍
          </p>
        </div>
      </div>
    </section>
  );
}
