"use client";

import { useRef } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/FloatingCan";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  const isReady = useStore((state) => state.isReady);

  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);


  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    // Set can starting location
    gsap.set(can1Ref.current.position, { x: -1.1, y: -0.7, z: -2 })
    gsap.set(can1Ref.current.rotation, { z: -0.4 });

    gsap.set(can2Ref.current.position, { x: 0.5, y: -0.2, z: -1 });
    gsap.set(can2Ref.current.rotation, { z: 0.0 });

    gsap.set(can3Ref.current.position, { x: -2, y: 0.5, z: -1 });
    gsap.set(can1Ref.current.rotation, { z: -0.1 });

    gsap.set(can4Ref.current.position, {x: 1.5, y: -0.3, z: 0 });
    gsap.set(can1Ref.current.rotation, { z: 0.3 });



  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          flavor="amritaRedVelvet"
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          flavor="amritaTaeuyKnao"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <FloatingCan ref={can3Ref} flavor="amritaFlamingo" floatSpeed={FLOAT_SPEED} />

      <FloatingCan
        ref={can4Ref}
        flavor="amritaMatsunekaNoAwa"
        floatSpeed={FLOAT_SPEED}
      />

      
      {/* <OrbitControls /> */}
      <Environment files="/hdr/lobby.hdr" environmentIntensity={.8} />
    </group>
  );
}
