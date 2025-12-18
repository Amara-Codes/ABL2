export default function SkeletonMenu() {
  return (
    <div className="min-h-screen lg:h-screen bg-cream/90 p-4 overflow-hidden">
      {/* Contenitore che segue la stessa logica responsive del layout reale */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:grid-rows-5 h-auto lg:h-full">
        
        {/* 1. BEER Skeleton (lg:col-span-2 lg:row-span-3) */}
        <div className="h-[600px] lg:h-auto lg:col-span-2 lg:row-span-3 bg-gray-800/80 rounded-md p-4 animate-pulse">
          <div className="flex h-full gap-6">
            {/* Simulazione Titolo Verticale */}
            <div className="w-12 h-48 bg-gray-600 rounded"></div>
            {/* Simulazione Lista */}
            <div className="flex-1 space-y-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="border-b border-white/10 pb-4">
                  <div className="flex justify-between mb-2">
                    <div className="h-8 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-8 bg-amber-400/30 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. LIQUORS Skeleton (lg:row-span-2) */}
        <div className="h-[400px] lg:h-auto lg:row-span-2 bg-gray-700/80 rounded-md p-4 animate-pulse">
          <div className="h-6 bg-gray-500 rounded w-1/2 mx-auto mb-6"></div>
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-10 bg-gray-600/50 rounded w-full"></div>
            ))}
          </div>
        </div>

        {/* 4. SNACKS Skeleton (lg:row-span-3) - Tema Chiaro */}
        <div className="h-[500px] lg:h-auto lg:row-span-3 bg-white/80 rounded-md p-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-8 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>

        {/* 5. COCKTAILS Skeleton (lg:col-span-2 lg:row-span-2) */}
        <div className="h-[500px] lg:h-auto lg:col-span-2 lg:row-span-2 bg-gray-600/80 rounded-md p-4 animate-pulse">
          <div className="h-8 bg-gray-500 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 gap-4">
             {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-12 bg-gray-500/50 rounded w-full"></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}