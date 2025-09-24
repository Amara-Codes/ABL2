// components/InteractiveCambodianMap/data/cambodiaIngredients.ts

// Usa gli ID esatti del tuo SVG. Es: 'KH7' per Kampot.
export type RegionID = `KH${number}`;

export interface RegionInfo {
  name: string;
  ingredient: string;
  usage: string;
  beers: string[];
}

export const regionData: Record<RegionID, RegionInfo> = {
  
  'KH7': {
    name: 'Kampot',
    ingredient: 'Kampot Pepper',
    usage: 'We use this spice in our saison to add a unique spicy kick.',
    beers: ['Vaurien Puni'],
  },
  
  'KH5': {
    name: 'Kampong Speu',
    ingredient: 'Organic Palm Sugar',
    usage: 'We use this sugar in our wheat beers to add a fresh, citrusy aroma while also enhancing the body.',
    beers: ['Low Gravity'],
  },
 
  'KH21': {
    name: 'Siem Reap',
    ingredient: 'Pkha Rumbeng',
    usage: 'We use this rice in our Golden Ale to add a smooth, slightly sweet flavor and a crisp finish.',
    beers: ['Kome Ha'],
  },
  // Aggiungi qui altre regioni che vuoi evidenziare...
};