// components/BeerDetailsClient.tsx

"use client";

// ✅ 1. Aggiungiamo useState e useEffect
import { useState, useEffect } from "react";
import { View, OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from 'three';
import BackButton from "@/components/BackButton";
import { AnimatedBeerCan } from "@/components/3d/AnimatedBeerCan";

// Importa il carosello e i tipi necessari
import Carousel from "@/components/content/Carousel";
import type { CarouselSlideContent } from "@/types";

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

// ✅ 2. Hook per rilevare il Desktop (sopra il componente o in un file utils)
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Usiamo 1024px (lg) perché il tuo layout passa da colonna a riga a quel punto
    const media = window.matchMedia("(min-width: 1024px)");
    const listener = () => setIsDesktop(media.matches);
    
    listener(); // Check iniziale
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return isDesktop;
};

export default function BeerClient({ beer }: { beer: BeerApiResponse }) {
    // ✅ Logica Immagini (Preservata)
    const labelUrl = beer.attributes.label?.data?.attributes?.url || PLACEHOLDER_IMAGE;
    const fullImageUrl = labelUrl.startsWith("http") ? labelUrl : `${STRAPI_URL}${labelUrl}`;

    // ✅ Logica Carosello (Preservata)
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

    // ✅ 3. Calcolo Posizione Camera
    const isDesktop = useIsDesktop();
    // Desktop (3.5): Vicino e dettagliato
    // Mobile (6.0): Lontano per non riempire tutto lo schermo
    const cameraZ = isDesktop ? 3.5 : 4.5;

    return (
        <>
            <main className="min-h-screen text-white p-8">
                <div className="max-w-6xl mx-auto">
                    {/* HEADER */}
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

                    {/* CONTENT GRID */}
                    <div className="flex flex-col lg:flex-row">

                        {/* 3D VIEW */}
                        <View
                            className="h-[50vh] w-full mt-12 pointer-events-none lg:pointer-events-auto"
                            style={{ touchAction: 'pan-y' }}
                        >
                            {/* ✅ 4. Camera con posizione dinamica */}
                            <PerspectiveCamera 
                                makeDefault 
                                position={[0, 0, cameraZ]} 
                                fov={50} 
                            />

                            <AnimatedBeerCan
                                imageUrl={fullImageUrl}
                                isHovered={true}
                            />
                            
                            <OrbitControls
                                makeDefault
                                enablePan={false}
                                enableZoom={true}
                                enableRotate={true}
                                touches={{
                                    TWO: THREE.TOUCH.DOLLY_ROTATE
                                }}
                                autoRotate
                                autoRotateSpeed={2.5}
                            />
                            
                            <Environment path='/hdr/' files="warehouse.hdr" />
                            <directionalLight intensity={1} position={[3, 1, 1]} />
                        </View>

                        {/* DESCRIPTION TEXT */}
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

            {/* CAROUSEL */}
            {dropId && (
                <section className="py-16">
                    <Carousel content={CarouselContent.content} dropId={dropId} />
                </section>
            )}
        </>
    );
}