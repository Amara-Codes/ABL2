// components/BeerDetailsClient.tsx

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from 'three'
import BackButton from "@/components/BackButton";
import { AnimatedBeerCan } from "@/components/3d/AnimatedBeerCan";

// <-- MODIFICA 1: Importa il carosello e i tipi necessari
import Carousel from "@/components/content/Carousel";
import type { CarouselSlideContent } from "@/types";

// <-- MODIFICA 2: Aggiorna il tipo per includere il 'drop'
// Questo DEVE CORRISPONDERE a quello che popoli nella tua page.tsx
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
        drop: { // <-- Assicurati che questo sia popolato!
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

    // <-- MODIFICA 3: Estrai il dropId e prepara il titolo per il carosello
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
        // <-- MODIFICA 4: Usiamo un Fragment per includere il nuovo carosello
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
                        <div className="h-[50vh] w-full mt-12">
                            <Canvas
                                shadows
                                camera={{ position: [0, 0, 3.5], fov: 50 }}
                                // <-- MODIFICA 5: Aggiungi questo per fixare lo scroll su mobile!
                                style={{ touchAction: 'pan-y' }}
                            >
                                <AnimatedBeerCan
                                    imageUrl={fullImageUrl}
                                    isHovered={true}
                                />
                                <OrbitControls
                                    enablePan={false}
                                    enableZoom={false}
                                    enableRotate={true}
                                    // La tua configurazione 'touches' qui permette la rotazione
                                    // con 2 dita, ma 'touch-action' (sopra) è
                                    // ciò che permette lo SCROLL della pagina con 1 dito.
                                    touches={{
                                        TWO: THREE.TOUCH.DOLLY_ROTATE
                                    }}
                                     autoRotate
                                     autoRotateSpeed={2.5} />
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

            {/* <-- MODIFICA 6: Renderizza il Carosello se abbiamo un dropId */}
            {dropId && (
                <section className="py-16">
                    <Carousel content={CarouselContent.content} dropId={dropId} />
                </section>
            )}
        </>
    );
}