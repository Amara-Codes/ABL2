// app/sitemap.ts

import { MetadataRoute } from "next";

// Definisci il tuo URL di base
const BASE_URL =
  process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || "https://tuo-dominio.com";

// Funzione helper per fetchare i dati da Strapi (meglio se la metti in un file separato)
async function fetchStrapiData(endpoint: string) {
  const fetchUrl = `${BASE_URL}/api/${endpoint}`;

  console.log("url fetch sitemap:", fetchUrl);
  // Assicurati di gestire il token API se Strapi non è pubblico
  const res = await fetch(fetchUrl, {
    next: { revalidate: 60 }, // Opzionale: revalida i dati della sitemap ogni 60 sec
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data from Strapi");
  }

  const json = await res.json();
  const data = json.data;
  console.log("data fetch sitemap:", data);
  return json.data; // Strapi V4 di solito wrappa i dati in .data
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Aggiungi le tue pagine statiche
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://amarabeerlab.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://amarabeerlab.com/contacts",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://amarabeerlab.com/beers",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://amarabeerlab.com/khmer-ingredients",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://amarabeerlab.com/brewery",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://amarabeerlab.com/lab",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://amarabeerlab.com/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: "https://amarabeerlab.com/lab/ingredients",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://amarabeerlab.com/lab/brew-with-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://amarabeerlab.com/blog/articles",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://amarabeerlab.com/blog/activities",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://amarabeerlab.com/blog/news",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://amarabeerlab.com/blog/gallery",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // eslint-disable-next-line
  const articles: any[] = await fetchStrapiData("articles"); // Sostituisci 'articoli' con il tuo endpoint
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://amarabeerlab.com/blog/${article.attributes.Slug.replace(/\s+/g, "-").toLowerCase()}`,
    lastModified: new Date(article.attributes.updatedAt),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  // eslint-disable-next-line
  const products: any[] = await fetchStrapiData("beers"); // Sostituisci 'prodotti' con il tuo endpoint
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://amarabeerlab.com/beer/${product.attributes.name.replace(/\s+/g, "-").toLowerCase()}`,
    lastModified: new Date(product.attributes.updatedAt),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  // eslint-disable-next-line
  const categories: any[] = await fetchStrapiData("categories");
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `https://amarabeerlab.com/beers/category/${category.attributes.name.replace(/\s+/g, "-").toLowerCase()}`,
    lastModified: new Date(category.attributes.updatedAt),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  // eslint-disable-next-line
  const drops: any[] = await fetchStrapiData("drops");
  const dropRoutes: MetadataRoute.Sitemap = drops.map((drop) => ({
    url: `https://amarabeerlab.com/beers/drop/${drop.attributes.name.replace(/\s+/g, "-").toLowerCase()}`,
    lastModified: new Date(drop.attributes.updatedAt),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...dropRoutes,
  ];
}
