import { Metadata } from "next";

import InteractiveCambodianMap from "@/components/InteractiveCambodianMap";
import BigText from "@/components/content/BigText";
import { sampleInteractiveCambodianMapContent, sampleLabBigTextContent} from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | The Lab Ingredients",
  description: "Discover the unique local ingredients used in Amara Beer Lab's craft beers, sourced from around the world to create exceptional flavors in Siem Reap, Cambodia",
};

export default function LabIngredients() {
    return (
    <div className="min-h-screen mt-24 lg:mt-16">
      <div className="w-full h-full px-4 lg:px-0">

      <InteractiveCambodianMap content={sampleInteractiveCambodianMapContent.content} />
      </div>
      <div className="flex items-center flex-wrap flex-col lg:flex-row">

      <div className="w-full lg:w-2/3 mt-16 lg:mt-0">
      
          <BigText  content={sampleLabBigTextContent.content} />
    
      </div>
      <div className="w-full lg:w-1/3 text-white h-full mt-16 lg:mt-0">
        <ul className="list-disc ps-8 h-full flex flex-col justify-between gap-y-8">
          <li>
            <p className="text-4xl font-bold">British Malts</p>
          </li>
          <li>
            <p className="text-4xl font-bold">Belgian Malts</p>
          </li>
          <li>
            <p className="text-4xl font-bold">German Malts</p>
          </li>
          <li>
            <p className="text-4xl font-bold">Australian Malts</p>
          </li>
          <li>
            <p className="text-4xl font-bold">American Hops</p>
          </li>
          <li>
            <p className="text-4xl font-bold">New Zealand Hops</p>
          </li>
          <li>
            <p className="text-4xl font-bold">German Hops</p>
          </li>
          <li>
            <p className="text-4xl font-bold">Canadian Yeast</p>
          </li>
          <li>
            <p className="text-4xl font-bold">Italian Yeast</p>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}
