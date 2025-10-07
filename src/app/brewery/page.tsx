import { Metadata } from "next";

import BigText from "@/components/content/BigText";
import Carousel from "@/components/content/Carousel";
import { sampleBigTextContent2, sampleCarouselContent, sampleCtaContent } from "@/lib/sample-data";



export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Brewery",
  description: "Amara Beer Lab in Siem Reap: A craft brewery combining passion, tradition, and innovation. Explore our unique artisanal beers crafted in the heart of Siem Reap, Cambodia. Perfect for beer lovers and craft enthusiasts. Discover your next favorite brew today!",
}




export default function Brewery() {
    return (
    <div className="min-h-screen mt-16">
      <BigText content={sampleBigTextContent2.content} />
      <Carousel content={sampleCarouselContent.content} />
    </div>
  );
}
