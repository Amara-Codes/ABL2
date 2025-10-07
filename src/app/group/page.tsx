"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Import the specific types needed, not the whole HeroContent slice
import type { HeroContent } from "@/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Define a more accurate type for the props this component receives.
// It's the inner 'content' object from the main HeroContent type.
type HeroProps = {
  content: HeroContent['content'];
}

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ content }: HeroProps): JSX.Element => {
  // Destructure the content object for easier access in the component


  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

 

  return (
    <Bounded className="hero opacity-0 h-screen">
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 h-screen w-screen md:block">
          <Scene />
        </View>
      )}
    </Bounded>
  );
};

export default Hero;