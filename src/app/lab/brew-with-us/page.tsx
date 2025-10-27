
import { Metadata } from "next";
import BookAppointmentForm from "@/components/BookAppointmentForm";

export const metadata: Metadata = {
  title: "Brew With Us - Book a Visit | ABL Brewing Co",
  description:
    "Book a visit to ABL Brewing Co and explore our brewhouse. Join our workshops to learn about brewing and more. Free visits available!",
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
