import React from "react";
import { ABLLogo } from "./ABLLogo";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#FEE832] text-[#FE6334]">
      <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10">
        <ABLLogo />
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-4">
          <Link href="/" className="text-center text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-center text-sm font-medium">
              About Us
            </Link>
            <Link href="/products" className="text-center text-sm font-medium">
              Products
            </Link>
            <Link href="/contact" className="text-center text-sm font-medium">
              Contact
            </Link>
          </div>
          <div className="flex flex-col items-center p-4">
       <Link href="/blog" className="text-center text-sm font-medium">
             Blog
            </Link>
            <Link href="/news" className="text-center text-sm font-medium">
              News
            </Link>
            <Link href="/activities" className="text-center text-sm font-medium">
              Activities
            </Link>
            <Link href="/the-lab" className="text-center text-sm font-medium">
              The Lab
            </Link>
          </div>
          <div className="flex flex-col items-center p-4">     <h3 className="mb-2 text-lg font-semibold">Contact Us</h3>
            <p className="text-center text-sm font-medium">
              Email: <a href="mailto:info@ablsoda.com">info@ablsoda.com</a>
            </p>
            <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
            <p className="text-center text-sm font-medium">
              Instagram: <a href="https://instagram.com/ablsoda" target="_blank" rel="noopener noreferrer">@ablsoda</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
