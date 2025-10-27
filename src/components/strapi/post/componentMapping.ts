import Hero from "./hero/index";
import Paragraph from "./paragraph";
import Cta from "./cta";
import Quote from "./quote";
import Carousel from "./carousel";
// Importa altri componenti se necessari

const componentMapping: Record<string, React.FC<any>> = {
  hero: Hero,
  paragraph: Paragraph,
  cta: Cta,
  quote: Quote,
  carousel: Carousel
  // Aggiungi altri componenti qui
};

export default componentMapping;
