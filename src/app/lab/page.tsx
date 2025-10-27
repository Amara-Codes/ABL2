import { Metadata } from "next";

import Cta from "@/components/content/Cta";
import { CtaContent } from "@/types";

import BigText from "@/components/content/BigText";
import MetaBalls from "@/components/MetaBalls";

const hero = {
  bgColorClass: "bg-[#FE6334]",
  textColorClass: "text-[#000000]",
  sentence: "The Beer Lab",
  maxWidth: 100,
  factor: 0.65
}

const firstCta: CtaContent = {
  content: {
    ctaClasses: "custom-cta-class bg-black p-4 lg:p-12 rounded-lg border-secondary border-2",
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

const secondCta: CtaContent = {
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

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | The Beer Lab",
  description: "Explore Amara Beer Lab, the craft brewery in Siem Reap. Discover how we use Khmer ingredients to create unique beers while promoting sustainability and community impact.",
};

export default function Lab() {
  return (
    <div className="min-h-screen mt-16">



      <div className="h-[50vh]">
        <MetaBalls
          color="#FE6334"
          cursorBallColor="#ff850e"
          cursorBallSize={0.5}
          ballCount={30}
          animationSize={10}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={1.5}
          speed={0.3}
        />
      </div>

      <div >
        <BigText content={hero} />
      </div>

      <div className="h-[30vh]">
        <MetaBalls
          color="#FE6334"
          cursorBallColor="#ff850e"
          cursorBallSize={0.5}
          ballCount={40}
          animationSize={12}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={1.5}
          speed={0.5}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <Cta content={firstCta.content} />
      </div>

      <div className="h-[80vh]">
        <MetaBalls
          color="#FE6334"
          cursorBallColor="#ff850e"
          cursorBallSize={0.5}
          ballCount={50}
          animationSize={20}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={1.8}
          speed={0.3}
        />
      </div>
      <Cta content={secondCta.content} />
    </div>
  );
}
