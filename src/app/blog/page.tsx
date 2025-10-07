import { Metadata } from "next";

import Link from "next/link";
import Cta from "@/components/content/Cta";
import BigText from "@/components/content/BigText";


const hero = {
    bgColorClass: "bg-[#C0F0F5]",

    textColorClass: "text-[#FF850E]",

    sentence: "We have so many Things to say!!!",
    maxWidth: 100,
    factor: 1
}

export default function Lab() {
    return (
        <div className="min-h-screen mt-16">

            <div >
                <BigText content={hero} />
                <div className="bg-secondary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-screen">
                    <Link href="/blog/activities" className="border-2 border-black rounded-lg m-8 flex flex-col justify-between items-center">
                        <h3 className="font-fatboy text-2xl text-center pt-4">Activities</h3>
                    </Link>
                    <Link href="/blog/news" className="border-2 border-black rounded-lg m-8 flex flex-col justify-between items-center">
                        <h3 className="font-fatboy text-2xl text-center pt-4">News</h3>
                    </Link>
                    <Link href="/blog/articles" className="border-2 border-black rounded-lg m-8 flex flex-col justify-between items-center">
                        <h3 className="font-fatboy text-2xl text-center pt-4">Articles</h3>
                    </Link>
                    <Link href="/blog/gallery" className="border-2 border-black rounded-lg m-8 flex flex-col justify-between items-center">
                        <h3 className="font-fatboy text-2xl text-center pt-4">Gallery</h3>
                    </Link>
                </div>
            </div>

        </div>
    );
}
