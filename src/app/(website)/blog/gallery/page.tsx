import { Metadata } from "next";
import BigText from "@/components/content/BigText";
import Gallery from "@/components/GalleryClient";

export const metadata: Metadata = {
    title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Gallery of our Craft Beer Creations and Community Events",
    description: "Explore the vibrant gallery of Amara Beer Lab, a craft brewery in Siem Reap, Cambodia. Discover images showcasing our unique craft beer creations, brewing process, and community events that highlight our commitment to sustainability and local impact.",
};


const Title = {
    bgColorClass: "bg-black",
    textColorClass: "text-secondary",
    sentence: "This is Amara Beer Lab",
    maxWidth: 70,
    factor: .8
}

export default function GalleryPage() {
    return (
        <div>
            <div className="hidden lg:block">

            <BigText content={Title} />
            </div>
            <div className="w-dvw h-dvh lg:mt-8">
                <Gallery />
            </div>
        </div>
    );
}