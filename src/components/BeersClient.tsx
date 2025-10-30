// src/components/BeersPageClient.tsx

"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { SceneContent } from "@/components/3d/SceneContent";
import type { DropData } from "@/types";

interface BeersClientProps {
    drops: DropData[];
}

export default function BeersClient({ drops }: BeersClientProps) {
    return (
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 7.5]} intensity={1.5} castShadow />

            <ScrollControls pages={drops.length} damping={0.2}>
                {/* Il contenuto 3D è qui, e la sua posizione sarà gestita da SceneContent */}
                <SceneContent drops={drops} />

                {/* ✅ Il contenuto HTML scorrevole è stato modificato per il layout split-screen */}
                <Scroll html style={{ width: "100%" }}>
                    {drops.map((drop, index) => (
                        <section
                            key={drop.id}
                            // ✅ Layout verticale su mobile (flex-col) e orizzontale (md:flex-row) su desktop
                            className="h-screen w-screen flex flex-col md:flex-row"
                        >
                            {/* 1. Contenitore del Testo */}
                            {/* ✅ Occupa la metà superiore su mobile (h-1/2) e la metà sinistra su desktop (md:w-1/2) */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center p-8 pt-24 md:pt-8 md:pl-16">
                                <div className="max-w-md w-full p-6 text-center hidden lg:block bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                                    <h2 className="text-4xl font-bold text-primary">
                                        <span className="">{drops.length - index}. </span>
                                        <span className="ps-4 font-fatboy">{drop.name}</span>
                                    </h2>
                                    <p className="text-lg text-white mt-4">{drop.description}</p>
                                </div>
                                <div className="w-full block lg:hidden backdrop-blur-sm rounded-sm">
                                    <h2 className="text-4xl font-bold text-primary">
                                        <span className="">{drops.length - index}. </span>
                                        <span className="ps-4 font-fatboy">{drop.name}</span>
                                    </h2>
                                    <p className="mt-4 text-xl text-center font-bold text-white">{drop.description}</p>
                                </div>
                            </div>

                            {/* 2. "Finestra" 3D (implicita)
                L'altra metà dello schermo (h-1/2 su mobile, md:w-1/2 su desktop)
                è vuota e trasparente, mostrando il Canvas 3D sottostante.
              */}
                        </section>
                    ))}
                </Scroll>
            </ScrollControls>

            <Environment preset="city" />
        </Canvas>
    );
}