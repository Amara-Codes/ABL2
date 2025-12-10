// components/lib/utils/DesktopOnly.tsx
"use client";

import { useEffect, useState } from "react";

export default function DesktopOnly({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Controlla se lo schermo è più largo di 768px (o il tuo breakpoint mobile)
    const checkScreen = () => setIsDesktop(window.innerWidth > 768);
    
    checkScreen(); // Controllo iniziale
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isDesktop) return null; // Non renderizza nulla nel DOM su mobile

  return <>{children}</>;
}