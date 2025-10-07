
import repeat from "@/lib/util/repeat"

const SkeletonArticles = ({ count = 3 }) => { // Default to 8 if no count is provided
  return (
    <>
      {repeat(count).map((index) => (
        <div key={index} className="border rounded-lg shadow-md p-4 mb-6 flex animate-pulse"> 
          <div className="aspect-[4/5] w-full bg-gray-100" />
          <div className="flex justify-between text-base-regular mt-2">
            <div className="w-2/5 h-6 bg-gray-100"></div>
            <div className="w-1/5 h-6 bg-gray-100"></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonArticles;
