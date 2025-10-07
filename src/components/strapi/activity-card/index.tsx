import React from "react";
import ThickChevron from "@/components/ui/ThickChevron"
import Link from "next/link";
import Image from "next/image";

interface ActivityCardProps {
  title: string;
  caption?: string;
  thumbnailUrl?: string;
  completed: boolean;
  slug: string;
  type: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  caption,
  thumbnailUrl,
  completed,
  slug,
  type,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-6 flex">
      <Link
        className="w-full h-full relative flex flex-col items-center text-ui-fg-base font-bold"
        href={{
          pathname: `/${type}/${slug}`
        }}
      >
        <div className="flex justify-between">
          <div className={`big-square w-10 h-10 border-4 border-koiWhite ${completed ? 'checked' : ''}`}></div>
          <div className="flex-1 flex-justify-between">
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill={true}
                className="object-cover rounded-md"
              />
            )}
            <div className="ps-8">
              <h2 className="text-xl font-bold text-ui-fg-base mb-2">{title}</h2>
              {caption && <p className="text-koiYellow font-light overflow-hidden text-ellipsis line-clamp-3">{caption}</p>}
              <div className="mt-8 flex w-full justify-end items-end hover:text-koiOrange transition duration-500">
                <div className="flex items-center">
                  <p className="pb-1 pe-2 font-fatboy mt-2">Read more</p>
                  <ThickChevron direction="right" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default ActivityCard;
