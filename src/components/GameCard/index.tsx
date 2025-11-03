import React from 'react';
import Image from 'next/image';
// import Image from 'next/image'; // Rimosso a causa dell'errore di build
// import './GameCard.css'; // Rimosso a causa dell'errore di build

// Definiamo i tipi per le props che riceviamo da Page.tsx
type CardProps = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  isShaking: boolean;
};

type SingleCardProps = {
  card: CardProps;
  onClick: (id: number) => void;
};

const GameCard: React.FC<SingleCardProps> = ({ card, onClick }) => {
  
  const handleClick = () => {
    // Non permettere di cliccare se la carta è già girata, 
    // in "shaking" o già abbinata
    if (!card.isFlipped && !card.isShaking && !card.isMatched) {
      onClick(card.id);
    }
  };

  // Le classi sono state convertite in utility Tailwind
  // [perspective:1000px] è un valore arbitrario di Tailwind per 'perspective: 1000px'
  // [transform-style:preserve-3d] abilita la trasformazione 3D
  // [backface-visibility:hidden] nasconde il retro della faccia durante il flip
  return (
    // Aggiunto Fragment <> per includere il tag <style>
    <>
      {/* Stili per l'animazione 'shake'
        Integrati qui per rimuovere l'import di .css
      */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0) rotateY(180deg); }
            25% { transform: translateX(-5px) rotateY(180deg); }
            50% { transform: translateX(5px) rotateY(180deg); }
            75% { transform: translateX(-5px) rotateY(180deg); }
            100% { transform: translateX(0) rotateY(180deg); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}
      </style>

      <div className="[perspective:1000px] w-full h-full aspect-square">
        <div 
          className={`
            relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] cursor-pointer
            ${card.isFlipped ? '[transform:rotateY(180deg)]' : ''} 
            ${card.isShaking ? 'animate-shake' : ''}
            ${card.isMatched ? 'opacity-40 cursor-default' : ''}
          `}
          onClick={handleClick}
        >
          {/* Fronte della Carta (l'immagine del memory) */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden shadow-md [transform:rotateY(180deg)]">
            {/* Sostituito <Image> con <img> standard */}
            <Image 
            layout="fill"
              src={card.value} 
              alt="Card Front" 
              className="w-full h-full object-contain" // Tailwind controlla la dimensione
            />
          </div>
          
          {/* Retro della Carta (il tuo back.png) */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden shadow-md">
            {/* Sostituito <Image> con <img> standard */}
            <Image
             layout="fill"
              src="/images/game-cards/back.png" // Percorso aggiornato
              alt="Card Back" 
              className="w-full h-full object-contain" // Aggiunto p-2 per un piccolo bordo
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;

