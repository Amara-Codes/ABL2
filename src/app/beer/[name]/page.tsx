// app/beers/[name]/page.tsx

import { Metadata } from "next";
import BeerClient from "@/components/BeerClient"; 
// We will create this component shortly

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// Define the API response type (you already have this)
type BeerApiResponse = {
    id: number;
    attributes: {
        name: string;
        description: string;
        hops: string;
        specialIngredients: string;
        abv: number;
        label: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
        category: {
            data: {
                attributes: {
                    name: string;
                };
            }
        }
    };
};

const PLACEHOLDER_IMAGE = "/labels/placeholder.png";

// Helper function to fetch beer data (to avoid code duplication)
async function getBeerData(name: string): Promise<BeerApiResponse | null> {
    const formattedName = name.replace(/-/g, " ");
    try {
        const response = await fetch(
            `${STRAPI_URL}/api/beers?filters[name][$eqi]=${formattedName}&populate=*`,
            // Use caching strategy as needed. 'no-store' fetches fresh data every time.
            { cache: 'no-store' } 
            // Or use revalidation: next: { revalidate: 3600 } // Re-fetch every hour
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return (data.data && data.data.length > 0) ? data.data[0] : null;

    } catch (err) {
        console.error("Failed to fetch beer data:", err);
        return null;
    }
}



// STEP 1: DYNAMIC METADATA FUNCTION
export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
    const beer = await getBeerData(params.name);

    // Provide a fallback if the beer is not found
    if (!beer) {
        return {
            title: "Beer Not Found | Amara Beer Lab",
            description: "The beer you are looking for could not be found in our collection.",
        };
    }

    const beerName = beer.attributes.name;
    // Trim description for meta tag best practices (under 160 characters)
    const beerDescription = beer.attributes.description.substring(0, 160); 

    return {
        title: `${beerName} | Amara Beer Lab`,
        description: `${beerName} - ${beerDescription}... Discover our craft beer from Siem Reap.`,
        // You can also add Open Graph metadata for social media sharing
        openGraph: {
            title: `${beerName} | Amara Beer Lab`,
            description: beerDescription,
            images: [
                {
                    url: `${STRAPI_URL}${beer.attributes?.label?.data?.attributes?.url || PLACEHOLDER_IMAGE}`,
                    width: 800,
                    height: 600,
                    alt: `Label for ${beerName} beer`,
                },
            ],
        },
    };
}


// STEP 2: SERVER COMPONENT TO FETCH DATA
export default async function BeerPage({ params }: { params: { name: string } }) {
    const beer = await getBeerData(params.name);

    if (!beer) {
        return (
            <div className="h-screen text-white flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500">Error</h1>
                    <p className="mt-2 text-lg">Beer not found.</p>
                </div>
            </div>
        );
    }

    // STEP 3: PASS THE FETCHED DATA TO A CLIENT COMPONENT
    return <BeerClient beer={beer} />;
}