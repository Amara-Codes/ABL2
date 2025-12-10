"use client";

import { useState, useMemo } from "react";
import BeerCard from "@/components/BeerCard"; // Assicurati che il path sia corretto
import { Filter, ArrowUpDown, X, Check, Leaf } from "lucide-react";
import { BeerApiResponse } from "@/types";
// --- TIPI ---
type Category = BeerApiResponse["attributes"]["category"]["data"];
type Drop = BeerApiResponse["attributes"]["drop"]["data"];



type Props = {
  beers:  BeerApiResponse[];
  categories?: Category[];
  drops?: Drop[];
  hideFilters?: boolean; // Se true, nasconde il bottone filtri ma mantiene il sort
};

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

export default function BeerGrid({ 
    beers = [], 
    categories = [], 
    drops = [], 
    hideFilters = false 
}: Props) {
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  
  const [activeFilter, setActiveFilter] = useState<{
    type: "all" | "category" | "drop" | "khmer";
    id: number | null;
  }>({ type: "all", id: null });

  // --- LOGICA MEMOIZZATA ---
  const filteredAndSortedBeers = useMemo(() => {
    if (!beers || !Array.isArray(beers)) return [];

    let result = [...beers];

    // 1. FILTRAGGIO
    // Applichiamo i filtri client solo se NON sono nascosti.
    // Se hideFilters è true, assumiamo che il parent component abbia già passato i dati giusti.
    if (!hideFilters) {
        if (activeFilter.type === "category" && activeFilter.id) {
            result = result.filter((b) => b.attributes.category?.data?.id === activeFilter.id);
        } else if (activeFilter.type === "drop" && activeFilter.id) {
            result = result.filter((b) => b.attributes.drop?.data?.id === activeFilter.id);
        } else if (activeFilter.type === "khmer") {
            result = result.filter((b) => b.attributes.isKhmerIngredients === true);
        }
    }

    // 2. ORDINAMENTO (Funziona sempre, anche con hideFilters=true)
    result.sort((a, b) => {
      const dateA = a.attributes.createdAt ? new Date(a.attributes.createdAt).getTime() : 0;
      const dateB = b.attributes.createdAt ? new Date(b.attributes.createdAt).getTime() : 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [beers, activeFilter, sortOrder, hideFilters]);

  // Gestione click filtri
  const handleFilterSelect = (type: "category" | "drop" | "khmer", id: number | null) => {
    // Toggle: se clicco sullo stesso filtro attivo, lo resetto
    if (activeFilter.type === type && activeFilter.id === id) {
        setActiveFilter({ type: "all", id: null });
    } else {
        setActiveFilter({ type, id });
    }
  };

  return (
    <div className="w-full">
      {/* --- TOP BAR --- */}
      <div className={`flex justify-between items-center mb-8 sticky top-4 z-30 bg-black/80 backdrop-blur-md p-4 rounded-xl ${!hideFilters ? 'border border-gray-800 shadow-lg' : ''}`}>
        
        {/* Sinistra: Bottone Filtri (Visibile solo se !hideFilters) */}
        {!hideFilters ? (
            <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all border border-transparent hover:border-secondary group"
            >
                <Filter className="w-5 h-5 text-secondary group-hover:animate-pulse" />
                <span className="font-bold text-sm tracking-wide">
                    FILTERS {activeFilter.type !== 'all' && <span className="ml-1 text-secondary">•</span>}
                </span>
            </button>
        ) : (
            // Div vuoto per mantenere il Sort a destra (Flexbox space-between)
            <div />
        )}

        {/* Destra: Sort (Sempre visibile) */}
        <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase hidden sm:inline">Sort by</span>
            <div className="relative">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                    className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer appearance-none pr-8 text-right sm:text-center"
                >
                    <option value="newest" className="bg-gray-900">Newest</option>
                    <option value="oldest" className="bg-gray-900">Oldest</option>
                </select>
                <ArrowUpDown className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
      </div>

      {/* --- FILTER MODAL (Solo se !hideFilters) --- */}
      {!hideFilters && isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
             <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsFilterOpen(false)}
            />
            
            {/* Modal Content */}
             <div className="relative bg-gray-900 w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-800/50">
                    <h2 className="text-xl font-fatboy text-white">Filter Beers</h2>
                    <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    
                    {/* 1. Special Collections */}
                    <div>
                        <h3 className="text-secondary text-xs font-bold uppercase tracking-wider mb-3">Special Collections</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleFilterSelect('khmer', null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
                                    activeFilter.type === 'khmer'
                                    ? "bg-green-600 text-white border-green-500"
                                    : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500"
                                }`}
                            >
                                <Leaf className="w-4 h-4" />
                                Khmer Ingredients
                                {activeFilter.type === 'khmer' && <Check className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* 2. By Style (Categories) */}
                    {categories && categories.length > 0 && (
                        <div>
                            <h3 className="text-secondary text-xs font-bold uppercase tracking-wider mb-3">By Style</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleFilterSelect('category', cat.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
                                            activeFilter.type === 'category' && activeFilter.id === cat.id
                                            ? "bg-secondary text-black border-secondary" 
                                            : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500"
                                        }`}
                                    >
                                        {cat.attributes.name}
                                        {activeFilter.type === 'category' && activeFilter.id === cat.id && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 3. By Drop */}
                    {drops && drops.length > 0 && (
                        <div>
                            <h3 className="text-secondary text-xs font-bold uppercase tracking-wider mb-3">By Drop</h3>
                            <div className="flex flex-wrap gap-2">
                                {drops.map((drop) => (
                                    <button
                                        key={drop.id}
                                        onClick={() => handleFilterSelect('drop', drop.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
                                            activeFilter.type === 'drop' && activeFilter.id === drop.id
                                            ? "bg-white text-black border-white" 
                                            : "bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500"
                                        }`}
                                    >
                                        {drop.attributes.name}
                                        {activeFilter.type === 'drop' && activeFilter.id === drop.id && <Check className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                 <div className="p-4 bg-gray-950 flex justify-between items-center gap-4 border-t border-gray-800">
                    <button 
                        onClick={() => setActiveFilter({ type: 'all', id: null })}
                        className="text-gray-400 text-sm hover:text-white underline px-4"
                    >
                        Reset All
                    </button>
                    <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="bg-secondary text-black font-fatboy px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors w-full sm:w-auto"
                    >
                        Show Results ({filteredAndSortedBeers.length})
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- GRID RISULTATI --- */}
      {filteredAndSortedBeers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedBeers.map((beer) => {
                // Priorità Rendering > Label > Placeholder
                // Nota: In Strapi spesso label/rendering possono essere null o undefined se non popolati
                const renderingUrl = beer.attributes.rendering?.data?.attributes?.url;
                const labelUrl = beer.attributes.label?.data?.attributes?.url;
                const finalUrl = renderingUrl || labelUrl;

                const fullImageUrl = finalUrl 
                    ? (finalUrl.startsWith("http") ? finalUrl : `${STRAPI_URL}${finalUrl}`)
                    : "/images/placeholder-rendering.png"; // Assicurati di avere questa immagine in public/

                return (
                    <BeerCard
                        key={beer.id}
                        id={beer.id}
                        name={beer.attributes.name}
                        category={beer.attributes.category?.data?.attributes?.name || "Special"}
                        abv={beer.attributes.abv}
                        imageUrl={fullImageUrl}
                        // Uso lo slug se c'è, altrimenti fallback sul nome pulito
                        slug={beer.attributes.name.replace(/\s+/g, '-').toLowerCase()} 
                        isKhmer={beer.attributes.isKhmerIngredients}
                    />
                );
            })}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-20 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
            <p className="text-xl text-gray-400 font-fatboy mb-2">No beers found</p>
            {!hideFilters && (
                <button 
                    onClick={() => setActiveFilter({ type: 'all', id: null })}
                    className="text-secondary text-sm hover:underline"
                >
                    Clear filters
                </button>
            )}
        </div>
      )}
    </div>
  );
}