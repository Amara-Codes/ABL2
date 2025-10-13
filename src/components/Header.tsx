"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import BubbleMenu from "./BubbleMenu";

const DEFAULT_ITEMS = [
  {
    label: 'Home',
    href: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Our Beers',
    href: '/beers',
    ariaLabel: 'Our Beers',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'The Brewery',
    href: '/brewery',
    ariaLabel: 'The Brewery',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Blog',
    href: '/blog',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'The Lab',
    href: '/lab',
    ariaLabel: 'The Lab',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'Contacts',
    href: '/contacts',
    ariaLabel: 'Contacts',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
];

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
      className={`fixed top-0 left-0 right-0 z-[90] flex items-center justify-between lg:px-8 transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-[-500%]"
        }`}
    >
      <div className="w-full h-full relative mt-9 lg:mt-6">
        <BubbleMenu
          logo="/images/logo-sm.png"
          items={DEFAULT_ITEMS}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </div>

    </header>
  );
}