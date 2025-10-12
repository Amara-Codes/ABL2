"use client";

import { useState, useEffect } from "react";
import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";
import type { SkyDivingContent } from "@/types";

// È buona norma definire l'URL di base dell'API in una costante
const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";

const SkyDive = ({ content }: SkyDivingContent): JSX.Element => {
  const { sentence } = content;
  // 1. Stato per memorizzare l'URL della texture caricato
  const [randomTextureUrl, setRandomTextureUrl] = useState<string | null>(null);

  // 2. Hook per eseguire il fetch dei dati al montaggio del componente
  useEffect(() => {
    const fetchRandomBeerLabel = async () => {
      try {
        // Chiama l'endpoint delle birre, popolando la relazione 'label'
        const response = await fetch(`${STRAPI_URL}/api/beers?populate=label`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const beers = data.data;
          
          // 3. Scegli un indice casuale dall'array di birre
          const randomIndex = Math.floor(Math.random() * beers.length);
          const randomBeer = beers[randomIndex];
          const labelData = randomBeer.attributes.label.data;

          if (labelData) {
            const imageUrl = labelData.attributes.url;

            // 4. Gestisci sia URL assoluti (es. Cloudinary) che relativi
            let finalUrl = imageUrl;
            if (!imageUrl.startsWith("http")) {
              finalUrl = `${imageUrl}`;
            }
            
            // 5. Aggiorna lo stato con l'URL finale
            setRandomTextureUrl(finalUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch random beer label:", error);
      }
    };

    fetchRandomBeerLabel();
  }, []); // L'array vuoto assicura che l'effetto venga eseguito solo una volta

  return (
    <Bounded className="skydive h-screen">
      <h2 className="sr-only">{sentence[0]?.text}</h2>
      <View className="h-screen w-screen">
        {/* 6. Renderizza la scena solo quando l'URL è stato caricato */}
        {randomTextureUrl && (
          <Scene
            textureUrl={randomTextureUrl}
            sentence={sentence[0]?.text}
          />
        )}
      </View>
    </Bounded>
  );
};

export default SkyDive;