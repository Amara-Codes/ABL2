"use client";

import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";
import FloatingCan from "@/components/FloatingCan";





const BeerPage = (): JSX.Element => {

  const sodaCanRef = useRef<Group>(null);


  return (
    <section
      className="carousel relative grid h-fit grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

    


   
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left */}

        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={"blackCherry"}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={0.5} position={[0, 1, 1]} />
        </View>
        {/* Right */}

      </div>
    </section>
  );
};

export default BeerPage;




