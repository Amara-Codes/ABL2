import { Metadata } from "next";
import BigText from "@/components/content/BigText";
import DomeGallery from '@/components/DomeGallery';

const Title = {
    bgColorClass: "bg-black",
    textColorClass: "text-secondary",
    sentence: "This is Amara Beer Lab",
    maxWidth: 70,
    factor: .8
}

export const metadata: Metadata = {
    title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Gallery of our Craft Beer Creations and Community Events",
    description: "Explore the vibrant gallery of Amara Beer Lab, a craft brewery in Siem Reap, Cambodia. Discover images showcasing our unique craft beer creations, brewing process, and community events that highlight our commitment to sustainability and local impact.",
};


export default function GalleryPage() {
    return (
        <div>
            <BigText content={Title} />
            <div className="w-dvw h-dvh lg:mt-8">
                <DomeGallery />
            </div>
        </div>
    );
}