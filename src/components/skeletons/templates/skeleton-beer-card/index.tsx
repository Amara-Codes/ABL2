export default function SkeletonBeerCard() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 animate-pulse">
      {/* 1. Image Placeholder - Aspect Square come l'originale */}
      <div className="aspect-square w-full bg-gray-800" />

      {/* 2. Content Placeholder */}
      <div className="p-4 space-y-3">
        {/* Category badge simulato */}
        <div className="h-3 bg-gray-800 rounded w-1/3" />
        
        {/* Title simulato (leggermente più grande) */}
        <div className="h-6 bg-gray-700 rounded w-3/4" />
      </div>
    </div>
  );
}