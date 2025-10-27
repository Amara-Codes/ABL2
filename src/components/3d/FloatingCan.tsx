"use client";

import { forwardRef, ReactNode } from "react";
// 1. Importa 'Html' da drei
import { Float, Html } from "@react-three/drei";

import { BeerCan } from "@/components/3d/BeerCan";
import { Group } from "three";

type FloatingCanProps = {
  textureUrl?: string; // Prop per l'URL della texture
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      textureUrl,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}


          <BeerCan labelRotation={0.25} imageUrl={textureUrl} />
        </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;