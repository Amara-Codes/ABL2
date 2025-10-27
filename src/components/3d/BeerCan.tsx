"use client";
import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ... (useGLTF.preload e flavorTextures rimangono invariati)
useGLTF.preload("/can.gltf");

const placeHolder = "/labels/placeholder.png"

// Materiale standard per il corpo della lattina (opaco)
const bodyMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.45,
  metalness: 0.85,
  color: "#c6c6c6",
});

// NUOVO: Materiale effetto vetro
const glassMaterial = new THREE.MeshPhysicalMaterial({
  roughness: 0.2,
  metalness: 0.0,
  transmission: .85, // 1.0 = completamente trasparente
  ior: 10,          // Indice di rifrazione (tipico per il vetro)
  thickness: 4,      // Spessore per la rifrazione
  transparent: true,
});

const lidMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.1,
  metalness: 0.9,
  color: "#ffffff",
});

const roughBodyMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.4,
  metalness: 0.8,
  color: "#cccccc",
});


// --- PROPS DEL COMPONENTE ---

export type BeerCanProps = {
  imageUrl?: string;
  scale?: number;
  labelRotation?: number;
  isBodyTransparent?: boolean; // <-- NUOVA PROP OPZIONALE
};


// --- COMPONENTE ---

export function BeerCan({
  imageUrl = placeHolder,
  scale = 2,
  labelRotation = 0,
  isBodyTransparent = false, // <-- Default a 'false'
  ...props
}: BeerCanProps) {
  const { nodes } = useGLTF("/can.gltf");
  const texturizedLabel = useTexture(imageUrl);

  // Sceglie il materiale per il corpo in base alla nuova prop
  const currentBodyMaterial = isBodyTransparent ? glassMaterial : bodyMaterial;

  const label = useMemo(() => {
    // ... (la logica per l'etichetta rimane invariata)
    const clonedTexture = texturizedLabel.clone();
    clonedTexture.flipY = false;
    clonedTexture.offset.x = labelRotation;
    clonedTexture.wrapS = THREE.RepeatWrapping;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [texturizedLabel, labelRotation]);

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.bottom as THREE.Mesh).geometry}
        material={currentBodyMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.bodybottom as THREE.Mesh).geometry}
        material={currentBodyMaterial} // <-- APPLICA MATERIALE CONDIZIONALE
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.label as THREE.Mesh).geometry}
      >
        <meshStandardMaterial
          roughness={0.9}
          metalness={0.3}
          map={label}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.bodytop as THREE.Mesh).geometry}
        material={currentBodyMaterial} // <-- APPLICA MATERIALE CONDIZIONALE
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.top as THREE.Mesh).geometry}
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