import { Metadata } from "next";
import GenericWrapper from "@/components/blog/GenericWrapper"


export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | News and Insights",
  description: "Stay updated with the latest news and articles covering a wide range of topics.",
}


export default function ActivitiesPage() {
  return (
    <div>
      <GenericWrapper articlesPerPage={5} contentType="activities"/>
    </div>
  );
}