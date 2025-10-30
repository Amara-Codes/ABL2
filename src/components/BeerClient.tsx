// components/BeerDetailsClient.tsx

"use client";

// MODIFICA 1: Importa 'View' e 'PerspectiveCamera'. Rimuovi 'Canvas'.
import { View, OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three'
import BackButton from "@/components/BackButton";
import { AnimatedBeerCan } from "@/components/3d/AnimatedBeerCan";

// Importa il carosello e i tipi necessari
import Carousel from "@/components/content/Carousel";
import type { CarouselSlideContent } from "@/types";

// ... (il tuo tipo BeerApiResponse è corretto e non cambia)
type BeerApiResponse = {
    id: number;
    attributes: {
        name: string;
        description: string;
        hops: string;
        specialIngredients: string;
        abv: number;
        label: {
            data: { attributes: { url: string; }; };
        };
        category: {
            data: { attributes: { name: string; }; }
        };
        drop: {
            data: {
                id: number;
            };
        };
    };
};

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";
const PLACEHOLDER_IMAGE = '/labels/placeholder.png';

export default function BeerClient({ beer }: { beer: BeerApiResponse }) {
    const labelUrl = beer.attributes.label?.data?.attributes?.url || PLACEHOLDER_IMAGE;
    const fullImageUrl = labelUrl.startsWith("http") ? labelUrl : `${STRAPI_URL}${labelUrl}`;

    const dropId = beer.attributes.drop?.data?.id;
    const CarouselContent: CarouselSlideContent = {
        content: {
            title: [
                {
                    type: "heading1",
                    text: "The other beers of this drop",
                    direction: "ltr",
                }
            ],
        }
    }

    return (
        <>
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

                        {/* MODIFICA 2: 
                          Sostituiamo il <div wrapper> e il <Canvas> con un singolo <View>.
                          Questo <View> si aggancerà al Canvas globale del tuo layout.
                        */}
                        <View
                            className="h-[50vh] w-full mt-12" // Manteniamo le tue classi
                            style={{ touchAction: 'pan-y' }} // Manteniamo il fix per lo scroll
                        >
                            {/* MODIFICA 3: <View> richiede una sua Camera */}
                            <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={50} />

                            <AnimatedBeerCan
                                imageUrl={fullImageUrl}
                                isHovered={true}
                            />
                            <OrbitControls
                                makeDefault // <-- Importante per <View>
                                enablePan={false}
                                // MODIFICA 4: enableZoom DEVE essere true per DOLLY_ROTATE
                                enableZoom={false}
                                enableRotate={true}
                                touches={{
                                    // MODIFICA 5: Rimuovi 'ONE:' per permettere lo scroll
                                    TWO: THREE.TOUCH.DOLLY_ROTATE
                                }}
                                autoRotate
                                autoRotateSpeed={2.5} />
                            <Environment preset="warehouse" />

                            <directionalLight intensity={1} position={[3, 1, 1]} />
                        </View>
                        {/* Fine della <View> */}

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

            {/* Il carosello qui sotto usa già <View>, quindi è corretto */}
            {dropId && (
                <section className="py-16">
                    <Carousel content={CarouselContent.content} dropId={dropId} />
                </section>
            )}
        </>
    );
}