import { Metadata } from "next";
import GenericWrapper from "@/components/BlogGenericWrapper"


export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Blog and Stories",
  description: "Discover the social initiatives of our brewery, from community engagement to sustainability projects.",
}


export default function ArticlesPage() {
  return (
    <div>
      <GenericWrapper articlesPerPage={3} contentType="blog"/>
    </div>
  );
}