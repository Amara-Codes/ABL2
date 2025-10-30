// src/app/beers/page.tsx

import { Suspense } from "react";
import type { Metadata } from "next";
import type { DropData } from "@/types"; // Adjust path if needed
import BeersClient from "@/components/BeersClient"; // Your new client component
import type { BeerData } from "@/types"; // Adjust path if needed
// ============================================================================
// Server-Side Data Fetching
// ============================================================================
const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

async function fetchDrops(): Promise<DropData[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/drops?sort=createdAt:desc&pagination[limit]=5&populate[beers][populate]=label`,
      {
        // Use 'no-store' for fresh data on every request, 
        // or 'revalidate' for ISR
        cache: 'no-store'
      }
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    // Format the data right here on the server
    const formattedDrops: DropData[] = data.data.map((drop: any) => {
      const beerList = drop.attributes.beers.data || [];
      const formattedBeers: BeerData[] = beerList.map((beer: any) => {
        const labelUrl = beer.attributes?.label?.data?.attributes?.url || "";
        const finalUrl = labelUrl.startsWith("http")
          ? labelUrl
          : `${STRAPI_URL}${labelUrl}`;
        return { id: beer.id, imageUrl: finalUrl, name: beer.attributes.name };
      });
      return {
        id: drop.id,
        name: drop.attributes.name,
        description: drop.attributes.description,
        beers: formattedBeers,
      };
    });
    return formattedDrops;

  } catch (error) {
    console.error("Failed to fetch drops:", error);
    return []; // Return an empty array on error
  }
}

// ============================================================================
// Metadata (Now possible in a Server Component)
// ============================================================================
export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Our Craft Beers",
  description: "Discover the latest Amara Beer Lab releases, the craft brewery in Siem Reap, dedicated to sustainability and community impact through high-quality craft beers.",
};

// ============================================================================
// The Page Component (Server)
// ============================================================================
export default async function BeersPage() {
  // Fetch data directly on the server
  const drops = await fetchDrops();

  return (
    <div className="h-screen w-screen">
      {/* Use Suspense for a loading fallback while the client 
          component and its 3D assets load. 
      */}
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center text-primary">Loading 3D Scene...</div>}>
        {/* Pass the server-fetched data as props to the Client Component */}
        <BeersClient drops={drops} />
      </Suspense>
    </div>
  );
}