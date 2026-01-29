export default function CondicionesEspacioPage() {
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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-600 mb-8">
          Condiciones del Espacio
        </h1>

        <div className="space-y-6 text-gray-800 leading-relaxed text-sm sm:text-base">
          <p>
            Nuestra plaza blanda puede instalarse tanto en{" "}
            <b>interior como en exterior</b>, siempre que el espacio esté
            limpio, seco y sea seguro para la instalación de los juegos y para
            los pequeños.
          </p>

          <div>
            <p className="font-semibold mb-2">
              Es ideal para superficies como:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Piso flotante</li>
              <li>Cerámica</li>
              <li>Pasto parejo</li>
              <li>Áreas niveladas y sin piedras</li>
            </ul>
          </div>

          <p>
            Antes del evento, te pedimos verificar que cuentas con el
            <b> espacio suficiente</b> para la correcta instalación.
          </p>

          <p className="text-green-700 font-medium">
            Si tienes dudas o necesitas orientación, con gusto te ayudamos a
            revisar las medidas 🤍
          </p>
        </div>
      </div>
    </section>
  );
}
