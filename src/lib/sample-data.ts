// 1. Importa il tipo necessario dal tuo file di tipi
import type { HeroContent } from "@/types";
import { SkyDivingContent } from "@/types";
import { CarouselSlideContent } from "@/types";
import {BigTextContent} from "@/types"
import { CtaContent } from "@/types";
import { InteractiveCambodianMapContent } from "@/types";

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
    button: {
      label: "Our Beers",
      type: "ext",
      url: "https://example.com",
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

export const sampleBigTextContent: BigTextContent = {
  content: {
    bgColorClass: "bg-[#FE6334]",

    textColorClass: "text-[#FEE832]",

    sentence: "We Brew Our Beer With Love",
    maxWidth: 100,
    factor: 1
  },
};

export const sampleLabBigTextContent: BigTextContent = {
  content: {
    bgColorClass: "bg-[#FE6334]",

    textColorClass: "text-[#34d399]",

    sentence: "Where do the other Ingredients come from ???",
    maxWidth: 100,
    factor: 0.65
  },
};

export const sampleBigTextContent2 = {
  content: {
    bgColorClass: "bg-black",

    textColorClass: "text-[#FEE832]",

    sentence: "Why We Opened a Brewery in Siem Reap ???",
    maxWidth: 100,
     factor: 1
  },
};

export const sampleCarouselContent: CarouselSlideContent = {
  content: {
    title: [
      {
        type: "heading2",
        text: "Discover Our New Drop",
        direction: "ltr",
      },
    ],
    paragraph: [
      {
        type: "paragraph",
        text: "Explore our exciting new beers, crafted to delight your taste buds and elevate your beverage experience.",
        direction: "ltr",
      },
    ],
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
        description: "A refreshing soda with the rich taste of black cherries.",
        bgColor: "#572981",
        textColor: "#FFFFFF",
        khmerIngredients: true,
        category: "Limited Edition",
      },
    ],
  },
};

export const sampleCtaContent: CtaContent = {
  content: {
    ctaClasses: "custom-cta-class bg-indigo-200",
    titleClasses: "custom-title-class",
    paragraphClasses: "custom-paragraph-class",
    title: {
      type: "heading2",
      text: "Stay updated about what's happening in the Lab",
      direction: "ltr",
    },
    paragraph: {
      type: "paragraph",
      text: "what's fermenting, when are our next worksops, which ingrendients are we using....",
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
      alt: "Newsletter Background",
      url: "https://images.newscientist.com/wp-content/uploads/2023/11/08134121/SEI_179306087.jpg",
      id: "newsletter-bg-001",
    },
    image: {
      dimensions: {
        width: 300,

        height: 300,
      },
      alt: "Newsletter Icon",
      url: "https://images.prismic.io/fizzi/newsletter-icon.png?auto=format,compress",
      id: "newsletter-icon-001",
    },
    layout: "imageLeft", // Options: 'centered', 'imageLeft', 'imageRight'
  },
};


export const sampleLabCta1Content: CtaContent = {
  content: {
    ctaClasses: "custom-cta-class bg-indigo-200",
    titleClasses: "custom-title-class",
    paragraphClasses: "custom-paragraph-class",
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
      alt: "Newsletter Background",
      url: "https://images.prismic.io/fizzi/newsletter-background.jpg?auto=format,compress",
      id: "newsletter-bg-001",
    },
    image: {
      dimensions: {
        width: 300,

        height: 300,
      },
      alt: "Newsletter Icon",
      url: "https://images.prismic.io/fizzi/newsletter-icon.png?auto=format,compress",
      id: "newsletter-icon-001",
    },
    layout: "imageLeft", // Options: 'centered', 'imageLeft', 'imageRight'
  },
};


export const sampleLabCta2Content: CtaContent = {
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
      alt: "Newsletter Background",
      url: "https://images.prismic.io/fizzi/newsletter-background.jpg?auto=format,compress",
      id: "newsletter-bg-001",
    },
    image: {
      dimensions: {
        width: 300,

        height: 300,
      },
      alt: "Newsletter Icon",
      url: "https://images.prismic.io/fizzi/newsletter-icon.png?auto=format,compress",
      id: "newsletter-icon-001",
    },
    layout: "centered", // Options: 'centered', 'imageLeft', 'imageRight'
  },
};

export const sampleInteractiveCambodianMapContent: InteractiveCambodianMapContent =
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
// Aggiungi altre costanti di esempio se necessario...
