import './app.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Craft Beer Brewery in Siem Reap - Amara Beer Lab | Craft Beers, Sustainability and Community Impact",
  description:
    "Discover Amara Beer Lab, a craft brewery based in Siem Reap, Cambodia, dedicated to sustainability and supporting local communities. With high-quality beers crafted using technical excellence and modern methods to offer carefully designed, contemporary flavors, Amara Beer Lab blends authentic taste with social responsibility.",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* NESSUN HEADER O FOOTER QUI, SOLO IL CONTENITORE */}
        {children}
      </body>
    </html>
  );
}