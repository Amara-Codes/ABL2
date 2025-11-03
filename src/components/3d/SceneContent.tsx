// src/components/3d/SceneContent.tsx

"use client";

import { useRef, useState, useEffect } from "react"; // ✅ Importa useState e useEffect
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { Group } from "three";

import BeerShowcase from "@/components/3d/BeerShowCase";
import type { DropData } from "@/types";

// ============================================================================
// ✅ Hook custom per rilevare il breakpoint "md" (768px) di Tailwind
// ============================================================================
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Il breakpoint "md" di Tailwind è 768px
    const media = window.matchMedia("(min-width: 768px)");
    const listener = () => setIsDesktop(media.matches);
    listener(); // Controlla subito al mount
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return isDesktop;
};

// ============================================================================
// Componente SceneContent
// ============================================================================
export function SceneContent({ drops }: { drops: DropData[] }) {
  const groupRef = useRef<Group>(null!);
  const scroll = useScroll();
  const sectionHeight = 12;
  const totalContentHeight = (drops.length - 0.5) * sectionHeight;

  // ✅ Usa l'hook per la responsività
  const isDesktop = useIsDesktop();

  // ✅ Calcola le posizioni X e Y reattive
  // Desktop: sposta a destra (x > 0)
  // Mobile: centra (x = 0)
  const showcaseXPos = isDesktop ? 3.5 : 0;

  // Desktop: posizione y originale
  // Mobile: sposta più in basso per adattarsi alla metà inferiore dello schermo
  const showcaseYPos = -2.5;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = scroll.offset * totalContentHeight;
    }
  });

  return (
    <group ref={groupRef}>
      {drops.map((drop, index) => (
        <group key={drop.id} position={[0, -index * sectionHeight, 0]}>
          {/* ✅ Applica le posizioni x e y responsive al gruppo BeerShowcase */}
          <group position={[showcaseXPos, showcaseYPos, 0]}>
            <BeerShowcase beers={drop.beers} />
          </group>
        </group>
      ))}
    </group>
  );
}