import clsx from "clsx";
import { Fragment } from "react"; // Non serve, flatMap è sufficiente

type Props = {
  text: string;
  className?: string;
  wordDisplayStyle?: "inline-block" | "block";
};

export function TextSplitter({
  text,
  className,
  wordDisplayStyle = "inline-block",
}: Props) {
  if (!text) return null;

  const words = text.split(" ");

  // Usa flatMap per poter aggiungere lo spazio tra le parole
  return words.flatMap((word: string, wordIndex: number) => {
    const wordSpan = (
      <span
        className={clsx("split-word", className)}
        style={{ display: wordDisplayStyle, whiteSpace: "pre" }}
        key={`${wordIndex}-${word}`}
      >
        {word.split("").map((char, charIndex) => (
          <span
            key={charIndex}
            className={`split-char inline-block split-char--${wordIndex}-${charIndex}`}
          >
            {char}
          </span>
        ))}
      </span>
    );

    // Se NON è l'ultima parola, ritorna la parola E uno spazio
    if (wordIndex < words.length - 1) {
      return [wordSpan, " "]; // React renderizzerà questo spazio
    }

    // Se è l'ultima parola, ritorna solo la parola
    return [wordSpan];
  });
}