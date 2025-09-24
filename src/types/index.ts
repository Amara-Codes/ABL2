// Defines the structure for a rich text node (e.g., heading, paragraph).
export interface RichTextNode {
  type: 'heading1' | 'heading2' | 'paragraph';
  text: string;
  direction: 'ltr' | 'rtl';
}

// Defines the structure for a link field.
export interface LinkField {
  label: string;
  type: 'int' | 'ext' | string;
  url: string;
}

// Defines the structure for an image field.
export interface ImageField {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string;
  url: string;
  id: string;
}

// Defines the structure for the content of a Hero.
export interface HeroContent {
    content: {
        heading: RichTextNode[];
        subheading: RichTextNode[];
        body: RichTextNode[];
        button: LinkField;
        cans_image: ImageField;
        second_heading: RichTextNode[];
        second_body: RichTextNode[];
    }
}

export interface SkyDivingContent {
    content: {
        sentence: RichTextNode[];
        can_image: ImageField;
        flavour: RichTextNode[];
    }
}

export interface CarouselSlideElement {
        can_image: ImageField;
        flavour: RichTextNode[];
        name: string;
        link: string;
        description: string;
        bgColor: string;
        textColor: string;
        khmerIngredients: boolean;
        category: string;
}

export interface CarouselSlideContent {
  content : {
    title: RichTextNode[];
    paragraph: RichTextNode[];
    slides: CarouselSlideElement[]
  }
}

export interface BigTextContent {
  content : {
    bgColorClass: string;
    textColorClass: string;
    sentence: string;
    maxWidth: number,
    factor: number
  }
}

export interface CtaContent {
    content: {
      ctaClasses?: string;
      titleClasses?: string;
      paragraphClasses?: string;
        title: RichTextNode;
        paragraph: RichTextNode;
        button: LinkField;
        background_image: ImageField;
        image: ImageField;
        layout: 'centered' | 'imageLeft' | 'imageRight';
    }
}

export type RegionID = `KH${number}`;

export interface RegionInfo {
  name: string;
  ingredient: string;
  usage: string;
  beers: string[];
}

export interface InteractiveCambodianMapContent {
    content: {
        title: RichTextNode[];
        paragraph: RichTextNode[];
        regionData: Record<RegionID, RegionInfo>;
    }
}
