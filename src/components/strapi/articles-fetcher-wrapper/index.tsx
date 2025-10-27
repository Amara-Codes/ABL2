"use client"; // Indica che questo è un Client Component

import React, { useEffect, useState } from "react";
import ArticlesFetcher from "../article-fetcher";
import { Sorter } from "../sorter"; 
import Paginator from "../paginator"
import qs from "qs";

// Definisci il tipo della risposta che ti aspetti da getPageInfos
type PaginationInfo = {
  pageCount: number ;
};

type Infos = {
  pagination?: PaginationInfo; // Pagination è opzionale
};

export default function ArticlesFetcherWrapper({
  initialCategory = "*",
  articlesPerPage = 3, // Nuova prop con valore di default 3
}: {
  initialCategory?: "news" | "activities" | "blog" | "*";
  articlesPerPage?: number; // Definizione della nuova prop
}) {
  // Stato per il sort e la pagina corrente
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  async function getPageInfos(
    category = "*",
    articlesPerPage = 3
  ) {
    const baseUrl = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL ?? "http://localhost:1337";
    const path = "/api/articles";

    const url = new URL(path, baseUrl);
    const query: Record<string, any> = {
      pagination: {
        pageSize: articlesPerPage
      }
    };

    if (category !== "*") {
      query.filters = { Category: category };
    }

    url.search = qs.stringify(query);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await res.json();
    return data;
  }

  const [infos, setInfos] = useState<Infos | undefined>(undefined); // Modifica qui

  useEffect(() => {
    // Esegui il fetch degli articoli ogni volta che currentPage o sort cambiano
    getPageInfos(initialCategory, articlesPerPage)
      .then((data) => setInfos(data.meta))
      .catch((error) => console.error(error));
  }, [initialCategory, articlesPerPage, currentPage]); // Aggiungi currentPage per aggiornare quando cambia

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="hidden lg:flex justify-end items-center">
        {/* Sostituisci il pulsante di ordinamento con il componente Sorter */}
        <Sorter onSortChange={(value) => setSort(value)} />
      </div>

      <ArticlesFetcher
        articleCategory={initialCategory}
        limit={articlesPerPage} // Usa articlesPerPage come valore per limit
        sort={sort}
        currentPage={currentPage}
      />

      {/* Aggiungi la paginazione solo se il pageCount è maggiore di 1 */}
      { infos?.pagination?.pageCount && infos?.pagination?.pageCount > 1 && (
  <Paginator
  currentPage={currentPage}
  pageCount={infos.pagination.pageCount}
  onPageChange={handlePageChange}
/>
      )}
    </div>
  );
}
