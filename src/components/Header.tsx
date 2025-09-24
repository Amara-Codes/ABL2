"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
/**
 * A header component that hides on scroll down and reveals on scroll up.
 * This component is designed for client-side rendering in a Next.js environment.
 *
 * @component
 * @returns {React.ReactElement} The rendered header component.
 */
export default function Header(): React.ReactElement {
  // State to manage the header's visibility
  const [isVisible, setIsVisible] = useState<boolean>(true);
  // Ref to store the last scroll position
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    /**
     * Controls the header's visibility based on the scroll direction.
     */
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction and toggle visibility
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      // Update the last scroll position
      lastScrollY.current = currentScrollY;
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[90] flex items-center justify-between pt-8 px-8 transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >

      <div className="">
        <Link href="/" className="bg-primary">

          <Image className="bg-primary rounded-full border-4 border-secondary" src="/images/logo-sm.png" width={80} height={80} alt="Small Amara Beer lab Logo" />
        </Link>
      </div>

      <div className="flex justify-between gap-8 pt-4">
        <Link className="font-fatboy text-xl text-white hover:text-primary hover:underline transition-colors duration-700" href="/">Home</Link>
        <Link className="font-fatboy text-xl text-white hover:text-primary hover:underline transition-colors duration-700" href="/brewery">Brewery</Link>
        <Link className="font-fatboy text-xl text-white hover:text-primary hover:underline transition-colors duration-700" href="/lab">Lab</Link>
        <Link className="font-fatboy text-xl text-white hover:text-primary hover:underline transition-colors duration-700" href="/beers">Our Beers</Link>
        <Link className="font-fatboy text-xl text-white hover:text-primary hover:underline transition-colors duration-700" href="/blog">Blog</Link>
        <Link className="font-fatboy text-xl text-white hover:text-primary hover:underline transition-colors duration-700" href="/contacts">Contacts</Link>
      </div>
    </header>
  );
}