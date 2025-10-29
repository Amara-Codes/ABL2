import React from 'react';
import { BlogPostQuoteElement } from '@/types';

const Quote: React.FC<BlogPostQuoteElement> = ({
    QuoteContent,
    QuoteAuthor,
    QuoteCssClasses = "",
    QuoteAuthorDates = "",
    QuoteAuthorInfo = ""
}) => {
    return (

        <figure className={`max-w-screen-md mx-auto ${QuoteCssClasses} my-16 flex justify-between items-center px-4 small:px-0`}>
            <svg className="w-10 h-10 mx-auto text-gray-600 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <div>
                <blockquote className='px-8'>
                    <p className="font-medium text-xl md:text-2xl italic text-white text-center">&quot;{QuoteContent}&quot;</p>
                </blockquote>

                <figcaption className="flex items-center justify-center mt-6">
                    <div className="flex flex-col justify-center">
                        <cite className="font-bold text-primary text-center">{QuoteAuthor}</cite>
                        {(QuoteAuthorInfo?.length || QuoteAuthorDates?.length) && (
                            <p className="font-regular text-sm text-secondary text-center">( {QuoteAuthorInfo}{QuoteAuthorInfo?.length && QuoteAuthorDates?.length ? ', ' : ''}{QuoteAuthorDates} )</p>
                        )}
                    </div>
                </figcaption>
            </div>
            <svg className="w-10 h-10 mx-auto text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
        </figure>

    );
};

export default Quote;
