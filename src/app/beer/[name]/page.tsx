"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import { AnimatedBeerCan } from "@/components/AnimatedBeerCan"; // Assicurati che il percorso sia corretto

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// Define a type for the structure of a single beer from your API
// This helps with type safety and auto-completion
type BeerApiResponse = {
    id: number;
    attributes: {
        name: string;
        description: string;
        hops: string;
        specialIngredients: string;
        abv: number;
        // Add other fields you might have, like abv, hops, etc.
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

export default function BeerPage({ params }: { params: { name: string } }) {
    // State to hold the fetched beer data
    const [beer, setBeer] = useState<BeerApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // We only run this if beername is available in the params
        if (params.name) {
            const fetchBeerData = async () => {
                // 1. Convert the URL slug back into a searchable name
                // "jungle-bloom" -> "jungle bloom"
                // NOTE: This assumes your Strapi query is case-insensitive.
                // If not, you may need a more complex function to restore capitalization.
                const formattedName = params.name.replace(/-/g, " ");

                try {
                    // 2. Build the Strapi query with a filter
                    const response = await fetch(
                        `${STRAPI_URL}/api/beers?filters[name][$eqi]=${formattedName}&populate=*`
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch data from the server.");
                    }

                    const data = await response.json();

                    // 3. Check if a beer was found and set the state
                    if (data.data && data.data.length > 0) {
                        setBeer(data.data[0]); // Strapi returns an array, we take the first result
                    } else {
                        setError(`No beer found with the name "${formattedName}".`);
                    }
                } catch (err) {
                    console.error(err);
                    setError("An error occurred while fetching the beer data.");
                }
            };

            fetchBeerData();
        }
    }, [params.name]); // Re-run the effect if the beername changes

    // --- Render logic ---

    if (error) {
        return (
            <div className="h-screen bg-gray-900 text-white flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500">Error</h1>
                    <p className="mt-2 text-lg">{error}</p>
                </div>
            </div>
        );
    }

    if (!beer) {
        return (
            <div className="h-screen bg-gray-900 text-white flex justify-center items-center">
                <p className="text-xl">Loading Beer...</p>
            </div>
        );
    }

    // Extract the image URL once the data is available
    const labelUrl = beer.attributes.label?.data?.attributes?.url || "";
    const fullImageUrl = labelUrl.startsWith("http") ? labelUrl : `${STRAPI_URL}${labelUrl}`;

    return (
        <main className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <h1 className="text-5xl font-bold font-fatboy text-center">
                       <span className="text-secondary"> {beer.attributes.name} - </span>
                        <span className="text-secondary">ABV: {beer.attributes.abv}%</span>
                    </h1>
                    <p className="px-8 py-4 h-fit flex items-center rounded-md bg-primary/10 font-medium text-primary hover:bg-secondary/10 hover:text-secondary hover:ring-2 hover:ring-secondary transition-all duration-500">{beer.attributes.category.data.attributes.name}</p>
                </div>
                <div className="flex">

                    <div className="h-[50vh] w-full my-8">
                        <Canvas shadows camera={{ position: [0, 0, 3.5], fov: 50 }}>
                            <ambientLight intensity={0.7} />
                            <directionalLight position={[5, 5, 5]} intensity={1.5} />
                            <AnimatedBeerCan
                                imageUrl={fullImageUrl}
                                // Set isHovered to true so it's always in the "active" animated state
                                isHovered={true}
                            />
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
                            <Environment preset="city" />
                        </Canvas>
                    </div>
                    <div className="mt-12 w-full">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold mb-4">Description</h2>
                            <div className="bg-gray-800 p-4 rounded-lg w-full">
                                <span className="text-xl">{beer.attributes.description}</span>
                            </div>
                        </div>
                        {beer.attributes.hops && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold mb-4">Hops</h2>
                                <div className="bg-gray-800 p-4 rounded-lg w-full">
                                    <span className="text-xl">{beer.attributes.hops}</span>
                                </div>
                            </div>
                        )}
                        {beer.attributes.specialIngredients && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold mb-4">Special Ingredients</h2>
                                <div className="bg-gray-800 p-4 rounded-lg w-full">
                                    <span className="text-xl">{beer.attributes.specialIngredients}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </main>
    );
}