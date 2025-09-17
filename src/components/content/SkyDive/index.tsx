"use client";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";
import { SodaCanProps } from "@/components/SodaCan";
import type { SkyDivingContent } from "@/types";
/**
 * Props for `SkyDive`.
 */
export type SkyDiveProps = {
  slice: {
    slice_type: string;
    variation: string;
    primary: {
      sentence: string | null;
      flavor: SodaCanProps["flavor"] | null;
    };
  };
};

/**
 * Component for "SkyDive" Slices.
 */
const SkyDive = ({ content }: SkyDivingContent): JSX.Element => {

  const { sentence, flavour } = content;
  return (
    <Bounded
      className="skydive h-screen"
    >
      <h2 className="sr-only">{sentence[0]?.text}</h2>
      <View className="h-screen w-screen">
        <Scene
          flavor={flavour[0]?.text as SodaCanProps["flavor"]}
          sentence={sentence[0]?.text}
        />
      </View>
    </Bounded>
  );
};

export default SkyDive;
