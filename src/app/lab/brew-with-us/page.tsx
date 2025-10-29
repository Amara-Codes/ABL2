
import { Metadata } from "next";
import BookAppointmentForm from "@/components/BookAppointmentForm";

export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Brew With Us",
  description: "Join Amara Beer Lab's Brew With Us program in Siem Reap, Cambodia. Learn the art of craft beer brewing through hands-on workshops and brewery visits. Discover sustainable brewing practices and be part of our community-focused brewery experience.",
};


export default function LabBrewWithUs() {
  return (
    <div className="min-h-screen mt-24 lg:mt-16">
      <div className="h-[50vh] mt-16 flex flex-col items-center">

        <h1 className="font-fatboy text-8xl text-primary h-1/2 flex items-end">Book a visit</h1>
        <p className="text-2xl text-white text-center">Come and visit our brewhouse, it's free.
          <br />
          you can also join our workshops, where you can learn how we brew our beer and much more</p>
      </div>
      <div className="flex px-16">
        <div className="w-1/2">
          <h3 className="text-primary font-medium text-4xl">Our next Workshops will be:</h3>
          <ul className="list-disc text-white ps-4">
            <li>
              <p className="text-white text-lg">--/--/----</p>
            </li>
            <li>
              <p className="text-white text-lg">--/--/----</p>
            </li>
            <li>
              <p className="text-white text-lg">--/--/----</p>
            </li>
          </ul>
        </div>
        <div className="w-1/2 flex flex-col gap-y-4">
          <BookAppointmentForm />
        </div>
      </div>

    </div>
  );
}
