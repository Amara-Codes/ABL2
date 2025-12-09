import SkeletonBeerCard from "../skeleton-beer-card";

export default function BeerGridSkeleton() {
  return (
    <div>
      {/* --- TOP BAR SKELETON (Filtri e Sort) --- */}
      <div className="flex justify-between items-center mb-8 sticky top-4 z-30 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-800">
        
        {/* Filter Button Placeholder */}
        <div className="h-10 w-32 bg-gray-800 rounded-lg animate-pulse" />

        {/* Sort Placeholder */}
        <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-gray-800 rounded animate-pulse hidden sm:block" />
            <div className="h-8 w-24 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* --- GRID SKELETON --- */}
      {/* Deve avere le stesse classi grid del componente reale: sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Generiamo un array di 8 card fittizie per riempire lo schermo */}
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBeerCard key={i} />
        ))}
      </div>
    </div>
  );
}