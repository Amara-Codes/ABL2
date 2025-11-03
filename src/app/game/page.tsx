"use client";
import { useState, useEffect } from "react";
import GameCard from "@/components/GameCard"; // Assicurati che questo percorso sia corretto

// Definizioni difficoltà
const difficulties = {
  easy: 6,
  medium: 12,
  hard: 16,
};

// Mappa delle difficoltà per le classi grid di Tailwind
const gridStyles = {
  easy: "grid-cols-4",   // 12 carte totali (4x3)
  medium: "grid-cols-4", // 24 carte totali (6x4)
  hard: "grid-cols-4",   // 32 carte totali (8x4)
};

// Funzione per generare le carte, puntando alla nuova cartella
const generateCards = (pairCount: number) => {
  const selectedImages = Array.from({ length: pairCount }, (_, i) => ({
    id: i + 1,
    value: `/images/game-cards/${i + 1}.png`, // Percorso aggiornato
    isFlipped: false,
    isMatched: false,
    isShaking: false,
  }));

  // Duplica le immagini per creare le coppie e assegna un ID unico
  return [...selectedImages, ...selectedImages].map((card, index) => ({
    ...card,
    id: index + 1,
  }));
};

// Componente principale della pagina
const Page: React.FC = () => {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [cards, setCards] = useState<{ id: number; value: string; isFlipped: boolean; isMatched: boolean; isShaking: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [extraScore, setExtraScore] = useState(0);
  const [gameName, setGameName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [goButtonZoom, setGoButtonZoom] = useState(false);
  const [firstEntry, setFirstEntry] = useState(true);

  // Effetto per generare e mischiare le carte quando la difficoltà cambia
  useEffect(() => {
    if (difficulty) {
      const newCards = generateCards(difficulties[difficulty]);
      setCards(newCards.sort(() => Math.random() - 0.5));
    }
  }, [difficulty]);

  // Effetto per gestire il timer di gioco e la condizione di vittoria
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isGameRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    // Condizione di vittoria
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameRunning(false); // Ferma il timer
      const finalScore = score + Math.max(0, 100 - timeElapsed);
      setExtraScore(finalScore);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameRunning, cards, score, timeElapsed]);

  // Effetto per lanciare i coriandoli (CON IMPLEMENTAZIONE MIGLIORATA)
  useEffect(() => {
    if (typeof window !== "undefined" && cards.length > 0 && cards.every((card) => card.isMatched)) {
      import("canvas-confetti").then((module) => {
        const confetti = module.default;

        const duration = 3 * 1000; // 3 secondi
        const end = Date.now() + duration;

        (function frame() {
          // Lancia coriandoli da sinistra
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          // Lancia coriandoli da destra
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      });
    }
  }, [cards]);
  
  // Gestore per l'avvio del gioco
  const handleStartGame = () => {
    // Utilizza un modale personalizzato o un messaggio inline invece di alert()
    if (!gameName || !difficulty) {
      console.warn("Please enter name and difficulty level");
      // Potresti impostare uno stato di errore qui per mostrarlo nell'interfaccia utente
      return; 
    }

    if (firstEntry) {
      setGoButtonZoom(true);
      setTimeout(() => {
        setHasStarted(true);
        setScore(0);
        setExtraScore(0);
        setTimeElapsed(0);
        setIsGameRunning(true);
        setFirstEntry(false);
      }, 800); // Tempo per l'animazione zoom + fade out
    } else {
      setHasStarted(true);
      setScore(0);
      setExtraScore(0);
      setTimeElapsed(0);
      setIsGameRunning(true);
    }
  };

  // Gestore per iniziare una nuova partita (reset)
  const handleNewGame = () => {
    setDifficulty(null);
    setCards([]);
    setFlippedCards([]);
    setScore(0);
    setExtraScore(0);
    setTimeElapsed(0);
    setIsGameRunning(false);
    setGameName("");
    setHasStarted(false);
    setFirstEntry(true);
    setGoButtonZoom(false);
  };

  // Gestore per il click sulla singola carta
  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length === 2 || cards.find((card) => card.id === id)?.isFlipped) return;

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    setCards(updatedCards);
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      setTimeout(() => {
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          // Match
          setScore((prevScore) => prevScore + 10);
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.value === firstCard.value ? { ...card, isMatched: true } : card
            )
          );
        } else {
          // No Match
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isShaking: true }
                : card
            )
          );

          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isShaking: false, isFlipped: false }
                  : card
              )
            );
          }, 300);
        }

        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  // Render del componente
  return (
    <div className="font-inter">
      {!hasStarted ? (
        // --- Schermata Iniziale ---
        <div className="min-h-screen text-white flex justify-center p-4">
          <div className="p-6 sm:p-10 rounded-xl shadow-2xl text-center w-full max-w-md border border-gray-700">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 flex flex-col items-center">
              <span className="text-white">Beers &</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-[60px]">Memory</span>
              <em className="italic mt-4 text-white text-lg">Keep your brain trained while drinking... </em>
            </h1>
            
            <label htmlFor="name" className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2 block">
              Enter your name:
            </label>
            <input 
              id="name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary mb-6"
              type="text"
              name="name"
              placeholder="Your Name..."
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
            
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 block">
              Choose your level:
            </span>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <button 
                onClick={() => setDifficulty("easy")}
                className={`w-full p-3 font-semibold rounded-lg transition-all duration-200 ${
                  difficulty === 'easy' 
                  ? 'bg-primary text-white ring-2 ring-secondary' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                EASY
              </button>
              <button 
                onClick={() => setDifficulty("medium")}
                className={`w-full p-3 font-semibold rounded-lg transition-all duration-200 ${
                  difficulty === 'medium' 
                  ? 'bg-primary text-white ring-2 ring-secondary' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                MEDIUM
              </button>
              <button 
                onClick={() => setDifficulty("hard")}
                className={`w-full p-3 font-semibold rounded-lg transition-all duration-200 ${
                  difficulty === 'hard' 
                  ? 'bg-primary text-white ring-2 ring-secondary' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                HARD
              </button>
            </div>

            <div className="go">
              {firstEntry && (
                <button 
                  className={`w-full p-4 font-bold text-xl rounded-lg text-white bg-gradient-to-r from-secondary to-pink-500 hover:from-primary hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-secondary transform transition-all duration-500 ease-in-out ${
                    goButtonZoom ? "scale-125 opacity-0" : "scale-100 opacity-100"
                  }`} 
                  onClick={handleStartGame}
                  // Disabilita il pulsante se il nome o la difficoltà non sono stati scelti
                  disabled={!gameName || !difficulty} 
                >
                  GO
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // --- Schermata di Gioco ---
        <div className="min-h-screen text-white flex flex-col items-center p-4 sm:p-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-pink-500 mb-2">
            Let&apos;s go, {gameName}!
          </h2>
          <h3 className="text-xl font-medium text-gray-300 mb-1">
            Score: <span className="text-white font-bold">{score}</span> | Time: <span className="text-white font-bold">{timeElapsed}s</span>
          </h3>
          <h3 className="text-lg font-medium text-yellow-400 mb-6">
            Final Score: <span className="text-yellow-300 font-bold">{extraScore}</span>
          </h3>
          
          <div className={`grid ${gridStyles[difficulty!]} gap-2 sm:gap-3 w-full max-w-4xl mx-auto mb-6`}>
            {cards.map((card) => (
              <GameCard 
                key={card.id} 
                card={card} 
                onClick={() => handleCardClick(card.id)} 
              />
            ))}
          </div>
          
          <button 
            className="mt-4 px-8 py-3 font-semibold text-lg bg-secondary text-gray-200 rounded-lg hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500" 
            onClick={handleNewGame}
          >
            NEW GAME
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;

