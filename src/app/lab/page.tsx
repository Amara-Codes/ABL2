import { Metadata } from "next";

import Cta from "@/components/content/Cta";
import { CtaContent } from "@/types";
import CurrentlyBrewing from "@/components/CurrentlyBrewing";
import BigText from "@/components/content/BigText";
import { sampleLabCta1Content, sampleLabCta2Content } from "@/lib/sample-data";

const hero = {
  bgColorClass: "bg-[#FE6334]",
  textColorClass: "text-[#000000]",
  sentence: "The Beer Lab",
  maxWidth: 100,
  factor: 0.65
}

const firstCta: CtaContent = {
  content: {
    ctaClasses: "custom-cta-class bg-black pb-8", 
    titleClasses: "custom-title-class text-white",
    paragraphClasses: "custom-paragraph-class text-white",
    title: {
      type: "heading2",
      text: "Discover where we source and how we use our ingredients",
      direction: "ltr",
    },
    paragraph: {
      type: "paragraph",
      text: "The ingredients we use are one of the pillars of Amara Beer Lab. Choosing the right ones means carefully selecting how our beer will taste, use cretivity, but also celebrate the country we are, Cambodia",
      direction: "ltr",
    },
    button: {
      label: "Discover our ingredients",
      type: "int",
      url: "/lab/ingredients",
    },
    background_image: {
      dimensions: {
        width: 1920,

        height: 1080,
      },
      alt: "Our Ingredients Background",
      url: "/images/lab/cta-1.gif",
      id: "cta-bg-001",
    },
   
    layout: "imageLeft", // Options: 'centered', 'imageLeft', 'imageRight'
  },
};

const secondCta : CtaContent = {
  content: {
    ctaClasses: "custom-cta-class bg-indigo-200",
    titleClasses: "custom-title-class",
    paragraphClasses: "custom-paragraph-class",
    title: {
      type: "heading2",
      text: "Are you curious about how a brewery works?",
      direction: "ltr",
    },
    paragraph: {
      type: "paragraph",
      text: "Book an appointment, just to visit our brewery or to become a brewer for one or more days, partecipating our workshops",
      direction: "ltr",
    },
    button: {
      label: "Book now",
      type: "int",
      url: "/lab/brew-with-us",
    },
    background_image: {
      dimensions: {
        width: 1920,

        height: 1080,
      },
      alt: "Yeast Cells Background",
      url: "/images/lab/cta-2.jpeg",
      id: "cta-bg-002",
    },

    layout: "centered", // Options: 'centered', 'imageLeft', 'imageRight'
  },
};

export default function Lab() {
  return (
    <div className="min-h-screen mt-16">

      <div >
        <BigText content={hero} />
      </div>

      <Cta content={firstCta.content} />
      <div className="py-8 mt-32">

      </div>
      <Cta content={secondCta.content} />
    </div>
  );
}
