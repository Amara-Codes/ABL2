import { BigTextContent } from "@/types";

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ content }: BigTextContent): JSX.Element => {
  const {
    bgColorClass,
    textColorClass,
    sentence,
    maxWidth = 100,
    factor = 1, // Imposta un fattore di default se non fornito
  } = content;

  return (
    <section className={`min-h-full ${bgColorClass} ${textColorClass}`}>
      <h2
        className="grid w-full gap-y-[1vw] py-10 text-center font-black uppercase leading-[.7] items-center px-4 lg:px-16 mx-auto"
        style={{ maxWidth: `${maxWidth}%` }}
      >
        {sentence.split(" ").map((word, i) => {
          // --- La logica per la dimensione di base non cambia ---
          const baseGroupValue = (Math.cos((i * Math.PI) / 2) + 1) / 2;
          const baseSize = 40 + baseGroupValue * 160;
          const randomJitter = (Math.random() - 0.5) * 60;
          let finalSize = Math.round(baseSize + randomJitter);
          finalSize = Math.max(40, Math.min(200, finalSize));

          // --- La logica per l'allineamento non cambia ---
          const alignments = ["text-left", "text-center", "text-right"];
          const PROBABILITY_TO_BREAK = 0.25;
          let finalAlignment = alignments[i % 3];
          if (Math.random() < PROBABILITY_TO_BREAK) {
            const randomIndex = Math.floor(Math.random() * alignments.length);
            finalAlignment = alignments[randomIndex];
          }

          // --- ✨ NUOVA LOGICA PER IL FONT SIZE DINAMICO ---

          // 1. Definiamo i limiti MIN e MAX in pixel.
          // Questi valori possono essere basati sulla `finalSize` calcolata.
          const minFontSize = finalSize * 0.2; // Esempio: minimo 50% della dimensione base
          const maxFontSize = finalSize * 1; // Esempio: massimo 120% della dimensione base

          // 2. Definiamo il valore preferito usando le unità viewport (vw).
          // Questo valore scala con la larghezza dello schermo.
          // Il valore '10' è un esempio, puoi regolarlo per cambiare la velocità di ridimensionamento.
          const preferredFontSize = `${10 * (finalSize / 100)}vw`;

          // 3. Applichiamo il fattore 'factor' a tutti i valori per scalarli uniformemente.
          const finalMin = (minFontSize * factor).toFixed(2);
          const finalMax = (maxFontSize * factor).toFixed(2);
          const finalPreferred = `${(10 * (finalSize / 100) * factor).toFixed(2)}vw`;

          return (
            <div
              className={`w-full ${finalAlignment}`}
              key={i}
              style={{
                fontSize: `clamp(${finalMin}px, ${finalPreferred}, ${finalMax}px)`,
              }}
            >
              {word}
            </div>
          );
        })}
      </h2>
    </section>
  );
};

export default BigText;