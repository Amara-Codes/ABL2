// app/layout.tsx
"use client"; // <-- 1. Add this to use hooks

import localFont from "next/font/local";
import { useRef } from "react"; // <-- Import useRef

import "./app.css";
import Header from "@/components/layout/Header";
import ViewCanvas from "@/components/layout/ViewCanvas";
import Footer from "@/components/layout/Footer";
import DesktopOnly from "@/lib/util/DesktopOnly";

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. Create a ref for your main scrollable element
  const mainRef = useRef<HTMLElement>(null);

  return (
    <html lang="en" className={alpino.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="overflow-x-hidden bg-black">
        <Header />
        
        {/* 3. Attach the ref to your <main> element */}
        <main className="mt-36" ref={mainRef}>
          {children}
          <DesktopOnly>

          <ViewCanvas eventSource={mainRef} />
          </DesktopOnly>
        </main>
        <Footer />
      </body>
    </html>
  );
}