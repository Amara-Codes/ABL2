"use client";

import React from 'react';

// Un'icona freccia minimale e pulita
const SortArrowIcon = ({ direction }: { direction: 'asc' | 'desc' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
      direction === 'asc' ? 'transform rotate-180' : 'transform rotate-0'
    }`}
  >
    {/* Questa è una freccia "in giù". La ruotiamo di 180° per "in sù" */}
    <path
      fillRule="evenodd"
      d="M10 15a.75.75 0 01-.75-.75V6.56l-3.22 3.22a.75.75 0 11-1.06-1.06l4.5-4.5a.75.75 0 011.06 0l4.5 4.5a.75.75 0 11-1.06 1.06L10.75 6.56V14.25A.75.75 0 0110 15z"
      clipRule="evenodd"
    />
  </svg>
);


// Props aggiornate: ora abbiamo bisogno di 'currentSort'
type SorterProps = {
  currentSort: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
};

export function Sorter({ currentSort, onSortChange }: SorterProps) {
  
  const isDesc = currentSort === 'desc';

  // Definiamo etichette e direzione
  const label = isDesc ? "Newest first" : "Oldest first";

  // Gestore del click: inverte l'ordinamento attuale
  const handleToggleSort = () => {
    const nextSort = isDesc ? 'asc' : 'desc';
    onSortChange(nextSort);
  };

  return (
    <div className="flex"> {/* Wrapper per allineamento */}
      <button
        onClick={handleToggleSort}
        className="flex items-center justify-center gap-2 px-4 py-2 
                   bg-black text-secondary hover:text-primary 
                   transition-all duration-200 ease-in-out font-fatboy"
      >
        {/* Il testo cambia in base allo stato */}
        <span>{label}</span>
        
        {/* L'icona ruota in base allo stato */}
        <SortArrowIcon direction={currentSort} />
      </button>
    </div>
  );
}