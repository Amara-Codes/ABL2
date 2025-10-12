"use client";

import { useState } from "react";
// ✅ 1. IMPORT useRouter from next/navigation
import { useRouter } from "next/navigation";

import { AnimatedBeerCan } from "@/components/AnimatedBeerCan";
import type { BeerData } from "@/types";

type BeerShowcaseProps = {
  beers: BeerData[];
};

export default function BeerShowcase({ beers }: BeerShowcaseProps) {
  const [hoveredCanId, setHoveredCanId] = useState<number | null>(null);
  // ✅ 2. INITIALIZE the router
  const router = useRouter();

  return (
    <>
      {beers.map((beer, index) => {
        const xPos = (index - (beers.length - 1) / 2) * 2.5;

        // ✅ 3. CREATE the URL slug from the beer name
        const slug = beer.name.toLowerCase().replace(/\s+/g, "-");
        const href = `/beer/${slug}`;

        return (
          <group
            key={beer.id}
            position={[xPos, 1.5, 0]}
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