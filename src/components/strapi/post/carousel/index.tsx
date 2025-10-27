"use client";
import React, { useState } from "react";
import { BlogPostCarouselElement } from "@/types";
import Image from "next/image";

const Carousel: React.FC<BlogPostCarouselElement> = ({
    CarouselTitle,
    CarouselSubtitle,
    CarouselCssClasses = "",
    CarouselImgs = [],
}) => {
    const [currentImg, setCurrentImg] = useState(0);

    return (
        <div>
            <div className="pb-8">
                <h3 className="text-4xl font-bold text-koiRed text-center">
                    {CarouselTitle}
                </h3>
                <p className="pt-4 text-koiYellow text-xl text-center">{CarouselSubtitle}</p>
            </div>
            <div className={`relative ${CarouselCssClasses ?? ""}`}>
                {/* Carousel container */}
                <div className="relative h-[40vh] small:h-[60vh] w-full overflow-hidden rounded-lg">
                    <div
                        className="h-full flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentImg * 100}%)`,
                        }}
                    >
                        {CarouselImgs.map((v, i) => (
                            <div key={i} className="flex-shrink-0 w-full h-full relative">
                                <Image
                                    src={v || "https://via.placeholder.com/800x600"}
                                    alt={`carousel-image-${i}`}
                                    fill
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="absolute flex w-full justify-between small:top-1/2 small:-translate-y-1/2">
                    <button
                        onClick={() => setCurrentImg((prev) => Math.max(prev - 1, 0))}
                        disabled={currentImg === 0}
                        className={`flex items-center justify-center w-8 h-8 small:w-10 small:h-10 bg-koiOrange text-white rounded-full ${currentImg === 0 && "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() =>
                            setCurrentImg((prev) => Math.min(prev + 1, CarouselImgs.length - 1))
                        }
                        disabled={currentImg === CarouselImgs.length - 1}
                        className={`flex items-center justify-center  w-8 h-8 small:w-10 small:h-10 bg-koiRed text-white rounded-full ${currentImg === CarouselImgs.length - 1 &&
                            "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
