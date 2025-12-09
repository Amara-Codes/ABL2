export default function SkeletonBeerDetails() {
  return (
    <main className="min-h-screen bg-black text-white p-4 lg:p-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER SKELETON --- */}
        <div className="flex flex-col lg:flex-row gap-y-4 justify-between lg:items-center lg:mb-16">
          {/* Back Button Placeholder */}
          <div className="hidden lg:block w-24 h-10 bg-gray-800 rounded-lg" />
          
          {/* Title Placeholder */}
          <div className="h-12 w-3/4 lg:w-1/3 bg-gray-800 rounded-lg mx-auto" />
          
          {/* Category Badge Placeholder */}
          <div className="hidden lg:block w-32 h-10 bg-gray-800 rounded-lg" />
        </div>

        {/* --- CONTENT GRID SKELETON --- */}
        <div className="flex flex-col lg:flex-row mt-8 lg:mt-0">

          {/* 1. 3D VIEW PLACEHOLDER (Left/Top) */}
          <div className="h-[50vh] w-full mt-12 flex items-center justify-center relative">
             {/* Cerchio o rettangolo che simula la lattina al centro */}
             <div className="w-48 h-80 bg-gray-800 rounded-full opacity-50 blur-xl absolute" />
             <div className="w-40 h-72 bg-gray-800 rounded-2xl relative z-10" />
          </div>

          {/* 2. DESCRIPTION TEXT PLACEHOLDER (Right/Bottom) */}
          <div className="mt-12 w-full lg:pl-12 space-y-8">
            
            {/* Description Block */}
            <div>
              <div className="h-8 w-40 bg-gray-800 rounded mb-4" /> {/* Title "Description" */}
              <div className="bg-gray-900 p-6 rounded-lg w-full space-y-3 border border-gray-800">
                <div className="h-4 bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-800 rounded w-5/6" />
                <div className="h-4 bg-gray-800 rounded w-4/6" />
              </div>
            </div>

            {/* Hops Block */}
            <div>
              <div className="h-8 w-24 bg-gray-800 rounded mb-4" /> 
              <div className="bg-gray-900 p-4 rounded-lg w-full border border-gray-800">
                 <div className="h-5 bg-gray-800 rounded w-1/2" />
              </div>
            </div>

             {/* Ingredients Block */}
             <div>
              <div className="h-8 w-48 bg-gray-800 rounded mb-4" /> 
              <div className="bg-gray-900 p-4 rounded-lg w-full border border-gray-800">
                 <div className="h-5 bg-gray-800 rounded w-2/3" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}