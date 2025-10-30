import localFont from "next/font/local";

import "./app.css";
import Header from "@/components/layout/Header";
import ViewCanvas from "@/components/layout/ViewCanvas";
import Footer from "@/components/layout/Footer";

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
  return (
    <html lang="en" className={alpino.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
      <body className="overflow-x-hidden bg-black">
        <Header />
        <main className="mt-36">
          {children}
          <ViewCanvas />
        </main>
        <Footer />
      </body>
     
    </html>
  );
}
