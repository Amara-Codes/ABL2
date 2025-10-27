import React from 'react';
import { BlogPostParagraphElement } from '@/types';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

const Paragraph: React.FC<BlogPostParagraphElement> = ({
  ParagraphContent,
  ParagraphCssClasses = '',
  ParagraphImg,
  ParagraphImgPosition = ''
}) => {
  const isImagePositionated = ParagraphImgPosition?.length;
  const imagePositioningClass = ParagraphImg?.length && isImagePositionated ? ParagraphImgPosition === 'left' ? 'flex-col small:flex-row gap-x-8' : 'flex-col small:flex-row-reverse gap-x-8' : 'flex-col items-center';

  return (
    <div
      className={`prose w-full max-w-none py-6 ${ParagraphCssClasses ?? ''}`}
    >

      <div
        className={`flex relative w-full ${imagePositioningClass}`}
      >
        {ParagraphImg && (
          <div className='w-full'>
            <Image
              src={ParagraphImg}
              alt="Paragraph Image"
              layout='intrinsic'
              width={isImagePositionated ? 640 : 960}
              height={isImagePositionated ? 360 : 540}
              className='hidden small:block mx-auto'
            />
            <Image
              src={ParagraphImg}
              alt="Paragraph Image"
              layout='responsive'
              width={640}
              height={360}
              className='block small:hidden'
            />
          </div>
        )}
        {ParagraphContent && (
          <div className={`${ParagraphImg?.length && !isImagePositionated ? 'max-w-[960px]' : 'w-full'}`}>
            <ReactMarkdown
              components={{
                h1: ({ children, ...props }) => (
                  <h1 className="text-4xl font-extrabold text-ui-fg-base" {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-3xl font-semibold text-ui-fg-base" {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="text-2xl font-bold text-koiRed" {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 className="text-lg font-bold text-koiOrange" {...props}>
                    {children}
                  </h4>
                ),
                p: ({ children, ...props }) => (
                  <p className="text-base leading-relaxed text-ui-fg-base" {...props}>
                    {children}
                  </p>
                ),
                strong: ({ children, ...props }) => (
                  <strong
                    className="text-base leading-relaxed font-bold text-ui-fg-base"
                    {...props}
                  >
                    {children}
                  </strong>
                ),
                li: ({ children, ...props }) => (
                  <li className="text-ui-fg-base" {...props}>
                    {children}
                  </li>
                ),
                a: ({ children, ...props }) => ( // Aggiunto override per <a>
                  <a className="text-koiOrange" {...props}>
                    {children}
                  </a>
                )
              }}
            >
              {ParagraphContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paragraph;