import { Metadata } from "next";

import Cta from "@/components/content/Cta";
import CurrentlyBrewing from "@/components/CurrentlyBrewing";
import BigText from "@/components/content/BigText";
import {sampleLabCta1Content, sampleLabCta2Content} from "@/lib/sample-data";

const hero = { bgColorClass: "bg-[#FE6334]",

    textColorClass: "text-[#000000]",

    sentence: "The Beer Lab",
    maxWidth: 100,
    factor: 0.65}

export default function Lab() {
    return (
    <div className="min-h-screen mt-16">

      <div >
        <BigText content={hero} />
      </div>

      <Cta content={sampleLabCta1Content.content} />
      <div className="py-8">
       <CurrentlyBrewing /> 
      </div>
      <Cta content={sampleLabCta2Content.content} />
    </div>
  );
}
