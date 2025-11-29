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
                <SceneContent drops={drops} />

                <Scroll html style={{ width: "100%" }}>
                    {drops.map((drop, index) => (
                        <section
                            key={drop.id}
                            // ✅ Mobile: Layout colonna | Desktop: Layout riga
                            className="h-screen w-screen flex flex-col md:flex-row"
                        >
                            {/* CONTENITORE PRINCIPALE TESTO
                                Mobile: h-full (ocupa tutto) + justify-between (spinge testo agli estremi) + py-20 (padding per non toccare i bordi)
                                Desktop: w-1/2 (metà larghezza) + justify-center (centrato verticalmente)
                            */}
                            <div className="w-full h-full md:w-1/2 flex flex-col md:justify-center relative pointer-events-none md:pointer-events-auto">
                                
                                {/* INTERFACCIA DESKTOP (Invariata, nascosta su mobile) */}
                                <div className="hidden lg:flex w-full h-full justify-center items-center p-16">
                                     <div className="max-w-md w-full p-6 text-center bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                                        <h2 className="text-4xl font-bold text-primary">
                                            <span>{drops.length - index}. </span>
                                            <span className="ps-4 font-fatboy">{drop.name}</span>
                                        </h2>
                                        <p className="text-lg text-white mt-4">{drop.description}</p>
                                    </div>
                                </div>

                                {/* ✅ INTERFACCIA MOBILE (Sandwich Layout) */}
                                <div className="flex lg:hidden flex-col justify-between h-full w-full py-12 px-6">
                                    
                                    {/* PARTE SOPRA: Titolo */}
                                    <div className="text-center p-4 pointer-events-auto">
                                        <h2 className="text-3xl font-bold text-primary">
                                            <span>{drops.length - index}. </span>
                                            <span className="ps-2 font-fatboy">{drop.name}</span>
                                        </h2>
                                    </div>

                                    {/* SPAZIO VUOTO CENTRALE (dove si vede la birra) */}
                                    <div className="flex-grow"></div>

                                    {/* PARTE SOTTO: Descrizione */}
                                    <div className="text-center p-4 pointer-events-auto">
                                        <p className="text-lg font-bold text-white">{drop.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Spazio vuoto destro per Desktop (invariato) */}
                            <div className="hidden md:block md:w-1/2" />
                        </section>
                    ))}
                </Scroll>
            </ScrollControls>

            <Environment path='/hdr/' files="city.hdr" />
        </Canvas>
    );
}