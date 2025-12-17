'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AutoScrollerProps {
  children: React.ReactNode;
  duration?: number;
}

export default function AutoScroller({ children, duration = 40 }: AutoScrollerProps) {
  const [shouldScroll, setShouldScroll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const contentHeight = contentRef.current.scrollHeight;

        // Se il contenuto è più alto del contenitore, attiva lo scroll
        setShouldScroll(contentHeight > containerHeight);
      }
    };

    // Controllo immediato
    checkOverflow();

    // Aggiungiamo un listener per il resize (se ridimensioni la finestra potrebbe servire scrollare)
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden relative">
      
      {shouldScroll ? (
        // --- MODALITÀ SCROLL (Contenuto troppo lungo) ---
        <div 
          className="w-full hover:[animation-play-state:paused]"
          style={{
            animation: `vertical-scroll ${duration}s linear infinite`
          }}
        >
          {/* Prima copia (misurata inizialmente) */}
          <div ref={contentRef}>
             {children}
             {/* Spazietto extra tra la fine e l'inizio del prossimo giro */}
             <div className="h-4"></div> 
          </div>
          
          {/* Seconda copia per il loop */}
          <div>
             {children}
             <div className="h-4"></div>
          </div>
        </div>
      ) : (
        // --- MODALITÀ STATICA (Contenuto corto) ---
        <div ref={contentRef} className="h-full w-full">
          {children}
        </div>
      )}

      {/* Definizione keyframes locale */}
      <style jsx>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}