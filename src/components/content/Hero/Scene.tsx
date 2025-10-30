"use client";

import { useRef, useState, useEffect } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/3d/FloatingCan";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

// Definiamo le posizioni dell'animazione per mantenere il layout artistico
const animationConfigs = [
  // Config per la Lattina 1
  {
    set: { position: { x: -2.5 }, rotation: { z: -0.5 } },
    to: {
      position: { x: -0.2, y: -0.7, z: -2 },
      rotation: { z: 0.3 },
    },
  },
  // Config per la Lattina 2
  {
    set: { position: { x: 2 }, rotation: { z: 0.5 } },
    to: {
      position: { x: 1, y: -0.2, z: -1 },
      rotation: { z: 0 },
    },
  },
  // Config per la Lattina 3
  {
    set: { position: { y: 5, z: 2 }, rotation: { z: 0 } },
    to: {
      position: { x: -0.3, y: 0.5, z: -1 },
      rotation: { z: -0.1 },
    },
  },
  // Config per la Lattina 4
  {
    set: { position: { x: 2, y: 4, z: 2 }, rotation: { z: 0 } },
    to: {
      position: { x: 0, y: -0.3, z: 0.5 },
      rotation: { z: 0.3 },
    },
  },
  // Config per la Lattina 5
  {
    set: { position: { y: -5 }, rotation: { z: 0 } },
    to: {
      position: { x: 0.3, y: 0.5, z: -0.5 },
      rotation: { z: -0.25 },
    },
  },
];


export default function Scene() {
  const isReady = useStore((state) => state.isReady);
  const [labelUrls, setLabelUrls] = useState<string[]>([]);

  // Un unico ref per contenere l'array di tutte le lattine
  const canRefs = useRef<(Group | null)[]>([]);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  // useEffect per caricare i dati dall'API
  useEffect(() => {
    const fetchLatestDrop = async () => {
      try {
        const response = await fetch(
          `${STRAPI_URL}/api/drops?sort=createdAt:desc&pagination[limit]=1&populate[beers][populate]=label`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const latestDrop = data.data[0];
          const beers = latestDrop.attributes.beers.data;

          const urls = beers
            .map((beer: any) => {
              const labelData = beer.attributes.label.data;
              if (labelData) {
                return `${labelData.attributes.url}`;
              }
              return null;
            })
            .filter(Boolean) // Rimuove eventuali null
            .slice(0, 5); // Limita a un massimo di 5 lattine

          setLabelUrls(urls);
        }
      } catch (error) {
        console.error("Failed to fetch beer labels:", error);
      }
    };

    fetchLatestDrop();
  }, []); // L'array vuoto assicura che venga eseguito solo una volta

  useGSAP(() => {
      // Aspettiamo che le lattine siano state renderizzate e i ref popolati
      if (
        !groupRef.current ||
        !can1GroupRef.current ||
        !can2GroupRef.current ||
        canRefs.current.length !== labelUrls.length ||
        labelUrls.length === 0
      ) {
        return;
      }

      isReady();

      const introTl = gsap.timeline({
        defaults: {
          duration: 3,
          ease: "back.out(1.4)",
        },
      });

      if (window.scrollY < 20) {
        introTl
          .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
          .from(can1GroupRef.current.rotation, { z: 3 }, 0)
          .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
          .from(can2GroupRef.current.rotation, { z: 3 }, 0);
      }

      const scrollTl = gsap.timeline({
        defaults: {
          duration: 2,
        },
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Animazione del gruppo principale
      scrollTl.to(groupRef.current.rotation, { y: Math.PI * 2 });

      // Applica animazioni a ciascuna lattina in modo dinamico
      canRefs.current.forEach((can, index) => {
        if (can && animationConfigs[index]) {
          const config = animationConfigs[index];

          // Imposta posizione e rotazione iniziale
          gsap.set(can.position, config.set.position);
          gsap.set(can.rotation, config.set.rotation);

          // Aggiungi le animazioni alla timeline dello scroll
          scrollTl
            .to(can.position, config.to.position, 0)
            .to(can.rotation, config.to.rotation, 0);
        }
      });
      
      // Animazione finale del gruppo
      scrollTl.to(
          groupRef.current.position,
          { x: 1, duration: 3, ease: "sine.inOut" },
          1.3,
        );

    }, [labelUrls]); // Rilancia le animazioni quando labelUrls cambia

  return (
    <group ref={groupRef}>
      {labelUrls.map((url, index) => {
        // Le prime due lattine vanno in gruppi separati per l'animazione di intro
        if (index === 0) {
          return (
            <group key={index} ref={can1GroupRef}>
              <FloatingCan
                ref={(el) => { canRefs.current[index] = el; }}
                textureUrl={url}
                floatSpeed={FLOAT_SPEED}
              />
            </group>
          );
        }
        if (index === 1) {
          return (
            <group key={index} ref={can2GroupRef}>
              <FloatingCan
                ref={(el) => { canRefs.current[index] = el; }}
                textureUrl={url}
                floatSpeed={FLOAT_SPEED}
              />
            </group>
          );
        }
        // Le altre lattine vengono renderizzate direttamente
        return (
          <FloatingCan
            key={index}
            ref={(el) => { canRefs.current[index] = el; }}
            textureUrl={url}
            floatSpeed={FLOAT_SPEED}
          />
        );
      })}
   <Environment preset="sunset"/>
   
    </group>
  );
}