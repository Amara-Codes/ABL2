import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

import { CtaContent } from "@/types";

const layoutClasses: Record<CtaContent['content']['layout'], string> = {
    centered: "flex flex-col items-center text-center",
    imageLeft: "flex flex-row items-center text-left",
    imageRight: "flex flex-row-reverse items-center text-left",
};

const Cta = ({ content }: CtaContent): JSX.Element => {
    const { ctaClasses, title, titleClasses, paragraph, paragraphClasses, button, background_image, image, layout } = content;
    return (
        <section
            className={`relative overflow-hidden ${background_image?.url ? "bg-cover bg-center" : ""} ${ctaClasses}`}
            style={background_image?.url ? { backgroundImage: `url(${background_image.url})` } : undefined}
        >
            <div className={`max-w-6xl mx-auto ${layoutClasses[layout]} gap-8`}>
                {image?.url ? (
                    <Image
                        src={image.url}
                        alt="CTA Image"
                        width={300}
                        height={300}
                        className="rounded-lg object-cover"
                    />
                ) : (
                    <div className="gapper w-20 h-20 grow hidden lg:block"></div>
                )}
                <div className="flex flex-col gap-4 max-w-lg p-8 h-full w-full bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
                    <h2 className={`text-4xl font-bold ${titleClasses}`}>{title.text}</h2>
                    <p className={`text-xl ${paragraphClasses}`}>{paragraph.text}</p>

                    <Button
                        buttonLink={button.url || null}
                        buttonText={button.label}
                        type={button.type === "ext" ? "ext" : "int"}
                        className="mt-4"
                    />
                </div>
            </div>
            {/* Optional overlay for better text readability */}
            {background_image?.url && (
                <div className="absolute inset-0 pointer-events-none" />
            )}
        </section>
    );
};

export default Cta;