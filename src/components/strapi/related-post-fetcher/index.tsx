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


async function transformData(tags: any): Promise<TransformedDataItem[]> {
    const transformedArray: TransformedDataItem[] = []; // Array per raccogliere gli oggetti trasformati
    if (tags.length) {
        for (const tag of tags) {
            const articles = tag.attributes.articles;
            if (articles?.data?.length) {
                for (const item of articles.data) {
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

    return transformedArray; // Ritorna l'array con tutti gli oggetti
}


async function getArticles(tagString: string): Promise<TransformedDataItem[]> {
    if (!tagString) {
        return [];
    }

    const tags = tagString.replace(/-$/, "").split("-").map(tag => tag.trim());
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
        const attributes = item.attributes;
        return tags.includes(attributes.Name);
    });

    const articles = await transformData(matchingTags);
    return articles;
}


function getRandomArticles(articles: TransformedDataItem[], count: number): TransformedDataItem[] {
    const shuffled = [...articles].sort(() => 0.5 - Math.random()); // Mescola l'array
    return shuffled.slice(0, count); // Ritorna i primi `count` elementi
}


interface ArticlePostFetcherProps {
    articleTagsStringCode?: string; // Stringa di tag concatenati con trattini
    limit?: number;
}

export default async function ArticlePostFetcher({
    articleTagsStringCode = "",
    limit = 3,
}: ArticlePostFetcherProps) {
    let articles: TransformedDataItem[] = [];

    if (articleTagsStringCode) {
        articles = await getArticles(articleTagsStringCode);
        articles = getRandomArticles(articles, limit);
    }

    return (
        <div className="mt-16">
            {articleTagsStringCode && articles.length > 0 && (
                <div className="my-16">
                    <div className="text-center">
                        <h3 className="capitalize text-koiRed text-4xl font-bold">
                            Highlights from this beer
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
