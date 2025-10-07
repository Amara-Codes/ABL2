"use client";

import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";
import { CarouselSlideContent } from "@/types";
import Link from "next/link";


const SPINS_ON_CHANGE = 8;


const Carousel = ({ content }: CarouselSlideContent): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  const {
    title,
    paragraph,
    slides
  } = content;

  function changeFlavor(index: number, slides: CarouselSlideContent['content']['slides']) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + slides.length) % slides.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: slides[nextIndex].bgColor,
          fill: slides[nextIndex].textColor,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section
      className="carousel relative grid h-fit grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">
        <span>{title[0]?.text || ""}</span>
      </h2>
   
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1, slides)}
          direction="left"
          label="Previous Flavor"
        />
        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={slides[currentFlavorIndex]?.flavour[0]?.text as SodaCanProps["flavor"] || "blackCherry"}
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
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1, slides)}
          direction="right"
          label="Next Flavor"
        />
      </div>
      <Link href={slides[currentFlavorIndex].link} className="mx-auto my-4 rounded-full bg-white/10 px-6 py-3 text-lg font-medium text-white ring-white hover:bg-white/20 focus:outline-none focus:ring-4">

        <div className="text-area relative mx-auto text-center">
          <div className="text-wrapper text-4xl font-medium">
            <p>{slides[currentFlavorIndex].name}</p>
          </div>
          <div className="mt-2 text-2xl font-normal opacity-90">
            <span>{slides[currentFlavorIndex].description}</span>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
