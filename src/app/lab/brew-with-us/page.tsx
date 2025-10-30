
import { Metadata } from "next";
import BookAppointmentForm from "@/components/BookAppointmentForm";

export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Brew With Us",
  description: "Join Amara Beer Lab's Brew With Us program in Siem Reap, Cambodia. Learn the art of craft beer brewing through hands-on workshops and brewery visits. Discover sustainable brewing practices and be part of our community-focused brewery experience.",
};


export default function LabBrewWithUs() {
  return (
    <div className="min-h-screen mt-24 lg:mt-16">
      <div className="h-screen mt-16 flex flex-col justify-centeritems-center">

        <h1 className="font-fatboy text-8xl text-primary h-1/2 flex items-end justify-center text-center">We are sorry</h1>
        <p className="text-2xl text-white text-center">We're still working on that</p>
      </div>
    </div>
  );
}
