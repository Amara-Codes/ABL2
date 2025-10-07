import React from "react";
import qs from "qs";
import ActivityCard from "../activity-card";

type TransformedDataItem = {
  Title: string;
  Slug: string;
  Category: string;
  Summary: string | null;
  ThumbnailUrl?: string;
  Completed?: boolean;
  Content?: any[];
  Id?: string;
};

type TransformedJson = {
  data: TransformedDataItem[];
};

function transformData(json: any): TransformedJson {
  return {
    data: json.data.map((item: any) => {
      const attributes = item.attributes;
      const ThumbnailUrl = attributes.Thumbnail?.data?.attributes?.formats?.small?.url;

      const Content = attributes.Content?.map((contentItem: any) => {
        const Component = contentItem["__component"].split(".")[1];
        return { ...contentItem, Component };
      });

      return {
        Title: attributes.Title,
        Slug: attributes.Slug,
        Category: attributes.Category,
        Summary: attributes.Summary,
        ThumbnailUrl,
        Completed: attributes.ActivityCompleted,
        Content,
        Id: item.id
      };
    }),
  };
}

async function getActivities(limit?: number) {
  const baseUrl = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL ?? "http://localhost:1337";
  const path = "/api/articles";

  const url = new URL(path, baseUrl);
  const query: Record<string, any> = {
    populate: {
      Thumbnail: { fields: ["formats"] },
      Content: { fields: "*" },
      ActivityCompleted: {fields: "*"}
    },
    pagination: {},
    sort: ["ActivityCompleted:desc", "createdAt:desc"]
  };

  query.filters = { Category: "activities" };

  if (limit) {
    query.pagination.limit = limit;
  }

  url.search = qs.stringify(query);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return transformData(data);
}

interface ActivitiesFetcherProps {
  limit?: number;
}

export default async function ActivitiesFetcher({
  limit
}: ActivitiesFetcherProps) {
  let articles;
  articles = await getActivities(limit);

  return (
    <div className="small:mx-12">
      <div className="grid grid-cols-1 lg:mb-16 pb-12">
        {articles.data.map((article) => (
            <ActivityCard
              key={article.Slug}
              title={article.Title}
              caption={article.Summary ?? ''}
              thumbnailUrl={article.ThumbnailUrl}
              completed={article.Completed ?? false}              
              slug={article.Slug}
              type={article.Category}
            />
        ))}
      </div>
    </div>
  );
}
