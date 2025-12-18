import React from 'react';
import localFont from 'next/font/local'; // 1. Importa localFont

// 2. Configura il font.
// 'src' è il percorso relativo a QUESTO file.
const menuFont = localFont({
  src: './B21.ttf', // Sostituisci col nome del tuo file
  display: 'swap',
  variable: '--font-menu-custom', // Opzionale: se vuoi usarlo come var CSS
});


type DisplayType = 'horizontal' | 'vertical';
type TextAlign = 'left' | 'center' | 'right';

interface MenuCategoryTitleProps {
  title: string;
  displayType?: DisplayType;
  textAlign?: TextAlign;
  color?: string;
  className?: string;
}

export default function MenuCategoryTitle({
  title,
  displayType = 'horizontal',
  textAlign = 'left',
  color = 'text-gray-900',
  className = '',
}: MenuCategoryTitleProps) {

  // Combiniamo la classe del font caricato con le classi passate
  // menuFont.className inietta automaticamente il CSS necessario
  const fontClass = menuFont.className; 

  // --- LOGICA VERTICALE ---
  if (displayType === 'vertical') {
    return (
      <div 
        // 3. Aggiungiamo fontClass qui
        className={`${fontClass} h-full flex flex-col items-center justify-center gap-0 ${color} ${className}`}
        aria-label={title}
      >
        {title.split('').map((char, index) => (
          <span 
            key={index} 
            className="uppercase font-bold text-6xl md:text-8xl leading-none"
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  // --- LOGICA ORIZZONTALE ---
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <h2 
      // 3. Aggiungiamo fontClass anche qui
      className={`${fontClass} text-6xl font-bold uppercase mb-4 ${alignmentClasses[textAlign]} ${color} ${className}`}
    >
      {title}
    </h2>
  );
}