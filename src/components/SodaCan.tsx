"use client";
import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png",
  grape: "/labels/grape.png",
  blackCherry: "/labels/cherry.png",
  strawberryLemonade: "/labels/strawberry.png",
  watermelon: "/labels/watermelon.png",
};

const bodyMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 0.7,
  color: "#bbbbbb",
});

const lidMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.25,
  metalness: 0.8,
  color: "#bbbbbb",
});

const roughBodyMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.6,
  color: "#aeaeae",
});



export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "blackCherry",
  scale = 2,
  ...props
}: SodaCanProps) {

  const { nodes } = useGLTF("/can.gltf");

  const labels = useTexture(flavorTextures);

  // Fixes upside down labels
  labels.strawberryLemonade.flipY = false;
  labels.blackCherry.flipY = false;
  labels.watermelon.flipY = false;
  labels.grape.flipY = false;
  labels.lemonLime.flipY = false;

  const label = labels[flavor];

   const activeLabel = useMemo(() => {
    const texture = labels[flavor].clone();
    texture.needsUpdate = true; // Importante quando si clona

    // Fix per le texture capovolte
    texture.flipY = false;
    
    // --- QUI PUOI FARE I TUOI ESPERIMENTI ---
    
    // Esempio: Se la texture è troppo "stretta", puoi scalarla sull'asse X
     texture.repeat.set(1, 1.15); // Ripete la texture 0.8 volte in X (la allarga) e 1 volta in Y
    
    // Esempio: Se la texture è spostata, puoi correggerne l'offset
    texture.offset.set(0, -0.15); // Sposta il punto di inizio della texture
    
    // Per evitare che la texture si ripeta ai bordi (se la scali < 1)
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return texture;
  }, [labels, flavor]);

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.roughDownBody as THREE.Mesh).geometry}
        material={roughBodyMaterial}
      />
            <mesh
        castShadow
        receiveShadow
        geometry={(nodes.downerBody as THREE.Mesh).geometry}
        material={bodyMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.label as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.9} metalness={0.3} map={activeLabel} />
      </mesh>
           
            <mesh
        castShadow
        receiveShadow
        geometry={(nodes.upperBody as THREE.Mesh).geometry}
        material={bodyMaterial}
      />
           
            <mesh
        castShadow
        receiveShadow
        geometry={(nodes.roughTopBody as THREE.Mesh).geometry}
        material={roughBodyMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.lid as THREE.Mesh).geometry}
        material={lidMaterial}
      />
    </group>
  );
}
