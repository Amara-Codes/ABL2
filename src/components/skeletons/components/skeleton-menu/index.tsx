export default function SkeletonMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Creiamo 4 box finti per simulare le categorie */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-800/50 p-6 rounded-lg animate-pulse">
          {/* Titolo finto */}
          <div className="h-6 bg-gray-600 rounded w-1/3 mb-4"></div>
          
          {/* Prodotti finti */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}