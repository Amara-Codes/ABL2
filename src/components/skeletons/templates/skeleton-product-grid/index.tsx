import repeat from "@/lib/util/repeat"
import SkeletonProductPreview from "@/components/skeletons/components/skeleton-product-preview"

const SkeletonProductGrid = () => {
  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-8" data-testid="products-list-loader">
      {repeat(8).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  )
}

export default SkeletonProductGrid
