import { Suspense } from "react";
import type { Metadata } from "next"; // ✅ 1. Importiamo i tipi per i metadata
import BeerGrid from "@/components/BeerGrid";
import BeerGridSkeleton from "@/components/skeletons/templates/skeleton-beer-grid";

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// --- FETCH HELPER ---
async function getDropData(name: string) {
    const searchName = name.replace(/-/g, ' ');
    // Query specifica per i Drops
    const url = `${STRAPI_URL}/api/drops?filters[name][$eqi]=${searchName}&populate[beers][populate]=*`;
    
    // La cache 'no-store' garantisce dati freschi, ma Next.js deduplica la richiesta
    // all'interno della stessa render pass (Metadata + Page)
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.data.length > 0 ? json.data[0] : null;
}

// Definiamo il tipo per le Props per pulizia
type Props = {
    params: { name: string }
};

// --- ✅ 2. GENERATE METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const drop = await getDropData(params.name);

    if (!drop) {
        return {
            title: "Drop Not Found | Craft Beer Brewery in Siem Reap - Amara Beer Lab",
            description: "The limited release drop you are looking for does not exist.",
        };
    }

    const { name, description } = drop.attributes;

    return {
        title: `${name} - Limited Release | Craft Beer Brewery in Siem Reap - Amara Beer Lab`,
        description: description || `Discover ${name}, a limited edition craft beer drop by Amara Beer Lab in Siem Reap.`,
        openGraph: {
            title: `${name} | Limited Drop by Amara Beer Lab, Craft Brewery in Siem Reap`,
            description: description || `Don't miss out on ${name}, our latest limited release.`,
            url: `/beers/drop/${params.name}`,
            siteName: 'Amara Beer Lab',
            locale: 'en_US',
            type: 'website',
            // Se il drop avesse un'immagine di copertina specifica, potremmo aggiungerla qui
        },
    };
}

// --- PAGE COMPONENT ---
export default async function DropPage({ params }: Props) {
    const drop = await getDropData(params.name);

    if (!drop) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-fatboy text-red-500 mb-2">Drop Not Found</h1>
                    <p className="text-gray-400">This limited release seems to have vanished.</p>
                </div>
            </div>
        );
    }

    const { name, description, beers } = drop.attributes;
    const beerList = beers?.data || [];

    return (
        <main className="min-h-screen bg-black text-white p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">


                {/* HEADER DROP */}
                <div className="mb-12 text-center lg:text-left border-b border-gray-800 pb-8">
                    <p className="text-white bg-red-600 px-3 py-1 w-fit rounded text-xs font-bold uppercase tracking-widest mb-4 mx-auto lg:mx-0 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                        Limited Release
                    </p>
                    <h1 className="text-5xl md:text-7xl font-fatboy text-secondary mb-6">
                        {name}
                    </h1>
                    <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
                        {description || "A limited edition drop from Amara Beer Lab. Once it's gone, it's gone."}
                    </p>
                </div>

                {/* GRID (Filtri nascosti) */}
                <Suspense fallback={<BeerGridSkeleton />}>
                    <BeerGrid 
                        beers={beerList} 
                        hideFilters={true} 
                    />
                </Suspense>
            </div>
        </main>
    );
}