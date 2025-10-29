"use client"

import React from 'react';
import ThickChevron from "@/components/ui/ThickChevron";

interface PaginatorProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, pageCount, onPageChange }) => {

  // 1. Crea una funzione handler interna
  const handlePageChange = (page: number) => {
    // Non fare nulla se si clicca sulla pagina già attiva
    if (page === currentPage) return;

    // 2. Esegui lo scroll "smooth" verso l'alto
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 3. Chiama la funzione originale del genitore per cambiare pagina
    onPageChange(page);
  };

  return (
    <div className="flex gap-4 my-4 justify-center">
      {/* Previous Button */}
      <button
        // 4. Usa il nuovo handler
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-black text-primary rounded hover:bg-primary hover:text-black transition duration-300 disabled:opacity-50"
        style={{ transform: 'rotate(180deg)' }}
      >
        <ThickChevron />
      </button>

      {/* Page Number Buttons */}
      {pageCount > 1 && Array.from({ length: pageCount }).map((_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            // 4. Usa il nuovo handler
            onClick={() => handlePageChange(pageNum)}
            className={`px-4 py-2 font-fatboy rounded transition duration-300 ${currentPage === pageNum
                ? "bg-black text-primary"
                : "bg-black text-secondary hover:text-primary"
              }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        // 4. Usa il nuovo handler
        onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
        disabled={currentPage === pageCount}
        className="px-4 py-2 bg-black text-primary rounded hover:bg-primary hover:text-black transition duration-300 disabled:opacity-50"
      >
        <ThickChevron />
      </button>
    </div>
  );
};

export default Paginator;