import { Metadata } from "next";

import BigText from "@/components/content/BigText";
import FlowingMenu from "@/components/FlowingMenu";

export const metadata: Metadata = {
    title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Articles, News & Activities on Craft Beer and Sustainability",
    description: "Stay updated with Amara Beer Lab's blog featuring articles, news, and activities about our craft beers, sustainability efforts, and community impact in Siem Reap, Cambodia. Explore our latest updates and insights into the world of craft brewing.",
};

const MenuItems = [
    { link: '/blog/articles', text: 'Articles', image: '/images/blog/1.jpg' },
    { link: '/blog/news', text: 'News', image: '/images/blog/2.jpg' },
    { link: '/blog/activities', text: 'Activities', image: '/images/blog/3.jpg' },
    { link: '/blog/gallery', text: 'Gallery', image: '/images/blog/4.jpg' }
];


const HeroData = {
    bgColorClass: "bg-[#C0F0F5]",
    textColorClass: "text-[#FF850E]",
    sentence: "We have so many Things to say!!!",
    maxWidth: 100,
    factor: 1
}


export default function BlogPage() {
    return (
        <div className="min-h-screen mt-16">

            <div >
                <BigText content={HeroData} />
                <div className="relative h-[600px]">
                    <FlowingMenu items={MenuItems} backgroundColor="#FF850E"/>
                </div>
            </div>

        </div>
    );
}
