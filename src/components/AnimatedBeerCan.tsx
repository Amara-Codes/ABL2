"use client";

import { useSpring, a } from "@react-spring/three";
import { BeerCan, BeerCanProps } from "./BeerCan";

type AnimatedBeerCanProps = BeerCanProps & {
  isHovered: boolean;
};

export function AnimatedBeerCan({ isHovered, ...props }: AnimatedBeerCanProps) {
  const springProps = useSpring({
    scale: isHovered ? 1.8 : 1,
    // ✅ CORRECTION: Changed 30 to 0 for a resting state
    rotationY: isHovered ? Math.PI / 8 : Math.PI * 1.5, 
    config: { mass: 15, tension: 75, friction: 50 },
  });

  return (
    <a.group
      scale={springProps.scale}
      rotation-y={springProps.rotationY}
    >
      <BeerCan {...props} />
    </a.group>
  );
}