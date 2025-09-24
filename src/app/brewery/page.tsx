import { Metadata } from "next";

import BigText from "@/components/content/BigText";
import Carousel from "@/components/content/Carousel";

import { sampleBigTextContent2, sampleCarouselContent, sampleCtaContent } from "@/lib/sample-data";






export default function Brewery() {
    return (
    <div className="min-h-screen mt-16">
      <BigText content={sampleBigTextContent2.content} />
      <Carousel content={sampleCarouselContent.content} />
    </div>
  );
}
