/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- CONFIGURAZIONE IMMAGINI (ESISTENTE) ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // --- CONFIGURAZIONE HEADERS (NUOVA - FIX PER IL FONT) ---
  async headers() {
    return [
      {
        // Questo intercetta tutte le richieste verso la cartella /fonts/
        source: "/fonts/:path*",
        headers: [
          {
            // "Apri i cancelli": permette a chiunque (incluso Googlebot) di leggere il file
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
    ];
  },
};

export default nextConfig;