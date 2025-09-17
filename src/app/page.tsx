import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import Hero from "@/components/content/Hero";
import SkyDive from "@/components/content/SkyDive";
import BigText from "@/components/content/BigText";
import Carousel from "@/components/content/Carousel";
import { sampleHeroContent, sampleSkyDivingContent, sampleBigTextContent, sampleCarouselContent } from "@/lib/sample-data";



export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}


export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");
  console.log(home)
  console.log(home.data)
  console.log(JSON.stringify(home.data.slices, null, 2))
  return (
    <div>
      <Hero content={sampleHeroContent.content} />
      <SkyDive content={sampleSkyDivingContent.content} />
      <BigText content={sampleBigTextContent.content} />
      <Carousel content={sampleCarouselContent.content} />
    </div>
  );
}
