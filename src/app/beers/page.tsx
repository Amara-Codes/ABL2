"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Environment } from "@react-three/drei";
import { Group } from "three";

import BeerShowcase from "@/components/BeerShowCase";
import type { DropData } from "@/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// ============================================================================
// A new component to hold the 3D content that reacts to scrolling
// ============================================================================
function SceneContent({ drops }: { drops: DropData[] }) {
  const groupRef = useRef<Group>(null!);
  const scroll = useScroll(); // This hook gives us the scroll progress
  const sectionHeight = 8; // The height of each drop section in 3D units
  const totalContentHeight = (drops.length - 1) * sectionHeight;

  useFrame(() => {
    // This runs every frame and updates the 3D content's position
    // based on how far the user has scrolled.
    if (groupRef.current) {
      // scroll.offset goes from 0 (top) to 1 (bottom)
      groupRef.current.position.y = scroll.offset * totalContentHeight;
    }
  });

  return (
    // This group contains all the drops and moves up/down as we scroll
    <group ref={groupRef}>
      {drops.map((drop, index) => (
        <group key={drop.id} position={[0, -index * sectionHeight, 0]}>
          {/* Position the beer showcase lower than the text */}
          <group position={[0, -1, 0]}>
            <BeerShowcase beers={drop.beers} />
          </group>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// Your main page component, now correctly structured
// ============================================================================
export default function MenuPage() {
  const [drops, setDrops] = useState<DropData[]>([]);

  // The data fetching logic remains the same
  useEffect(() => {
    const fetchDrops = async () => {
      try {
        const response = await fetch(
          `${STRAPI_URL}/api/drops?sort=createdAt:desc&pagination[limit]=5&populate[beers][populate]=label`
        );
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const formattedDrops = data.data.map((drop: any) => {
            const beerList = drop.attributes.beers.data || [];
            const formattedBeers = beerList.map((beer: any) => {
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
          setDrops(formattedDrops);
        }
      } catch (error) {
        console.error("Failed to fetch drops:", error);
      }
    };
    fetchDrops();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900">
      {/* ✅ 1. Use ONLY ONE Canvas for the whole page */}
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={1.5} castShadow />

        {/* ✅ 2. Wrap everything in ScrollControls */}
        {/* 'pages' is the number of "screens" the content will occupy */}
        <ScrollControls pages={drops.length} damping={0.2}>
          
          {/* 3D content goes here, it will be fixed and scroll-driven */}
          <SceneContent drops={drops} />

          {/* ✅ 3. HTML content goes inside a <Scroll html> component */}
          {/* This part will scroll like a normal webpage */}
          <Scroll html style={{ width: '100%' }}>
            {drops.map((drop, index) => (
              <section
                key={drop.id}
                className="h-screen flex justify-center items-center pt-48"
              >
                <div className="max-w-4xl w-lg mx-auto p-4 text-center bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                  <h2 className="text-4xl font-bold text-primary">
                    <span className="">Drop {index + 1}: </span>
                    <span className="ps-4 font-fatboy">{drop.name}</span>
                  </h2>
                  <p className="text-lg text-white mt-4">{drop.description}</p>
                </div>
              </section>
            ))}
          </Scroll>

        </ScrollControls>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}