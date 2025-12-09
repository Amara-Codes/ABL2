import { Suspense } from "react";
import type { Metadata } from "next";
import BeerGrid from "@/components/BeerGrid";


const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// --- FETCH HELPER ---
async function getKhmerBeers() {
    // Query diretta alla collezione 'beers' filtrando per il booleano
    const url = `${STRAPI_URL}/api/beers?filters[isKhmerIngredients][$eq]=true&populate=*&sort=createdAt:desc`;
    
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const json = await res.json();
    return json.data || [];
}

// --- METADATA (Statici in questo caso) ---
export const metadata: Metadata = {
    title: "Khmer Ingredients Series | Amara Beer Lab",
    description: "Experience the authentic taste of Cambodia. Craft beers brewed with local Jasmine Rice, Kampot Pepper, Palm Sugar, and Lemongrass.",
    openGraph: {
        title: "Khmer Ingredients Series | Craft Beer Brewery in Siem Reap - Amara Beer Lab",
        description: "Craft beers brewed with authentic Cambodian ingredients.",
        url: "/beers/khmer-ingredients",
        siteName: 'Amara Beer Lab',
        locale: 'en_US',
        type: 'website',
    },
};

// --- PAGE COMPONENT ---
export default async function KhmerIngredientsPage() {
    const beers = await getKhmerBeers();

    return (
        <main className="min-h-screen bg-black text-white p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                
    

                {/* HEADER KHMER SERIES */}
                <div className="mb-12 text-center lg:text-left border-b border-gray-800 pb-8">
                    {/* Badge Verde specifico per questa serie */}
                    <p className="text-white bg-green-700 px-3 py-1 w-fit rounded text-xs font-bold uppercase tracking-widest mb-4 mx-auto lg:mx-0 shadow-[0_0_15px_rgba(21,128,61,0.5)]">
                        Locally Sourced
                    </p>
                    
                    <h1 className="text-5xl md:text-7xl font-fatboy text-white mb-6">
                        Khmer <span className="text-primary">Ingredients</span>
                    </h1>
                    
                    <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
                        A tribute to the land that hosts us. We combine traditional brewing techniques with the unique flavors of Cambodia: 
                        fragrant Jasmine Rice, aromatic Lemongrass, complex Kampot Pepper, and rich Palm Sugar.
                    </p>
                </div>

                {/* GRID (Filtri nascosti) */}
                <Suspense fallback={<div className="text-white text-center py-20">Loading local brews...</div>}>
                    <BeerGrid 
                        beers={beers} 
                        hideFilters={true} // Nascondiamo i filtri perché la pagina è già una "collezione speciale"
                    />
                </Suspense>
            </div>
        </main>
    );
}