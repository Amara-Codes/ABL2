// Defines the structure for a rich text node (e.g., heading, paragraph).
export interface RichTextNode {
  type: 'heading1' | 'heading2' | 'paragraph';
  text: string;
  direction?: 'ltr' | 'rtl';
}

// Defines the structure for a link field.
export interface LinkField {
  label: string;
  type: 'int' | 'ext' | string;
  url: string;
  classes?: string;
}

// Defines the structure for an image field.
export interface ImageField {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string;
  url: string;
  id?: string;
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
    }
}

export interface CarouselSlideElement {
        textureUrl: ImageField;
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
    title?: RichTextNode[];
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
      bgColorClass?: string;
      paragraphClasses?: string;
        title: RichTextNode;
        paragraph: RichTextNode;
        button: LinkField;
        background_image?: ImageField;
        image?: ImageField;
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

export type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

export type GenericWrapperProps = {
  contentType: 'blog' | 'news' | 'activities'
  articlesPerPage: number
} 


export type BeerData = {
  id: number;
  imageUrl: string;
  name: string;
};

export type DropData = {
  id: number;
  name: string;
  description: string;
  beers: BeerData[];
  metaTitle: string;
  metaDescription: string;
};

export interface BlogPostButtonElement {
    ButtonLabel?: string;
    ButtonCssClasses?: string;
    ButtonLink?: string;
    ButtonType?: string;
  }

  export interface BlogPostCarouselElement {
    CarouselTitle?: string;
    CarouselSubtitle?: string;
    CarouselCssClasses?: string;
    CarouselImgs?: string[];
  }

  export interface BlogPostCtaElement {
    CtaTitle?: string;
    CtaCaption?: string;
    CtaCssClasses?: string;
    CtaType?: string;
    CtaButton?: BlogPostButtonElement;
    CtaBgImg?: string;
  }

  export interface BlogPostHeroElement {
    HeroTitle?: string;
    HeroSubtitle?: string;
    HeroCssClasses?: string;
    HeroButton?: BlogPostButtonElement;
    HeroBgImg?: string;
    HeroWrapperCssClasses?: string;
    HeroWrapperBgImg?: string;
  }

  export interface BlogPostParagraphElement {
    ParagraphContent: string; 
    ParagraphCssClasses?: string; 
    ParagraphImg?: string;
    ParagraphImgPosition ?: string;
  }
  
  export interface BlogPostQuoteElement {
    QuoteContent?: string;
    QuoteAuthor?: string;
    QuoteCssClasses?: string;
    QuoteAuthorDates?: string;
    QuoteAuthorInfo?: string;
  }
  