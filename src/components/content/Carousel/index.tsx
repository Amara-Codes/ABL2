// src/components/content/Carousel.tsx

"use client";

import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FloatingCan from "@/components/3d/FloatingCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";
import type { CarouselSlideContent } from "@/types";

type BeerSlide = {
  name: string;
  description: string;
  categoryUrl: string;
  textureUrl: string;
  imageBgColor: string;
  complementaryColor: string;
  invertedColor: string;
  textColor: string;
  link: string;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "http://127.0.0.1:1337";
const SPINS_ON_CHANGE = 8;

const Carousel = ({ content, dropId }: CarouselSlideContent & { dropId?: string | number }): JSX.Element => {
  const [beerSlides, setBeerSlides] = useState<BeerSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const canRef = useRef<Group>(null);
  const { title } = content;
  const router = useRouter();

  useEffect(() => {
    const fetchDrop = async () => {
      try {
        let fetchUrl = "";
        if (dropId) {
          fetchUrl = `${STRAPI_URL}/api/drops/${dropId}?populate[beers][populate]=label,category`;
        } else {
          fetchUrl = `${STRAPI_URL}/api/drops?sort=createdAt:desc&pagination[limit]=1&populate[beers][populate]=label,category`;
        }

        const response = await fetch(fetchUrl);
        const data = await response.json();

        let dropData;
        if (dropId) {
          dropData = data.data;
        } else {
          if (!data.data || data.data.length === 0) return;
          dropData = data.data[0];
        }

        if (!dropData) {
          console.error("Nessun drop trovato con i criteri forniti.");
          return;
        }

        const beers = dropData.attributes.beers.data;

        const formattedSlidesPromises = beers.map(async (beer: any) => {
          const { name, label, category } = beer.attributes;
          const labelUrl = label?.data?.attributes?.url || "";

          let finalUrl = labelUrl;
          if (labelUrl && !labelUrl.startsWith("http")) {
            finalUrl = `${STRAPI_URL}${labelUrl}`;
          }

          const beerCategory = category?.data?.attributes;

          const getBgColorFromImage = (imageUrl: string): Promise<string> => {
            return new Promise((resolve) => {
              if (!imageUrl) {
                resolve("#710523");
                return;
              }
              const img = new Image();
              img.crossOrigin = "anonymous";

              img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.drawImage(img, 0, 0);
                  try {
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    let r = 0, g = 0, b = 0;
                    const pixelCount = data.length / 4;
                    for (let i = 0; i < data.length; i += 4) {
                      r += data[i];
                      g += data[i + 1];
                      b += data[i + 2];
                    }
                    r = Math.floor(r / pixelCount);
                    g = Math.floor(g / pixelCount);
                    b = Math.floor(b / pixelCount);
                    const componentToHex = (c: number) => c.toString(16).padStart(2, '0');
                    resolve(`#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`);
                  } catch (e) {
                    console.error("Canvas was tainted, falling back to default color.", e);
                    resolve("#710523");
                  }
                } else {
                  resolve("#710523");
                }
              };
              img.onerror = function () {
                resolve("#710523");
              };
              img.src = imageUrl;
            });
          };

          const imageBgColor = await getBgColorFromImage(finalUrl);

          function hexToComplimentary(hex: string) {
            const hexNoHash = hex.replace('#', '');
            const match = hexNoHash.match(new RegExp('(.{' + hexNoHash.length / 3 + '})', 'g'));
            if (!match) return "#ffffff";
            var rgb = 'rgb(' + match.map(function (l) { return parseInt(hexNoHash.length % 2 ? l + l : l, 16); }).join(',') + ')';
            const rgbArr = rgb.replace(/[^\d,]/g, '').split(',');
            var r = Number(rgbArr[0]), g = Number(rgbArr[1]), b = Number(rgbArr[2]);
            r /= 255.0; g /= 255.0; b /= 255.0;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h = 0, s, l = (max + min) / 2.0;

            if (max == min) { h = s = 0; } else {
              var d = max - min;
              s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));
              if (max == r && g >= b) { h = 1.0472 * (g - b) / d; }
              else if (max == r && g < b) { h = 1.0472 * (g - b) / d + 6.2832; }
              else if (max == g) { h = 1.0472 * (b - r) / d + 2.0944; }
              else if (max == b) { h = 1.0472 * (r - g) / d + 4.1888; }
            }
            h = h / 6.2832 * 360.0 + 0;
            h += 180;
            if (h > 360) { h -= 360; }
            h /= 360;
            if (s === 0) { r = g = b = l; } else {
              var hue2rgb = function hue2rgb(p: number, q: number, t: number): number {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
              };
              var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              var p = 2 * l - q;
              r = hue2rgb(p, q, h + 1 / 3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1 / 3);
            }
            r = Math.round(r * 255);
            g = Math.round(g * 255);
            b = Math.round(b * 255);
            return ("#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join(""));
          }

          function padZero(str: string, len: number = 2) {
            var zeros = new Array(len).join('0');
            return (zeros + str).slice(-len);
          }

          function invertColor(hex: string, bw: boolean) {
            if (hex.indexOf('#') === 0) hex = hex.slice(1);
            if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            if (hex.length !== 6) throw new Error('Invalid HEX color.');
            let r = parseInt(hex.slice(0, 2), 16),
              g = parseInt(hex.slice(2, 4), 16),
              b = parseInt(hex.slice(4, 6), 16);
            if (bw) return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
            let Sr = (255 - r).toString(16);
            let Sg = (255 - g).toString(16);
            let Sb = (255 - b).toString(16);
            return "#" + padZero(Sr) + padZero(Sg) + padZero(Sb);
          }

          const complementaryColor = hexToComplimentary(imageBgColor);

          return {
            name: name,
            description: beerCategory?.name || "Craft Beer",
            categoryUrl: `/beers/${beerCategory?.name.toLowerCase().replace(/\s+/g, "-")}`,
            textureUrl: finalUrl,
            imageBgColor: imageBgColor,
            complementaryColor: complementaryColor,
            invertedColor: invertColor(imageBgColor, false),
            bgColor: invertColor(imageBgColor, false),
            textColor: imageBgColor,
            link: `/beer/${name.toLowerCase().replace(/\s+/g, "-")}`,
          };
        });

        const finalSlides = await Promise.all(formattedSlidesPromises);
        setBeerSlides(finalSlides);

      } catch (error) {
        console.error("Failed to fetch carousel data:", error);
      }
    };

    fetchDrop();
  }, [dropId]);

  useEffect(() => {
    if (beerSlides.length > 0) {
      const firstSlide = beerSlides[0];
      gsap.set(".background, .wavy-circles-outer, .wavy-circles-inner", {
        backgroundColor: firstSlide.imageBgColor,
        fill: firstSlide.invertedColor,
      });
    }
  }, [beerSlides]);


  function changeSlide(index: number) {
    if (!canRef.current || beerSlides.length === 0) return;

    const nextIndex = (index + beerSlides.length) % beerSlides.length;

    gsap.timeline()
      .to(canRef.current.rotation, {
        y: index > currentIndex ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}` : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      }, 0)
      .to(".background, .wavy-circles-outer, .wavy-circles-inner", {
        backgroundColor: beerSlides[nextIndex].imageBgColor,
        fill: beerSlides[nextIndex].invertedColor,
        ease: "power2.inOut",
        duration: 1,
      }, 0)
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .add(() => setCurrentIndex(nextIndex), 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  if (beerSlides.length === 0) {
    return <section className="carousel h-screen bg-gray-200"></section>;
  }

  const currentSlide = beerSlides[currentIndex];

  return (
    <section className="carousel relative grid h-fit grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background pointer-events-none absolute inset-0  opacity-50 bg-black" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2" />

      <h2 className="relative text-center text-5xl font-bold text-shadow-outline md:text-6xl lg:text-7xl px-8 py-4">
        <span>{title?.[0]?.text ?? "Drop Details"}</span>
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <ArrowButton
          onClick={(e) => changeSlide(currentIndex + 1)}
          direction="left"
          label="Previous Beer"
        />

        {/* ✅ WRAPPER PER L'OVERLAY */}
        {/* Le classi di dimensione sono state spostate qui dalla View per dare forma al contenitore */}
        <div className="relative aspect-square h-[70vmin] min-h-40 cursor-pointer group mx-auto">
          
          {/* ✅ 1. OVERLAY INVISIBILE */}
          {/* Z-Index alto, occupa tutto lo spazio, intercetta il click */}
          <div 
            className="absolute inset-0 z-50 bg-transparent"
            onClick={() => router.push(currentSlide.link)}
            aria-label={`View details for ${currentSlide.name}`}
          />

          {/* ✅ 2. VIEW 3D */}
          {/* Rimane sotto l'overlay. Width e Height devono essere 100% per riempire il wrapper */}
          <View
            className="w-full h-full" 
            style={{ touchAction: 'pan-y' }}
          >
            <Center position={[0, 0, 1.5]}>
              {/* Rimosso il group onClick qui dentro perché ora gestiamo tutto dall'overlay HTML */}
              <FloatingCan
                ref={canRef}
                floatIntensity={0}
                rotationIntensity={1}
                textureUrl={currentSlide.textureUrl}
              />
            </Center>
            <Environment path='/hdr/' files="warehouse.hdr" />
            <directionalLight intensity={0.5} position={[0, 1, 1]} />
          </View>
        </div>

        <ArrowButton
          onClick={(e) => changeSlide(currentIndex - 1)}
          direction="right"
          label="Next Beer"
        />
      </div>
    </section>
  );
};

export default Carousel;

// ArrowButton component invariato...
type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
      >
        <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}