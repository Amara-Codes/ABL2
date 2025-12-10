import { Suspense } from "react";
import type { Metadata } from "next"; // ✅ 1. Importiamo i tipi
import BeerGrid from "@/components/BeerGrid";
import BeerGridSkeleton from "@/components/skeletons/templates/skeleton-beer-grid";

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// --- FETCH HELPER ---
// Questa funzione verrà riutilizzata sia dai Metadata che dalla Pagina
async function getCategoryData(name: string) {
    const searchName = name.replace(/-/g, ' ');

    const url = `${STRAPI_URL}/api/categories?filters[name][$eqi]=${searchName}&populate[beers][populate]=*`;
    
    // Nota: Next.js deduplica automaticamente questa richiesta se chiamata due volte nello stesso render
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.data.length > 0 ? json.data[0] : null;
}

// --- ✅ 2. GENERATE METADATA ---
type Props = {
    params: { name: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Recuperiamo i dati (Next.js usa la cache della richiesta, quindi non pesa sul server)
    const category = await getCategoryData(params.name);

    if (!category) {
        return {
            title: "Category Not Found | Craft Beer Brewery in Siem Reap - Amara Beer Lab",
            description: "The beer category you are looking for does not exist.",
        };
    }

    const { name, description } = category.attributes;

    return {
        // Titolo dinamico: es. "IPA | Amara Beer Lab"
        title: `${name} | Craft Beer Brewery in Siem Reap - Amara Beer Lab`,
        // Descrizione dinamica per Google
        description: description || `Discover our ${name} craft beers, brewed in Siem Reap using high quality ingredients.`,
        // Open Graph per social media (Facebook, WhatsApp, LinkedIn)
        openGraph: {
            title: `${name} - Craft Beers by Amara Beer Lab, Craft Brewery in Siem Reap`,
            description: description || `Explore our selection of ${name}.`,
            url: `/beers/category/${params.name}`,
            siteName: 'Amara Beer Lab',
            locale: 'en_US',
            type: 'website',
        },
    };
}

// --- PAGE COMPONENT ---
export default async function CategoryPage({ params }: Props) {
    const category = await getCategoryData(params.name);

    if (!category) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-fatboy text-secondary mb-2">Category Not Found</h1>
                    <p className="text-gray-400">We couldn&apos;t find the style you&apos;re looking for.</p>
                </div>
            </div>
        );
    }

    const { name, description, beers } = category.attributes;
    const beerList = beers?.data || [];

    return (
        <main className="min-h-screen bg-black text-white p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* HEADER CATEGORIA */}
                <div className="mb-12 text-center lg:text-left border-b border-gray-800 pb-8">
                    <p className="text-secondary text-sm font-bold uppercase tracking-widest mb-2">
                        Beer Style
                    </p>
                    <h1 className="text-5xl md:text-7xl font-fatboy text-white mb-6">
                        {name}
                    </h1>
                    <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
                        {description || "Discover our unique take on this classic style."}
                    </p>
                </div>

                {/* GRID (Filtri nascosti) */}
                <Suspense fallback={<BeerGridSkeleton />}>
                    <BeerGrid 
                        beers={beerList} 
                        hideFilters={true} // Nasconde il tasto filtri
                    />
                </Suspense>
            </div>
        </main>
    );
}