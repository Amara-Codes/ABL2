import React from "react";
import qs from "qs";
import ArticleCard from "../article-card";

type TransformedDataItem = {
    Title: string;
    Slug: string;
    Category: string;
    Summary: string | null;
    ThumbnailUrl?: string;
    Id?: string;
};


async function getArticleById(id: string): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL ?? "http://localhost:1337";
    const path = `/api/articles/${id}`;
    const url = new URL(path, baseUrl);
    const query: Record<string, any> = {
        populate: "*",
    };
    url.search = qs.stringify(query);

    const res = await fetch(url);

    if (!res.ok) {
        console.error(`Failed to fetch article with id ${id}`);
        return null;
    }

    const data = await res.json();
    return data.data.attributes;
}


async function transformData(tags: any, currentArticleId: string): Promise<TransformedDataItem[]> {
    const transformedArray: TransformedDataItem[] = []; 
    if (tags.length) {
        for (const tag of tags) {
            const articles = tag.attributes.articles;
            if (articles?.data?.length) {
                const relatedArticles = articles.data.filter((e: { id: string; }) => e.id !== currentArticleId);
                for (const item of relatedArticles) {
                    const attributes = item.attributes;

                    // Fetch article details to get the ThumbnailUrl
                    const articleDetails = await getArticleById(item.id);
                    const ThumbnailUrl = articleDetails?.Thumbnail?.data?.attributes?.formats?.small?.url;

                    transformedArray.push({
                        Title: attributes.Title,
                        Slug: attributes.Slug,
                        Category: attributes.Category,
                        Summary: attributes.Summary,
                        ThumbnailUrl,
                        Id: item.id,
                    });
                }
            }
        }
    }

    return transformedArray; 
}


async function getArticles(tags: string[], currentArticleId: string): Promise<TransformedDataItem[]> {
    if (!tags || currentArticleId === "") {
        return [];
    } 

    const baseUrl = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL ?? "http://localhost:1337";
    const path = "/api/tags";

    const url = new URL(path, baseUrl);
    const query: Record<string, any> = {
        populate: "*",
    };

    url.search = qs.stringify(query);
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }

    const data = await res.json();

    const matchingTags = data.data.filter((item: any) => {
     return tags.includes(item.id.toString())
    });



    const articles = await transformData(matchingTags, currentArticleId);
    return articles;
}




interface RelatedArticlesFetcherProps {
    tags?: string[],
    currentArticleId?: string 
}

export default async function RelatedArticlesFetcher({
    tags = [],
    currentArticleId = ""
}: RelatedArticlesFetcherProps) {
    let articles: TransformedDataItem[] = [];

    if (tags) {
        articles = await getArticles(tags, currentArticleId);
    }

    return (
        <div className="mt-16">
            {tags && articles.length > 0 && (
                <div className="my-16">
                    <div className="text-center">
                        <h3 className="capitalize text-koiRed text-4xl font-bold">
                            Related Articles
                        </h3>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mb-24 pb-12">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.Slug}
                        title={article.Title}
                        caption={article.Summary ?? ""}
                        thumbnailUrl={article.ThumbnailUrl}
                        slug={article.Slug}
                        type={article.Category}
                    />
                ))}
            </div>
        </div>
    );
}
