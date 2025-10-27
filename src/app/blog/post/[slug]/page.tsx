import qs from "qs";
import componentMapping from "@/components/strapi/post/componentMapping";
import BackButton from "@/components/BackButton"
import { Metadata } from 'next';
import RelatedArticlesFetcher from "@/components/strapi/related-articles-fetcher"
import { redirect } from 'next/navigation'

//Parte che serve a mappare i nomi delle immagini nei componenti
const componentImageMap = {
    hero: 'HeroBgImg',
    paragraph: 'ParagraphImg',
    cta: 'CtaBgImg'
};

type ComponentType = keyof typeof componentImageMap;

function isComponentType(value: any): value is ComponentType {
    return value in componentImageMap;
}

type TransformedDataItem = {
    Id: string
    Title: string;
    Slug: string;
    Category: string;
    Summary: string | null;
    ThumbnailUrl?: string;
    Content?: any[];
    ArticleTags?: string[]
};


function transformData(json: any): TransformedDataItem {
    const item = json.data[0];
    const attributes = item.attributes;
    const Content = attributes.Content?.map((contentItem: any) => {
        const contentComponentItem = { ...contentItem };
        const ComponentRaw = contentItem["__component"].split(".")[1];
        let Component: ComponentType | string = ComponentRaw;

        if (isComponentType(ComponentRaw)) {
            const imageName = componentImageMap[ComponentRaw],
                componentImg = imageName === 'paragraphImg'
                    ? contentItem[imageName]?.data?.attributes?.formats?.small?.url
                    : contentItem[imageName]?.data?.attributes?.formats?.medium?.url;

            contentComponentItem[imageName] = typeof (componentImg) === 'string' ? componentImg : ""
        } else {

            if (ComponentRaw === "carousel") {
                const images: any[] = [];
                contentItem.CarouselImgs.data.forEach((img: { attributes: { formats: { small: { url: any; }; }; }; }) => {
                    images.push(img.attributes.formats.small.url)
                });
                contentComponentItem["CarouselImgs"] = images;
            }

        }
        return { ...contentComponentItem, Component };
    });

    let tags = [];

    if (attributes?.tags?.data?.length) {
        tags = attributes.tags.data.map((e: { id: any; }) => e.id.toString())
    }

    return {
        Title: attributes.Title,
        Slug: attributes.Slug,
        Category: attributes.Category,
        Summary: attributes.Summary,
        Content,
        Id: item.id,
        ArticleTags: tags
    };
}

async function getArticleById(slug: string) {
    const baseUrl = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL ?? "http://localhost:1337";
    const path = `/api/articles/`;
    const url = new URL(path, baseUrl);
    const query: Record<string, any> = {};

    query.filters = {
        Slug: {
            $eq: slug,
        }
    };
    query.populate = {
        Content:
        {
            populate: {
                HeroBgImg: {
                    fields: ["url", "formats"],
                },
                ParagraphImg: {
                    fields: ["url", "formats"],
                },
                CtaBgImg: {
                    fields: ["url", "formats"],
                },
                CtaButton: {
                    fields: "*"
                },
                CarouselImgs: {
                    fields: "*"
                },

            }

        },
        tags: {
            populate: "*"
        }
    };

    url.search = qs.stringify(query);
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch article with ID: ${slug}`);
    }

    const data = await res.json();

    if (!data || !data.data || data.data.length === 0) {
        return null;
    }
    return transformData(data);
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug; // <-- USA PARAMS.SLUG
    let article: any = null;

    try {
        if (slug.length) {
            article = await getArticleById(slug);
        }
    } catch (error) {
        console.error("Error fetching article:", error);
    }

    return {
        title: article ? "Brewery in Siem Reap - Amara Beer Lab | Blog and Stories - " + article.Title : 'Blog and Stories',
        description: article?.Summary || 'Dive into our blog to uncover stories from our brewery in Siem Reap, Cambodia. Explore craft beer culture, sustainable brewing practices, and reflections on community and local traditions.',
    };
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
    let slug: string = params.slug;
    let article: any = null;

    try {
        if (slug.length) {
            article = await getArticleById(slug);
        }
    } catch (error) {
        console.error("Error fetching article:", error);
    }

    return (
        <div
            className="flex flex-col small:flex-row small:items-start py-6 content-container mt-32"
            data-testid="blog-container"
        >
            {article ? (
                <div className="w-full">

                    <div className="mb-16 small:mx-12">
                        <div className="mb-8">
                            <BackButton destination={`/${article.Category}`} />
                        </div>


                        <section>
                            {article.Content &&
                                article.Content.map((contentItem: any, index: number) => {
                                    const Component = componentMapping[contentItem.Component];
                                    if (!Component) {
                                        return (
                                            <pre key={index}>
                                                {JSON.stringify(contentItem, null, 2)}
                                            </pre>
                                        );
                                    }
                                    return (
                                        <Component key={index} {...contentItem} />
                                    );
                                })}
                        </section>


                        <section>
                            {article.ArticleTags?.length &&
                                <div>
                                    <RelatedArticlesFetcher tags={article.ArticleTags} currentArticleId={article.Id} />
                                </div>
                            }
                        </section>
                    </div>
                </div>
            ) :
                redirect("/not-found")

            }
        </div>
    );
};

export default PostPage;
