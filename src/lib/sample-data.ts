// 1. Importa il tipo necessario dal tuo file di tipi
import type { HeroContent } from "@/types";
import { SkyDivingContent } from "@/types";
import { CarouselSlideContent } from "@/types";

// 2. Definisci ed esporta la costante
export const sampleHeroContent: HeroContent = {
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
    button_text: "Our Beers",
    button_link: {
      link_type: "Web",
      url: "https://example.com",
      target: "_blank",
    },
    cans_image: {
      dimensions: {
        width: 1603,
        height: 1791,
      },
      alt: "All of the Fizzi Flavors",
      url: "https://images.prismic.io/fizzi/ZswEvEaF0TcGJYaB_all-cans-bunched.png?auto=format,compress",
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

export const sampleSkyDivingContent: SkyDivingContent = {
  content: {
    sentence: [
      {
        type: "heading1",
        text: "Learn more about our Beers",
        direction: "ltr",
      },
    ],
    can_image: {
      dimensions: {
        width: 1603,
        height: 1791,
      },
      alt: "Skydiving Can",
      url: "https://images.prismic.io/fizzi/ZswEvEaF0TcGJYaB_all-cans-bunched.png?auto=format,compress",
      id: "ZswEvEaF0TcGJYaB",
    },
    flavour: [
      {
        type: "paragraph",
        text: "grape",
        direction: "ltr",
      },
    ],
  },
};

export const sampleBigTextContent = {
  content: {
    bgColorClass: "bg-[#FE6334]",

    textColorClass: "text-[#FEE832]",

    sentence: "We\nBrew\nOur\nBeer\nWith\nLove",
  },
};

export const sampleCarouselContent: CarouselSlideContent = {
  content: {
    title: [{
      type: "heading2",
      text: "Discover Our New Drop",
      direction: "ltr",
    }],
    paragraph: [{
      type: "paragraph",
      text: "Explore our exciting new beers, crafted to delight your taste buds and elevate your beverage experience.",
      direction: "ltr",
    }],
    slides: [
      {
        can_image: {
          dimensions: {
            width: 1603,
            height: 1791,
          },
          alt: "Carousel Slide 1",
          url: "https://images.prismic.io/fizzi/ZswEvEaF0TcGJYaB_all-cans-bunched.png?auto=format,compress",
          id: "ZswEvEaF0TcGJYaB",
        },
        flavour: [
          {
            type: "paragraph",
            text: "lemonLime",
            direction: "ltr",
          },
        ],
        name: "Lemon Lime Fizzi",
        link: "https://example.com/lemon-lime-fizzi",
        description: "A refreshing soda with the rich taste of lemon and lime.",
        bgColor: "#164405",
        textColor: "#FFFFFF",
        khmerIngredients: true,
        category: "Limited Edition",
      },
      {
        can_image: {
          dimensions: {
            width: 1603,
            height: 1791,
          },
          alt: "Carousel Slide 2",
          url: "https://images.prismic.io/fizzi/ZswEvEaF0TcGJYaB_all-cans-bunched.png?auto=format,compress",
          id: "ZswEvEaF0TcGJYaB",
        },
        flavour: [
          {
            type: "paragraph",
            text: "blackCherry",
            direction: "ltr",
          },
        ],
        name: "Black Cherry Fizzi",
        link: "https://example.com/black-cherry-fizzi",
        description:
          "A refreshing soda with the rich taste of black cherries.",
        bgColor: "#572981",
        textColor: "#FFFFFF",
        khmerIngredients: true,
        category: "Limited Edition",
      },
    ],
  },
};
