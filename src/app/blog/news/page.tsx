import { Metadata } from "next";
import GenericWrapper from "@/components/BlogGenericWrapper"

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Activities: Engage & Explore",
  description: "Discover the social initiatives of our brewery, from community engagement to sustainability projects.",
}


export default function NewsPage() {
  return (
    <div>
      <GenericWrapper articlesPerPage={5} contentType="news"/>
    </div>
  );
}