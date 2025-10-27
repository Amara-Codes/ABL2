import { Metadata } from "next";

import BigText from "@/components/content/BigText";
import Carousel from "@/components/content/Carousel";
import { CarouselSlideContent, CarouselSlideElement } from "@/types";
import { sampleBigTextContent2, sampleCarouselContent, sampleCtaContent } from "@/lib/sample-data";
import { Sliders } from "lucide-react";




export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Brewery",
  description: "Amara Beer Lab in Siem Reap: A craft brewery combining passion, tradition, and innovation. Explore our unique artisanal beers crafted in the heart of Siem Reap, Cambodia. Perfect for beer lovers and craft enthusiasts. Discover your next favorite brew today!",
}


const BigTextContent = {
  content: {
    bgColorClass: "bg-black",

    textColorClass: "text-[#FEE832]",

    sentence: "Craft Beer in Siem Reap ???",
    maxWidth: 100,
    factor: 1
  },
};

const carouselContent: CarouselSlideContent = {
  content: {

    title: [
      {
        type: "heading1",
        text: "Here are some beers we made",
        direction: "ltr",
      }
    ],

  }
}



export default function Brewery() {
  return (
    <div className="min-h-screen mt-16">
      <BigText content={BigTextContent.content} />
      <div className="max-w-6xl mx-auto flex flex-col gap-8 px-4 py-16">
        <h3 className="text-4xl text-white font-bold">Why?</h3>
        <p className="text-2xl text-white font-medium">Cambodia is a land of vibrant flavors, rich culture, and stunning landscapes.
          I saw a chance to craft something truly unique — a fusion of bold, artisanal beer and the spirit of this incredible country.
          But it's more than just crafting high-quality beer: I'm committed to giving back to the local community by supporting farmers, creating jobs, and fostering sustainable practices.
          Our brewery is a hub where amazing flavors meet meaningful impact, bringing people together while making a difference</p>

        <h3 className="text-4xl text-white font-bold">Who?</h3>
        <p className="text-2xl text-white font-medium">
          I’m driven by passion, creativity, and a deep respect for nature, culture, and community.
          With a love for craft beer and a belief in its power to bring people together, I’ve dedicated myself to creating something unique that represents the Land where I am now.
          Rooted in a commitment to sustainability and empowering the local community, I strive to blend craftsmanship with purpose, building connections that celebrate both people and place</p>
        <h3 className="text-4xl text-white font-bold">What?</h3>
        <p className="text-2xl text-white font-medium"> Our beers are a blend of tradition, innovation, and a deep passion for the craft.
          Trained at one of Italy’s most prestigious brewing schools, I bring a wealth of expertise to every brew. Currently, I’m heavily inspired by American styles, focusing on modern techniques to extract the full potential of the hops we use.
          At the same time, I believe there’s still so much to explore in the rich Belgian brewing tradition and European styles as a whole.
          That’s why you’ll always find something unique on tap—whether it’s a bold English-style ale, a classic Belgian creation, or a reimagined historical brew adapted to the warm climate of Siem Reap. Every beer reflects my dedication to blending the old and the new, crafting flavors that align with the vision of our brand and the unique setting we call home
        </p>
      </div>
      <Carousel content={carouselContent.content} />
    </div>
  );
}
