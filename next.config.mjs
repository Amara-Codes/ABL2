/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
           {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
           {
        protocol: 'https',
        hostname: 'images2.prismic.io',
      },
    ],
  },
};

export default nextConfig;