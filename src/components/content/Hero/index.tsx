"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
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
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      // GSAP animations remain the same...
      if (!ready && isDesktop) return;

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
        .from(".hero-subheading", { opacity: 0, y: 30, }, "+=.8")
        .from(".hero-body", { opacity: 0, y: 10, })
        .from(".hero-button", { opacity: 0, y: 10, duration: 0.6, });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo("body", { backgroundColor: "#000000" }, { backgroundColor: "#FF850E", overwrite: "auto", }, 1)
        .from(".text-side-heading .split-char", { scale: 1.3, y: 40, rotate: -25, opacity: 0, stagger: 0.1, ease: "back.out(3)", duration: 0.5, })
        .from(".text-side-body", { y: 20, opacity: 0, });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded className="hero opacity-0">
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
        </View>
      )}

      <div className="grid mt-32">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-primary md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text={heading[0]?.text || ""}
                wordDisplayStyle="block"
                className="hero-header-word font-fatboy"
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <span className="text-sky-950">{subheading[0]?.text}</span>
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <span className="text-sky-950">{body[0]?.text}</span>
            </div>
            {/* The buttonLink prop in your Button component might expect a string, not an object.
                If it expects just the URL, this is correct. If it expects the whole object, change it to buttonLink={button_link} */}

          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <Image
            alt={cans_image.alt || "Assortment of product cans"}
            className="w-full md:hidden"
            src={cans_image.url}
            width={800}
            height={600}
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text={second_heading[0]?.text || ""} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <span className="text-sky-950">{second_body[0]?.text}</span>
            </div>

<div className="mt-16 py-8">

                        <Button
              buttonLink={button.url}
              buttonText={button.label}
              className="hero-button mt-12"
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