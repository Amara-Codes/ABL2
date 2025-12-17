import { Suspense } from "react";
import type { Metadata } from "next";
import BeerGrid from "@/components/BeerGrid"; // Il componente PLP creato nel passo precedente
import BeerGridSkeleton from "@/components/skeletons/templates/skeleton-beer-grid";

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// ============================================================================
// 1. Generic Server-Side Data Fetcher
// ============================================================================
/**
 * Funzione generica per chiamare Strapi.
 * @param endpoint - La collezione da chiamare (es. "beers", "categories", "drops")
 * @param queryParams - Stringa opzionale per filtri e populate (es. "populate=*")
 */
async function fetchData(endpoint: string, queryParams: string = "") {
  try {
    // Costruiamo l'URL completo
    const url = `${STRAPI_URL}/api/${endpoint}?${queryParams}`;
    
    const response = await fetch(url, {
      cache: 'no-store', // Dati sempre freschi
      // next: { revalidate: 3600 } // Alternativa: Cache per 1 ora
    });

    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data || []; // Ritorniamo l'array 'data' o un array vuoto
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
}

// ============================================================================
// Metadata
// ============================================================================
export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Our Craft Beers",
  description: "Discover the latest Amara Beer Lab releases, the craft brewery in Siem Reap, dedicated to sustainability and community impact through high-quality craft beers.",
};

// ============================================================================
// The Page Component (Server)
// ============================================================================
export default async function BeersPage() {
  // 2. Eseguiamo le chiamate in parallelo per massimizzare la velocità
  // Usiamo la nuova funzione `fetchData` per tutto
  const [beers, categories, drops] = await Promise.all([
    fetchData("beers", "populate=*&sort=createdAt:desc"), // Carica birre con immagini e relazioni
    fetchData("categories", "sort=name:asc"),             // Carica categorie
    fetchData("drops", "sort=createdAt:desc"),            // Carica drops
  ]);

  return (
    <main className="min-h-screen bg-black text-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-fatboy text-white mb-4">
                Our <span className="text-secondary">Beers</span>
            </h1>
            <p className="text-white max-w-7xl text-lg">
                Explore our diverse range of craft beers, each brewed with passion and precision to deliver unique flavors and unforgettable experiences.
            </p>
        </div>

        {/* 3. Passiamo i dati grezzi al Client Component che gestisce la logica UI */}
        <Suspense fallback={<BeerGridSkeleton />}>
          <BeerGrid 
            beers={beers} 
            categories={categories} 
            drops={drops} 
          />
        </Suspense>

      </div>
    </main>
  );
}