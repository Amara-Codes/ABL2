"use client";

import { useState, useMemo } from "react";
import BeerCard from "@/components/BeerCard";
import { Filter, ArrowUpDown, X, Check, Leaf } from "lucide-react";

// --- TIPI ---
// Rendiamo Category e Drop opzionali o gestiti esternamente se siamo in una pagina specifica
type Category = { id: number; attributes: { name: string } };
type Drop = { id: number; attributes: { name: string } };
type Beer = {
  id: number;
  attributes: {
    name: string;
    abv: number;
    createdAt: string;
    category: { data: Category };
    drop: { data: Drop | null };
    label: { data: { attributes: { url: string } } };
    rendering: { data: { attributes: { url: string } } };
    isKhmerIngredients: boolean;
  };
};

type Props = {
  beers: Beer[];
  categories?: Category[]; // Ora opzionale
  drops?: Drop[];          // Ora opzionale
  hideFilters?: boolean;   // NUOVA PROP
};

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

export default function BeerGrid({ 
    beers = [], 
    categories = [], 
    drops = [], 
    hideFilters = false // Default a false (mostra filtri)
}: Props) {
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  
  const [activeFilter, setActiveFilter] = useState<{
    type: "all" | "category" | "drop" | "khmer";
    id: number | null;
  }>({ type: "all", id: null });

  // --- LOGICA ---
  const filteredAndSortedBeers = useMemo(() => {
    if (!beers || !Array.isArray(beers)) return [];

    let result = [...beers];

    // Se i filtri sono nascosti, assumiamo che i dati arrivino già filtrati dal server
    // Applichiamo i filtri client solo se hideFilters è false
    if (!hideFilters) {
        if (activeFilter.type === "category" && activeFilter.id) {
            result = result.filter((b) => b.attributes.category?.data?.id === activeFilter.id);
        } else if (activeFilter.type === "drop" && activeFilter.id) {
            result = result.filter((b) => b.attributes.drop?.data?.id === activeFilter.id);
        } else if (activeFilter.type === "khmer") {
            result = result.filter((b) => b.attributes.isKhmerIngredients === true);
        }
    }

    // L'ordinamento rimane sempre utile
    result.sort((a, b) => {
      const dateA = a.attributes.createdAt ? new Date(a.attributes.createdAt).getTime() : 0;
      const dateB = b.attributes.createdAt ? new Date(b.attributes.createdAt).getTime() : 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [beers, activeFilter, sortOrder, hideFilters]);

  const handleFilterSelect = (type: "category" | "drop" | "khmer", id: number | null) => {
    if (activeFilter.type === type && activeFilter.id === id) {
        setActiveFilter({ type: "all", id: null });
    } else {
        setActiveFilter({ type, id });
    }
  };

  return (
    <div>
      {/* --- TOP BAR --- */}
      <div className={`flex justify-between items-center mb-8 sticky top-4 z-30 bg-black/80 backdrop-blur-md p-4 rounded-xl   ${hideFilters ? '' : 'border border-gray-800 shadow-lg'}`}>
        
        {/* Nascondiamo il bottone Filtri se hideFilters è true */}
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
            // Placeholder vuoto per mantenere allineamento Sort a destra
            <div />
        )}

        {/* Sort rimane sempre visibile */}
        <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs uppercase hidden sm:inline">Sort by</span>
            <div className="relative">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                    className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer appearance-none pr-8 text-center"
                >
                    <option value="newest" className="bg-gray-800 p-4">Newest</option>
                    <option value="oldest" className="bg-gray-800">Oldest</option>
                </select>
                <ArrowUpDown className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
      </div>

      {/* --- FILTER MODAL (Renderizzato solo se !hideFilters) --- */}
      {!hideFilters && isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* ... (Codice Modale invariato, tanto non viene renderizzato se hideFilters=true) ... */}
             <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsFilterOpen(false)}
            />
            {/* Copia pure il contenuto del modale dal codice precedente qui dentro */}
            {/* Per brevità, immagina che qui ci sia tutto il blocco del modale */}
             <div className="relative bg-gray-900 w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-800/50">
                    <h2 className="text-xl font-fatboy text-white">Filter Beers</h2>
                    <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {/* ... Contenuto filtri ... */}
                <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                    {/* ... Special, Categories, Drops ... */}
                    {/* Assicurati di includere tutto il contenuto del modale che avevi prima */}
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
                    {/* ... Categories Loop ... */}
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
                     {/* ... Drops Loop ... */}
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
                {/* ... Footer ... */}
                 <div className="p-4 bg-gray-950 flex justify-between items-center gap-4">
                    <button 
                        onClick={() => setActiveFilter({ type: 'all', id: null })}
                        className="text-gray-400 text-sm hover:text-white underline px-4"
                    >
                        Reset All
                    </button>
                    <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="bg-secondary text-black font-fatboy px-8 py-3 rounded-lg hover:bg-secondary/80 transition-colors w-full sm:w-auto"
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
                 // Logica immagine invariata
                 const renderingUrl = beer.attributes.rendering?.data?.attributes?.url;
                 const fullImageUrl = renderingUrl 
                    ? (renderingUrl.startsWith("http") ? renderingUrl : `${STRAPI_URL}${renderingUrl}`)
                    : "/labels/placeholder.png";

                return (
                    <BeerCard
                        key={beer.id}
                        id={beer.id}
                        name={beer.attributes.name}
                        category={beer.attributes.category?.data?.attributes?.name || "Uncategorized"}
                        abv={beer.attributes.abv}
                        imageUrl={fullImageUrl}
                        slug={beer.attributes.name}
                        isKhmer={beer.attributes.isKhmerIngredients}
                    />
                );
            })}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
            <p className="text-xl text-gray-400 font-fatboy mb-2">No beers found</p>
        </div>
      )}
    </div>
  );
}