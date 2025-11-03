import { Metadata } from "next";

import { HeroContent, SkyDivingContent, BigTextContent, CtaContent } from "@/types";
import Hero from "@/components/content/Hero";
import SkyDive from "@/components/content/SkyDive";
import BigText from "@/components/content/BigText";
import Cta from "@/components/content/Cta";


export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Craft Beers, Sustainability and Community Impact",
  description:
    "Discover Amara Beer Lab, a craft brewery based in Siem Reap, Cambodia, dedicated to sustainability and supporting local communities. With high-quality beers crafted using technical excellence and modern methods to offer carefully designed, contemporary flavors, Amara Beer Lab blends authentic taste with social responsibility.",
}

const HeroData: HeroContent = {
  content: {
    heading: [
      {
        type: "heading1",
        text: "Amara Beer Lab",
        direction: "ltr",
      },
    ],
    subheading: [
      {
        type: "paragraph",
        text: "Craft Beer made in Siem Reap",
        direction: "ltr",
      },
    ],
    body: [
      {
        type: "paragraph",
        text: "Discover our beers, brewed with passion and precision in the heart of Siem Reap. From hoppy IPAs to rich stouts...",
        direction: "ltr",
      },
    ],
    button: {
      label: "Our Beers",
      type: "int",
      url: "/beers",
    },
    cans_image: {
      dimensions: {
        width: 1603,
        height: 1791,
      },
      alt: "Our first Drop",
      url: "/images/home/cans.png",
      id: "ZswEvEaF0TcGJYaB",
    },
    second_heading: [
      {
        type: "heading2",
        text: "Khmer Ingredients, Best Taste...",
        direction: "ltr",
      },
    ],
    second_body: [
      {
        type: "paragraph",
        text: "We use only the finest local ingredients, combined with traditional brewing techniques to create beers that are both unique and delicious.",
        direction: "ltr",
      },
    ],
  },
};

const SkyDivingData: SkyDivingContent = {
  content: {
    sentence: [
      {
        type: "heading1",
        text: "Learn more about our Beers",
        direction: "ltr",
      },
    ],
  },
}

const BigTextData: BigTextContent = {
  content: {
    bgColorClass: "bg-[#FE6334]",
    textColorClass: "text-[#FEE832]",
    sentence: "We Brew Our Beer With Love",
    maxWidth: 100,
    factor: 1
  },
};

const CtaData: CtaContent = {
  content: {
    ctaClasses: "custom-cta-class bg-indigo-200 text-white lg:py-12",
    titleClasses: "custom-title-class",
    paragraphClasses: "custom-paragraph-class font-medium",
    title: {
      type: "heading2",
      text: "Stay updated about what's happening in the Lab",
      direction: "ltr",
    },
    paragraph: {
      type: "paragraph",
      text: "What's fermenting, when are our next Worksops, which Ingrendients are we using....???",
      direction: "ltr",
    },
    button: {
      label: "Discover more...",
      type: "int",
      url: "/lab",
    },
    background_image: {
      dimensions: {
        width: 1920,

        height: 1080,
      },
      alt: "Lab Background",
      url: "/images/home/cta-1.jpeg",
      id: "cta-bg-001",
    },

    layout: "imageLeft", // Options: 'centered', 'imageLeft', 'imageRight'
  },
};





export default async function Index() {
  return (
    <div className="abl">
      <Hero content={HeroData.content} />
      <SkyDive content={SkyDivingData.content} />
      <div className="flex flex-col">
        <BigText content={BigTextData.content} />
        <Cta content={CtaData.content} />
      </div>
    </div>
  );
}