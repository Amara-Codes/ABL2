import React from 'react';
import { BlogPostHeroElement } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
const Hero: React.FC<BlogPostHeroElement> = ({
  HeroTitle,
  HeroSubtitle,
  HeroCssClasses = '',
  HeroButton,
  HeroBgImg,
  HeroWrapperCssClasses,
  HeroWrapperBgImg
}) => {
  return (
    <div
    className={`${HeroBgImg?.length ? 'relative h-dvh overflow-hidden' : ''} ${HeroCssClasses} mb-12`}
    >
      <div className={`${HeroBgImg?.length ? 'relative  w-full h-full' : ''}`}>
        {HeroBgImg && (
          <Image
            src={HeroBgImg}
            alt="Hero Image"
            fill
            className='object-cover'
          />
        )}
        <div className={`${HeroBgImg?.length ? 'absolute bottom-0' : ''}  w-full h-full ${HeroWrapperCssClasses ?? ""}`}>
          {HeroWrapperBgImg?.length ? (
            <div className="relative w-full h-full opacity-90">


              <Image
                src={HeroWrapperBgImg}
                fill
                alt="Wrapper background image"
              />

            </div>
          ) : (
            <div className={`${HeroBgImg?.length ? 'relative ' : ''} w-full h-full`}>
            <div className={`${HeroBgImg?.length ? 'absolute bottom-0 ' : ''} backdrop-blur-sm w-full h-2/5 md:h-1/3 small:h-1/4 `}>
              <div className={`${HeroBgImg?.length ? 'absolute bottom-0 ' : ''}  bg-black/40 w-full h-full`}></div>

              <div className={`${HeroBgImg?.length ? 'absolute bottom-0 ' : ''} text-center w-full pb-4`}>

                <h1 className="text-4xl font-bold mb-4 px-4 text-ui-fg-base">{HeroTitle}</h1>
                <p className="text-lg px-4 text-koiYellow">{HeroSubtitle}</p>
                {HeroButton && (

                  <Link href={HeroButton.ButtonLink ?? "/"}
                    className={`inline-block px-6 py-3 ${HeroButton.ButtonCssClasses}`}
                    role="button">
                    {HeroButton.ButtonLabel}

                  </Link>
                )}
              </div>
            </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Hero;
