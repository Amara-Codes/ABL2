import { Metadata } from "next";
import { InteractiveCambodianMapContent, BigTextContent, CtaContent } from "@/types";
import InteractiveCambodianMap from "@/components/InteractiveCambodianMap";
import BigText from "@/components/content/BigText";
import Cta from "@/components/content/Cta";

export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | The Lab Ingredients",
  description: "Discover the unique local ingredients used in Amara Beer Lab's craft beers, sourced from around the world to create exceptional flavors in Siem Reap, Cambodia",
};

const InteractiveCambodianMapData: InteractiveCambodianMapContent =
{
  content: {
    title: [
      {
        type: "heading2",
        text: "Explore Cambodian Ingredients",
        direction: "ltr",
      },
    ],
    paragraph: [
      {
        type: "paragraph",
        text: "Discover the unique ingredients from different regions of Cambodia that we use in our craft beers.",
        direction: "ltr",
      },
    ],
    regionData: {
      KH7: {
        name: "Kampot",
        ingredient: "Kampot Pepper",
        usage: "We use this spice in our saison to add a unique spicy kick.",
        beers: ["Vaurien Puni"],
      },
      KH5: {
        name: "Kampong Speu",
        ingredient: "Organic Palm Sugar",
        usage:
          "We use this sugar in our wheat beers to add a fresh, citrusy aroma while also enhancing the body.",
        beers: ["Low Gravity"],
      },
      KH21: {
        name: "Siem Reap",
        ingredient: "Pkha Rumbeng",
        usage:
          "We use this rice in our Golden Ale to add a smooth, slightly sweet flavor and a crisp finish.",
        beers: ["Kome Ha"],
      },
    },
  },
};

const BigTextData: BigTextContent = {
  content: {
    bgColorClass: "bg-[#FE6334]",

    textColorClass: "text-[#34d399]",

    sentence: "Where do the other Ingredients come from ???",
    maxWidth: 100,
    factor: 0.65
  },
};

const CtaData: CtaContent = {
  content: {
    ctaClasses: "custom-cta-class bg-indigo-200 text-white lg:py-12",
    titleClasses: "custom-title-class",
    paragraphClasses: "custom-paragraph-class font-medium",
    bgColorClass: "bg-amber-700",
    title: {
      type: "heading2",
      text: "Discover Our Khmer Ingredient Beers",
      direction: "ltr",
    },
    paragraph: {
      type: "paragraph",
      text: "Every drop we release highlights unique ingredients sourced from Cambodia and beyond. Discover how we use these special components to craft beers that tell a story of place and passion.",
      direction: "ltr",
    },
    button: {
      label: "Our Khmer Beers",
      type: "int",
      url: "/beers/khmer-ingredients",
    },
    background_image: {
      dimensions: {
        width: 1920,

        height: 1080,
      },
      alt: "Lab Background",
      url: "/images/lab/ingredients/cta-1.png",
      id: "cta-bg-001",
    },

    layout: "imageLeft", // Options: 'centered', 'imageLeft', 'imageRight'
  },
};


export default function LabIngredients() {
  return (
    <div className="min-h-screen mt-24 lg:mt-16">
      <div className="w-full h-full px-4 lg:px-0">

        <InteractiveCambodianMap content={InteractiveCambodianMapData.content} />
      </div>
      <div className="flex items-center flex-wrap flex-col lg:flex-row">

        <div className="w-full lg:w-2/3 mt-16 lg:mt-0">

          <BigText content={BigTextData.content} />

        </div>
        <div className="w-full lg:w-1/3 text-white h-full mt-16 lg:mt-0">
          <ul className="list-disc ps-8 h-full flex flex-col justify-between gap-y-8">
            <li>
              <p className="text-4xl font-bold">British Malts</p>
            </li>
            <li>
              <p className="text-4xl font-bold">Belgian Malts</p>
            </li>
            <li>
              <p className="text-4xl font-bold">German Malts</p>
            </li>
            <li>
              <p className="text-4xl font-bold">Australian Malts</p>
            </li>
            <li>
              <p className="text-4xl font-bold">American Hops</p>
            </li>
            <li>
              <p className="text-4xl font-bold">New Zealand Hops</p>
            </li>
            <li>
              <p className="text-4xl font-bold">German Hops</p>
            </li>
            <li>
              <p className="text-4xl font-bold">Canadian Yeast</p>
            </li>
            <li>
              <p className="text-4xl font-bold">Italian Yeast</p>
            </li>
          </ul>
        </div>
        <div className="w-full mt-16">
          <Cta content={CtaData.content} />
        </div>
      </div>
    </div>
  );
}
