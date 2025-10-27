// src/components/3d/BeerShowcase.tsx

"use client";

import { useState } from "react";
// ✅ 1. IMPORT useRouter from next/navigation
import { useRouter } from "next/navigation";

import { AnimatedBeerCan } from "@/components/3d/AnimatedBeerCan";
import type { BeerData } from "@/types";

type BeerShowcaseProps = {
  beers: BeerData[];
};

export default function BeerShowcase({ beers }: BeerShowcaseProps) {
  const [hoveredCanId, setHoveredCanId] = useState<number | null>(null);
  // ✅ 2. INITIALIZE the router
  const router = useRouter();

  // ✅ Definiamo uno spazio verticale (circa l'altezza di una lattina)
  const verticalSpacing = 2.5;

  return (
    <>
      {beers.map((beer, index) => {
        // ❌ Rimuoviamo xPos
        // const xPos = (index - (beers.length - 1) / 2) * 2.5;

        // ✅ Calcoliamo yPos per impilare le birre verticalmente
        // Usiamo la stessa logica di centratura, ma sull'asse Y
        // Il segno negativo fa sì che la birra con index 0 sia in alto
        const yPos = (index - (beers.length - 1) / 2) * -verticalSpacing;

        // ✅ 3. CREATE the URL slug from the beer name
        const slug = beer.name.toLowerCase().replace(/\s+/g, "-");
        const href = `/beer/${slug}`;

        return (
          <group
            key={beer.id}
            // ✅ Aggiorniamo la posizione: x è 0, y è dinamico
            position={[0, yPos, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredCanId(beer.id);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHoveredCanId(null);
              document.body.style.cursor = "auto";
            }}
            // ✅ 4. ADD the onClick event handler
            onClick={() => router.push(href)}
          >
            <AnimatedBeerCan
              imageUrl={beer.imageUrl}
              isHovered={hoveredCanId === beer.id}
            />
          </group>
        );
      })}
    </>
  );
}