// components/BeerDetailsClient.tsx

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import BackButton from "@/components/BackButton";
import { AnimatedBeerCan } from "@/components/3d/AnimatedBeerCan";

// Define the type for the `beer` prop to maintain type safety
type BeerApiResponse = {
    // ...copy the exact same type definition you used in page.tsx
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

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";
const PLACEHOLDER_IMAGE = '/labels/placeholder.png';

export default function BeerClient({ beer }: { beer: BeerApiResponse }) {
    // No more useState or useEffect for data fetching!
    // The beer data is passed directly via props.

    const labelUrl = beer.attributes.label?.data?.attributes?.url || PLACEHOLDER_IMAGE;
    const fullImageUrl = labelUrl.startsWith("http") ? labelUrl : `${STRAPI_URL}${labelUrl}`;

    return (
        <main className="min-h-screen text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-y-4 justify-between lg:items-center lg:mb-16">
                    <div className="hidden lg:block">

                        <BackButton destination='/beers' />
                    </div>
                    <h1 className="text-5xl my-8 lg:my-0 font-bold font-fatboy text-center grow">
                        <span className="text-secondary"> {beer.attributes?.name || "Unknown Beer"} - </span>
                        <span className="text-secondary">ABV: {beer.attributes?.abv || 0}%</span>
                    </h1>
                    <p className="px-8 py-4 h-fit w-fit mx-auto hidden lg:flex items-center rounded-md bg-primary/10 font-medium text-primary hover:bg-secondary/10 hover:text-secondary hover:ring-2 hover:ring-secondary transition-all duration-500">{beer.attributes?.category?.data?.attributes?.name || "Unknown Category"}</p>
                </div>
                <div className="flex flex-col lg:flex-row">
                    <div className="h-[50vh] w-full my-8">
                        <Canvas shadows camera={{ position: [0, 0, 3.5], fov: 50 }}>
                            <AnimatedBeerCan
                                imageUrl={fullImageUrl}
                                isHovered={true}
                            />
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.5} />
                            <Environment preset="warehouse" />

                            <directionalLight intensity={1} position={[3, 1, 1]} />
                        </Canvas>
                    </div>
                    <div className="mt-12 w-full">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold mb-4">Description</h2>
                            <div className="bg-gray-800 p-4 rounded-lg w-full">
                                <span className="text-xl">{beer.attributes?.description || "No description available."}</span>
                            </div>
                        </div>
                        {beer.attributes?.hops && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold mb-4">Hops</h2>
                                <div className="bg-gray-800 p-4 rounded-lg w-full">
                                    <span className="text-xl">{beer.attributes.hops}</span>
                                </div>
                            </div>
                        )}
                        {beer.attributes?.specialIngredients && (
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