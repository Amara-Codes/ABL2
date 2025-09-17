// Defines the structure for a rich text node (e.g., heading, paragraph).
export interface RichTextNode {
  type: 'heading1' | 'heading2' | 'paragraph';
  text: string;
  direction: 'ltr' | 'rtl';
}

// Defines the structure for a link field.
export interface LinkField {
  link_type: 'Web' | 'Internal' | string;
  url: string;
  target: string;
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
        button_text: string;
        button_link: LinkField;
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
    sentence: string
  }
}
