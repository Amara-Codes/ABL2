import ArticlesFetcherWrapper from '@/components/strapi/articles-fetcher-wrapper';
import { GenericWrapperProps } from '@/types'
import BackButton from '@/components/BackButton';
import Cta from '@/components/content/Cta';

export default function GenericWrapper({ contentType, articlesPerPage }: GenericWrapperProps) {
  return (
    <div
      className="flex flex-col small:flex-row small:items-start p-8 content-container mt-32"
      data-testid={`${contentType}-container`}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="hidden lg:block">

        <BackButton destination="/blog" />
        </div>
        <div className="mt-16 flex justify-center mb-8 lg:mb-16">
          <h1 className="font-fatboy text-8xl text-primary h-1/2 flex items-end">{contentType.toLocaleUpperCase()}</h1>
        </div>
        <ArticlesFetcherWrapper initialCategory={contentType} articlesPerPage={articlesPerPage} />

        <div className="small:mx-12">
          {
            //dynamic CTA here
          }
        </div>
      </div>
    </div>
  );
}