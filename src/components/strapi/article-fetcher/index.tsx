import React, { useEffect, useState } from "react";
import qs from "qs";
import ArticleCard from "../article-card";
import SkeletonArticles from "@/components/skeletons/templates/skeleton-articles";

type ArticleCategory = "news" | "activities" | "blog" | "*";

type TransformedDataItem = {
  Title: string;
  Slug: string;
  Category: string;
  Summary: string | null;
  ThumbnailUrl?: string;
  Content?: any[];
  Id?: string;
  Completed: boolean;
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
        Content,
        Id: item.id,
        Completed: attributes.ActivityCompleted || false,
      };
    }),
  };
}

async function getArticles(
  category: ArticleCategory = "*",
  limit?: number,
  sort: "asc" | "desc" = "desc",
  page: number = 1
) {
  const baseUrl = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL ?? "http://localhost:1337";
  const path = "/api/articles";

  const url = new URL(path, baseUrl);
  const query: Record<string, any> = {
    populate: {
      Thumbnail: { fields: ["formats"] },
      Content: { fields: "*" },
      ActivityCompleted: { fields: "*" }, // Assicurati che questo sia popolato
    },
    pagination: {
      page,
      pageSize: limit,
    },
    // 'sort' verrà aggiunto dinamicamente qui sotto
  };

  if (category !== "*") {
    query.filters = { Category: category };
  }

  // --- MODIFICA PER L'ORDINAMENTO ---
  // Definisci l'ordinamento primario (quello passato come argomento)
  const primarySort = `createdAt:${sort}`;

  if (category === "activities") {
    // Se la categoria è 'activities', aggiungi 'ActivityCompleted:desc' come
    // ordinamento *primario*, e 'createdAt' come secondario.
    // 'desc' mette i valori 'true' prima dei 'false' in Strapi.
    query.sort = [`ActivityCompleted:desc`, primarySort];
  } else {
    // Altrimenti, usa solo l'ordinamento primario
    query.sort = [primarySort];
  }
  // --- FINE MODIFICA ---

  url.search = qs.stringify(query);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return transformData(data);
}
interface ArticlesFetcherProps {
  articleCategory?: ArticleCategory;
  limit?: number;
  sort?: "asc" | "desc";
  currentPage?: number;
}

export default function ArticlesFetcher({
  articleCategory = "*",
  limit = 100,
  sort = "desc",
  currentPage = 1,
}: ArticlesFetcherProps) {
  const [articles, setArticles] = useState<TransformedDataItem[]>([]); 
  const [isLoading, setIsLoading] = useState(true); // Manage loading state explicitly

  useEffect(() => {
    setIsLoading(true); // Start loading
    getArticles(articleCategory, limit, sort, currentPage)
      .then((data) => {
        setArticles(data.data);
        setIsLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Stop loading in case of error
      });
  }, [articleCategory, limit, sort, currentPage]);

  return (
    <div className="small:mx-12">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12'>
        {isLoading ? ( // Conditionally render skeleton loader while loading
          <SkeletonArticles count={limit} />
        ) : (
          articles.map((article) => (
            <ArticleCard
              key={article.Slug}
              title={article.Title}
              caption={article.Summary ?? ""}
              thumbnailUrl={article.ThumbnailUrl}
              slug={article.Slug}
              type={article.Category}
              completed={article.Completed}
            />
          ))
        )}
      </div>
    </div>
  );
}