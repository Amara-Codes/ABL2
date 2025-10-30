// components/layout/ViewCanvas.tsx

"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
// 1. Keep this type just as it was
import { RefObject } from "react";

type ViewCanvasProps = {
  eventSource: RefObject<HTMLElement>;
};

export default function ViewCanvas({ eventSource }: ViewCanvasProps) {
  return (
    <Canvas
   style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      
      // 2. THIS IS THE FIX:
      // Pass the .current value of the ref.
      // If eventSource.current is 'null' (on first render),
      // the '|| undefined' converts it to 'undefined'.
      // This satisfies the type 'HTMLElement | ... | undefined'.
      eventSource={eventSource.current || undefined}
      
      eventPrefix="client"
    >
      <View.Port />
    </Canvas>
  );
}