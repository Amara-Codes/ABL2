"use client";

import { useGLTF, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Group } from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  scene: THREE.Group;
  nodes: {
    "soda-can-a": THREE.Mesh;
    "soda-can-b": THREE.Mesh;
    "soda-can-001": THREE.Group;
  };
  materials: {
    "Metal": THREE.MeshStandardMaterial;
    "Can Body": THREE.MeshStandardMaterial;
    "Can Label": THREE.MeshStandardMaterial;
  };
};

export type BeerSwaggerProps = {
  urlImg?: string;
  scale?: number;
};



export function BeerSwagger({ urlImg, scale = 10 }: BeerSwaggerProps) {
  return (
      <Html>
    <div
      className="w-full  rounded-lg bg-transparent contrast-[1.45] saturate-[1.3] brightness-[1.05] top-16 md:top-8"
      style={{
        height: "calc(100dvh - 105px)", 
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    >
      <Canvas
        style={{
          aspectRatio: "1/1",
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <ambientLight intensity={10} color={"#ffffff"} />
        <directionalLight position={[8, -8, 8]} intensity={10} />
        <directionalLight position={[-5, 5, 5]} intensity={10} />

          <Scene urlImg={urlImg} scale={scale} />

      </Canvas>
    </div>
      </Html>
  );
}

type SceneProps = {
  urlImg?: string;
  scale: number;
};

function Scene({ urlImg, scale }: SceneProps) {
  const { scene, materials } = useGLTF("/Beer-Can.gltf") as GLTFResult;
  const label = useTexture(
    urlImg ?? "/labels/cherry.png"
  );
  const aspect = 778 / 1440;
  label.flipY = false;
  label.center.set(0.5, 0.5);
  label.rotation = Math.PI / 2;
  const canAspect = 1.1;
  const repeatY = canAspect / aspect;

  label.repeat.set(1, repeatY);
  label.offset.set(0, (1 - repeatY) / 2);

  const groupRef = useRef<Group>(null);


  useEffect(() => {
    if (materials["Can Label"]) {
      materials["Can Label"].map = label;
      materials["Can Label"].needsUpdate = true;
    }
  }, [materials, label]);



  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={0.5}
      floatingRange={[-0.05, 0.05]}
    >
      <group
        ref={groupRef}
        dispose={null}
        scale={scale}
        rotation={[0, -Math.PI, 0]}
        position={[0, -0.5, 0]}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}
