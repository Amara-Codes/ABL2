import { Suspense } from 'react'; // Importante
import MenuList from '@/components/MenuList';// Il componente che fa fetch
import SkeletonMenu from '@/components/skeletons/components/skeleton-menu';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Our Menu",
  description: "Explore our Menu at The Taproom, featuring craft beers, cocktails, probiotics, snacks, and liquors made with local Khmer ingredients in Siem Reap.",
};

export default function MenuPage() {
  return (
    <div className="h-screen">
      <Suspense fallback={<SkeletonMenu />}>
        <MenuList />
      </Suspense>
    </div>
  );
}