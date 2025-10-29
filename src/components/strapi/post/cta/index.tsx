import React from 'react';
// Importa i tipi necessari
import { BlogPostCtaElement, CtaContent, RichTextNode, LinkField, ImageField } from '@/types'; // Assicurati di importare tutti i tipi usati
// Importa il componente di presentazione Cta
import Cta from '@/components/content/Cta'; // Assicurati che il percorso sia corretto

const BlogPostCtaAdapter: React.FC<BlogPostCtaElement> = ({
    CtaTitle,
    CtaCaption,
    CtaCssClasses = "",
    CtaButton,
    CtaBgImg = "",
    CtaType // Questo determina il tipo di bottone (int/ext)
}) => {
    const buttonData = Array.isArray(CtaButton) ? CtaButton[0] : CtaButton;
    const haveButton = !!buttonData;

    // Determina il layout (come prima)
    const layout: CtaContent['content']['layout'] = 'imageRight'; // O basato su una prop CtaDirection

    // Determina il tipo di bottone (come prima)
    const buttonType: 'int' | 'ext' = CtaType === "external" ? 'ext' : 'int';

    // *** COSTRUISCI L'OGGETTO 'content' CORRETTO per Cta ***
    const contentForFinalCta: CtaContent['content'] = {
        ctaClasses: `lg:py-12 ${CtaCssClasses} ${!CtaBgImg?.length ? 'bg-gradient-to-bl from-black via-secondary/50 to-primary/90 text-white' : ''}`,

        // Titolo (con type aggiunto)
        title: {
            type: 'heading2', // Aggiunto tipo richiesto da RichTextNode
            text: CtaTitle ?? ''
        },
        titleClasses: "mb-4 px-8 small:mb-16 text-4xl small:text-6xl text-white",

        // Paragrafo (con type aggiunto)
        paragraph: {
            type: 'paragraph', // Aggiunto tipo richiesto da RichTextNode
            text: CtaCaption ?? ''
        },
        paragraphClasses: "px-4 text-white",

        // Bottone (con 'classes' invece di 'buttonClasses')
        button: haveButton ? {
            url: buttonData?.ButtonLink ?? '/',
            label: buttonData?.ButtonLabel ?? 'Home',
            type: buttonType,
            classes: buttonData?.ButtonCssClasses ?? 'mt-8 text-white shadow-none rounded-md' // Rinominato in 'classes'
        } : { // Bottone vuoto/nascosto
            url: "#",
            label: "",
            type: 'int',
            classes: "hidden" // Rinominato in 'classes'
        },

        // Immagine di sfondo (con 'dimensions' aggiunte e 'undefined' come fallback)
        background_image: CtaBgImg?.length ? {
            url: CtaBgImg,
            alt: "", // Alt non essenziale per background
            dimensions: { width: 0, height: 0 } // Aggiunte dimensioni fittizie richieste da ImageField
        } : undefined, // Usa undefined invece di null

        // Immagine in primo piano (come prima)
        image: undefined, // Usa undefined invece di null (più sicuro per i tipi opzionali)

        // Layout (come prima)
        layout: layout
    };

    // Renderizza il componente Cta finale
    return (
        <Cta content={contentForFinalCta} />
    );
};

export default BlogPostCtaAdapter;