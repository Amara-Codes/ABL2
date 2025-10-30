// Save this file as (e.g.) components/Gallery/Gallery.tsx
"use client"

import { useState, useEffect } from 'react';
import DomeGallery from './DomeGallery'; // Import your component
import type { ImagePoolItem } from './DomeGallery'; // Import the type we need

// --- Types for the Strapi Response ---
// (Based on your JSON)

interface StrapiImageFormat {
    url: string;
}

interface StrapiImageAttributes {
    url: string;
    formats: {
        large?: StrapiImageFormat; // We'll prefer 'large'
        medium?: StrapiImageFormat;
        small?: StrapiImageFormat;
    };
}

interface StrapiImageData {
    id: number;
    attributes: StrapiImageAttributes;
}

interface GalleryImageComponent {
    id: number;
    alt: string;
    image: {
        data: StrapiImageData | null; // Important: this can be null!
    };
}

interface StrapiApiResponse {
    data: {
        id: number;
        attributes: {
            GalleryImage: GalleryImageComponent[];
        };
    };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_AMARA_STRAPI_URL || 'http://localhost:1337';
// The endpoint to fetch from
const STRAPI_GALLERY_URL = `${STRAPI_URL}/api/gallery?populate=GalleryImage.image`;

export default function Gallery() {
    // State for the transformed images
    const [images, setImages] = useState<ImagePoolItem[]>([]);
    // State for loading
    const [loading, setLoading] = useState(true);
    // State for any errors
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGalleryImages() {
            try {
                const response = await fetch(STRAPI_GALLERY_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const result: StrapiApiResponse = await response.json();

                // --- Transformation Logic ---
                // Transform the Strapi array into the format expected by DomeGallery
                const transformedImages: ImagePoolItem[] = result.data.attributes.GalleryImage
                    .filter(item => item.image.data !== null) // Filter out null images (like id: 4)
                    .map(item => {
                        const imageData = item.image.data!; // We know it's not null thanks to the filter
                        
                        // Prioritize the 'large' format, otherwise use the original URL
                        const imageUrl = imageData.attributes.formats?.large?.url 
                                       || imageData.attributes.url;
                        
                        const altText = item.alt || 'Gallery image'; // Use the provided alt text

                        return {
                            src: imageUrl,
                            alt: altText
                        };
                    });

                setImages(transformedImages);

            } catch (err: any) {
                console.error("Error fetching gallery:", err);
                setError(err.message || 'Could not load the gallery.');
            } finally {
                setLoading(false);
            }
        }

        fetchGalleryImages();
    }, []); // The empty array ensures this fetch runs only on mount

    // --- Render State Management ---

    if (loading) {
        // You can replace this with a spinner or loading component
        return <div className="flex justify-center items-center h-screen">Loading Gallery...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    // If everything is fine, render DomeGallery with the fetched images
    return <DomeGallery images={images} />;
}