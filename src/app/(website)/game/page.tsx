"use client";
import { useState, useEffect } from "react";
import GameCard from "@/components/GameCard";
import { Trophy, Clock, Star } from "lucide-react"; // Assicurati di avere lucide-react o usa icone simili

// Definizioni difficoltà
const difficulties = {
  easy: 6,
  medium: 12,
  hard: 16,
};

// Mappa delle difficoltà per le classi grid
const gridStyles = {
  easy: "grid-cols-4",
  medium: "grid-cols-4",
  hard: "grid-cols-4",
};

// --- CONFIGURAZIONE PREMI ---
// Tempi in secondi entro i quali il giocatore deve finire per ottenere il premio
const REWARD_THRESHOLDS = {
  easy: { gold: 9, silver: 10 },
  medium: { gold: 18, silver: 22 },
  hard: { gold: 36, silver: 45 },
};

type RewardType = "GOLD" | "SILVER" | "BRONZE" | null;

const generateCards = (pairCount: number) => {
  const selectedImages = Array.from({ length: pairCount }, (_, i) => ({
    id: i + 1,
    value: `/images/game-cards/${i + 1}.png`,
    isFlipped: false,
    isMatched: false,
    isShaking: false,
  }));

  return [...selectedImages, ...selectedImages].map((card, index) => ({
    ...card,
    id: index + 1,
  }));
};

const Page: React.FC = () => {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  
  // Stati di punteggio
  const [score, setScore] = useState(0);
  const [extraScore, setExtraScore] = useState(0);
  const [reward, setReward] = useState<RewardType>(null); // Nuovo stato per il premio

  const [gameName, setGameName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [goButtonZoom, setGoButtonZoom] = useState(false);
  const [firstEntry, setFirstEntry] = useState(true);

  // Setup carte
  useEffect(() => {
    if (difficulty) {
      const newCards = generateCards(difficulties[difficulty]);
      setCards(newCards.sort(() => Math.random() - 0.5));
    }
  }, [difficulty]);

  // Timer e Logica Vittoria
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isGameRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    // --- CONDIZIONE DI VITTORIA ---
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameRunning(false); // Ferma timer
      
      // Calcolo Score Numerico (Opzionale, manteniamo la tua logica o la semplifichiamo)
      // Qui rendo il punteggio dipendente dalla difficoltà per dare più soddisfazione
      const difficultyMultiplier = difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1;
      const finalScore = score + Math.max(0, (200 * difficultyMultiplier) - (timeElapsed * 2));
      setExtraScore(finalScore);

      // --- CALCOLO PREMIO (Logica Nuova) ---
      if (difficulty) {
        const thresholds = REWARD_THRESHOLDS[difficulty];
        if (timeElapsed <= thresholds.gold) {
          setReward("GOLD");
        } else if (timeElapsed <= thresholds.silver) {
          setReward("SILVER");
        } else {
          setReward("BRONZE");
        }
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isGameRunning, cards, score, timeElapsed, difficulty]);

  // Coriandoli
  useEffect(() => {
    if (typeof window !== "undefined" && cards.length > 0 && cards.every((card) => card.isMatched)) {
      import("canvas-confetti").then((module) => {
        const confetti = module.default;
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
          confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 } });
          confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 } });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      });
    }
  }, [cards]);

  const handleStartGame = () => {
    if (!gameName || !difficulty) return;

    const startLogic = () => {
      setHasStarted(true);
      setScore(0);
      setExtraScore(0);
      setReward(null); // Reset premio
      setTimeElapsed(0);
      setIsGameRunning(true);
      if (firstEntry) setFirstEntry(false);
    };

    if (firstEntry) {
      setGoButtonZoom(true);
      setTimeout(startLogic, 800);
    } else {
      startLogic();
    }
  };

  const handleNewGame = () => {
    setDifficulty(null);
    setCards([]);
    setFlippedCards([]);
    setScore(0);
    setExtraScore(0);
    setReward(null);
    setTimeElapsed(0);
    setIsGameRunning(false);
    setGameName("");
    setHasStarted(false);
    setFirstEntry(true);
    setGoButtonZoom(false);
  };

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length === 2 || cards.find((c) => c.id === id)?.isFlipped) return;

    const updatedCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      setTimeout(() => {
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          setScore((prev) => prev + 10);
          setCards((prev) => prev.map((c) => (c.value === firstCard.value ? { ...c, isMatched: true } : c)));
        } else {
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isShaking: true } : c)));
          setTimeout(() => {
            setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isShaking: false, isFlipped: false } : c)));
          }, 300);
        }
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  // Funzione helper per mostrare il messaggio del premio
  const getRewardDetails = () => {
    switch (reward) {
      case "GOLD":
        return { text: "LEGENDARY!", color: "text-yellow-400", sub: "Free Beer unlocked!", icon: <Trophy className="w-12 h-12 text-yellow-400 mb-2"/> };
      case "SILVER":
        return { text: "EPIC!", color: "text-gray-300", sub: "50% Discount earned.", icon: <Star className="w-12 h-12 text-gray-300 mb-2"/> };
      case "BRONZE":
        return { text: "GOOD JOB!", color: "text-orange-400", sub: "Try to be faster for a prize!", icon: <Clock className="w-12 h-12 text-orange-400 mb-2"/> };
      default:
        return null;
    }
  };

  const rewardData = getRewardDetails();
  const isGameOver = !isGameRunning && cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="font-inter min-h-screen">
      {!hasStarted ? (
        // --- Schermata Iniziale (Invariata nella logica, solo stile pulito) ---
        <div className="min-h-screen text-white flex justify-center p-4 pt-20">
          <div className="h-fit p-6 sm:p-10 rounded-xl shadow-2xl text-center w-full max-w-md border border-gray-700">
             <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex flex-col items-center">
              <span className="text-white">Beers &</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-[60px]">Memory</span>
            </h1>
            
            <input 
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4 text-center"
              type="text"
              placeholder="YOUR NAME"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['easy', 'medium', 'hard'].map((d) => (
                <button 
                  key={d}
                  onClick={() => setDifficulty(d as any)}
                  className={`p-2 uppercase font-bold rounded ${difficulty === d ? 'bg-secondary text-white ring-2 ring-white' : 'bg-gray-700 text-gray-400'}`}
                >
                  {d}
                </button>
              ))}
            </div>

            {firstEntry && (
              <button 
                className={`w-full p-4 font-bold text-xl rounded-lg text-white bg-gradient-to-r from-secondary to-pink-500 transition-all ${goButtonZoom ? "scale-125 opacity-0" : "scale-100"}`} 
                onClick={handleStartGame}
                disabled={!gameName || !difficulty} 
              >
                GO
              </button>
            )}
          </div>
        </div>
      ) : (
        // --- Schermata di Gioco ---
        <div className="min-h-screen text-white flex flex-col items-center p-4 sm:p-6">
          <div className="w-full max-w-4xl flex justify-between items-end mb-4 border-b border-gray-700 pb-2">
             <div>
                <h2 className="text-2xl font-bold text-white">{gameName}</h2>
                <div className="text-gray-400 text-sm uppercase">{difficulty} Mode</div>
             </div>
             <div className="text-right">
                <div className="text-3xl font-mono font-bold text-secondary">{timeElapsed}s</div>
                <div className="text-xs text-gray-500">TIME ELAPSED</div>
             </div>
          </div>
          
          {/* GRIGLIA CARTE */}
          {!isGameOver ? (
             <div className={`grid ${gridStyles[difficulty!]} gap-2 sm:gap-3 w-full max-w-4xl mx-auto mb-4`}>
                {cards.map((card) => (
                  <GameCard 
                    key={card.id} 
                    card={card} 
                    onClick={() => handleCardClick(card.id)} 
                  />
                ))}
             </div>
          ) : (
             // --- SCHERMATA VITTORIA / PREMIO ---
             <div className="animate-in fade-in zoom-in duration-500 mt-10 p-8 bg-gray-800 border border-gray-600 rounded-2xl text-center max-w-lg w-full shadow-2xl">
                {rewardData && (
                  <>
                    <div className="flex justify-center">{rewardData.icon}</div>
                    <h2 className={`text-4xl font-black ${rewardData.color} mb-2`}>{rewardData.text}</h2>
                    <p className="text-xl text-white mb-6">{rewardData.sub}</p>
                    
                    <div className="bg-gray-900/50 p-4 rounded-lg mb-6 text-left space-y-2">
                       <div className="flex justify-between text-gray-400">
                          <span>Difficulty:</span>
                          <span className="text-white capitalize">{difficulty}</span>
                       </div>
                       <div className="flex justify-between text-gray-400">
                          <span>Time:</span>
                          <span className="text-white">{timeElapsed}s</span>
                       </div>
                       <div className="flex justify-between text-gray-400 border-t border-gray-700 pt-2 mt-2">
                          <span>Final Score:</span>
                          <span className="text-yellow-400 font-bold">{extraScore} pts</span>
                       </div>
                    </div>
                  </>
                )}
                
                <button 
                  className="w-full px-8 py-4 font-bold text-lg bg-secondary text-white rounded-lg hover:bg-primary hover:scale-105 transition-all shadow-lg shadow-secondary/20" 
                  onClick={handleNewGame}
                >
                  PLAY AGAIN
                </button>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;