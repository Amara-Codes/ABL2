"use client";

import Image from "next/image";
import dynamic from "next/dynamic"; // Import dynamic per il lazy loading
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import type { HeroContent } from "@/types";

// 1. CARICAMENTO DINAMICO
// La scena 3D viene importata solo se necessaria.
// ssr: false è fondamentale per componenti 3D che dipendono da window.
const Scene = dynamic(() => import("./Scene"), { 
  ssr: false,
  loading: () => null // Opzionale: un loader leggero mentre carica
});

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HeroProps = {
  content: HeroContent['content'];
}

const Hero = ({ content }: HeroProps): JSX.Element => {
  const {
    heading,
    subheading,
    body,
    button,
    cans_image,
    second_heading,
    second_body,
  } = content;

  const ready = useStore((state) => state.ready);
  // Assicurati che useMediaQuery restituisca false di default per evitare idratazione errata
  const isDesktop = useMediaQuery("(min-width: 1024px)", false); 

  useGSAP(
    () => {
      // 2. BLOCCO LOGICO GSAP
      // Se non è desktop O non è pronto, fermiamo tutto immediatamente.
      // Questo impedisce a ScrollTrigger di fare calcoli costosi su mobile.
      if (!isDesktop || !ready) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        .from(".hero-subheading", { opacity: 0, y: 30 }, "+=.8")
        .from(".hero-body", { opacity: 0, y: 10 })
        .from(".hero-button", { opacity: 0, y: 10, duration: 0.6 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo("body", { backgroundColor: "#FA4700" }, { backgroundColor: "#000000", overwrite: "auto" }, 1)
        .fromTo("#hero-title", { color: "#000000" }, { color: "#FF850E", overwrite: "auto" }, 1)
        .from(".text-side-heading .split-char", { scale: 1.3, y: 40, rotate: -25, opacity: 0, stagger: 0.1, ease: "back.out(3)", duration: 0.5 })
        .from(".text-side-body", { y: 20, opacity: 0 });
    },
    { dependencies: [ready, isDesktop] } // Re-esegue se si passa da mobile a desktop
  );

  return (
    // Rimuoviamo opacity-0 iniziale su mobile, altrimenti senza GSAP non appare mai
    <Bounded className={`hero ${isDesktop ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* 3. RENDERING CONDIZIONALE
          Invece di usare CSS (hidden), usiamo JS. 
          Se isDesktop è false, il componente <View> e <Scene> non esistono proprio nel DOM.
          Risparmio enorme di memoria e GPU. */}
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] h-screen w-screen">
          <Scene />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          
          {/* DESKTOP LAYOUT */}
          {isDesktop ? (
            <div className="grid auto-rows-min place-items-center text-center">
              <h1 id="hero-title" className="hero-header text-7xl font-black uppercase leading-[.8] text-secondary text-[13rem]">
                <TextSplitter
                  text={heading[0]?.text || ""}
                  wordDisplayStyle="block"
                  className="hero-header-word font-fatboy"
                />
              </h1>
              <div className="hero-subheading mt-16 text-5xl font-semibold">
                <span className="text-white">{subheading[0]?.text}</span>
              </div>
              <div className="mt-4 hero-body text-2xl font-normal">
                <span className="text-white">{body[0]?.text}</span>
              </div>
            </div>
          ) : (
            /* MOBILE LAYOUT - Versione statica e leggera */
            <div className="grid auto-rows-min place-items-center text-center">
              <h1 className="font-fatboy text-6xl uppercase leading-[1] text-white md:text-white">
                {heading[0]?.text}
              </h1>
              <div className="mt-16 text-5xl font-semibold">
                <span className="text-white">{subheading[0]?.text}</span>
              </div>
              <div className="mt-4 text-2xl font-normal">
                <span className="text-white">{body[0]?.text}</span>
              </div>
            </div>
          )}
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          {/* L'immagine appare solo su mobile/tablet dove non c'è la scena 3D */}
          {!isDesktop && (
            <Image
              alt={cans_image.alt || "Assortment of product cans"}
              className="w-full"
              src={cans_image.url}
              width={800}
              height={600}
              priority // Carica questa immagine con priorità su mobile
            />
          )}

          {/* DESKTOP TEXT SIDE */}
          <div className="mx-auto hidden lg:block">
             {/* ... contenuto desktop esistente ... */}
             {/* Nota: ho mantenuto hidden lg:block qui per brevità, ma potresti usare {isDesktop && ...} anche qui */}
            <h2 className="text-side-heading text-balance font-black uppercase text-white text-8xl">
              <TextSplitter text={second_heading[0]?.text || ""} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-white">
              <span>{second_body[0]?.text}</span>
            </div>
            <div className="mt-16 py-8 text-left">
              <Button
                buttonLink={button.url}
                buttonText={button.label}
                className="hero-button mt-12"
                type={button.type === "ext" ? "ext" : "int"}
              />
            </div>
          </div>

          {/* MOBILE TEXT SIDE */}
          <div className="max-w-[90%] mx-auto block lg:hidden">
            <h2 className="text-balance font-black uppercase text-white text-4xl">
              {second_heading[0]?.text}
            </h2>
            <div className="mt-4 max-w-xl text-balance text-xl font-normal text-white">
              <span>{second_body[0]?.text}</span>
            </div>
            <div className="mt-8 py-8 text-center">
              <Button
                buttonLink={button.url}
                buttonText={button.label}
                className="mt-12"
                type={button.type === "ext" ? "ext" : "int"}
              />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;