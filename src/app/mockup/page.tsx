"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center, ContactShadows } from "@react-three/drei";
import { BeerCan } from "@/components/3d/BeerCan"; // Assicurati che il percorso sia corretto
import { Upload, CameraIcon, Download } from "lucide-react";


export default function BeerMockupPage() {
    // Stato per l'immagine dell'etichetta
    const [labelUrl, setLabelUrl] = useState<string>("/labels/placeholder.png");
    const [rotation, setRotation] = useState<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Gestione Caricamento Immagine
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Crea un URL locale temporaneo per l'immagine caricata
            const objectUrl = URL.createObjectURL(file);
            setLabelUrl(objectUrl);
        }
    };

    // Gestione Reset
    const handleReset = () => {
        setLabelUrl("/labels/placeholder.png");
        setRotation(0);
    };

    // Gestione Export (Screenshot)
    const handleExport = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Creiamo un link temporaneo per il download
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().split('T')[0];
        link.download = `amara-mockup-${timestamp}.png`;
        
        // Convertiamo il contenuto del canvas in Data URL
        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.click();
        handleReset(); // Reset after export
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">
            
            {/* --- SIDEBAR CONTROLLI --- */}
            <div className="w-full lg:w-1/3 p-8 flex flex-col gap-8 border-r border-gray-800 bg-gray-900/50 backdrop-blur-sm z-10">
                <div>
                    <h1 className="text-4xl font-fatboy text-primary mb-2">Label render</h1>
                    <p className="text-gray-400">Upload your label, position it, and take a photo.</p>
                </div>

                {/* 1. Upload */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">1. Upload Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-400">Click to upload (JPG/PNG)</p>
                        </div>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                {/* 2. Position Controls */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">2. Rotate Label</label>
                    <input
                        type="range"
                        min={0}
                        max={Math.PI * 2}
                        step={0.1}
                        value={rotation}
                        onChange={(e) => setRotation(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>0°</span>
                        <span>360°</span>
                    </div>
                </div>

                {/* 3. Azioni */}
                <div className="mt-auto flex gap-4">
                    <button 
                        onClick={handleExport}
                        className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-black font-bold py-3 px-6 rounded-lg transition-all"
                    >
                        <CameraIcon className="w-5 h-5" />
                        Take Photo
                    </button>
                    
                </div>
            </div>

            {/* --- AREA 3D (CANVAS) --- */}
            <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-black h-[50vh] lg:h-auto">
                <Canvas
                    ref={canvasRef}
                    // IMPORTANTE: preserveDrawingBuffer serve per fare lo screenshot
                    gl={{ preserveDrawingBuffer: true, antialias: true }}
                    dpr={[1, 2]} // Supporto schermi retina
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    className="w-full h-full cursor-move"
                >
                    <Suspense fallback={null}>
                        <Environment files="/hdr/warehouse.hdr" />
                        
                        {/* Luci Studio per far risaltare l'etichetta */}
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />

                        <Center>
                            <BeerCan 
                                imageUrl={labelUrl}
                                labelRotation={rotation}
                                scale={2.5}
                                // Puoi aggiungere isBodyTransparent={true} se vuoi testare l'effetto vetro
                            />
                        </Center>

                        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                        
                        <OrbitControls makeDefault />
                    </Suspense>
                </Canvas>

                {/* Overlay istruzioni mobile/desktop */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-black/50 px-2 py-1 rounded backdrop-blur-md pointer-events-none">
                    Drag to rotate view • Scroll to zoom
                </div>
            </div>
        </div>
    );
}