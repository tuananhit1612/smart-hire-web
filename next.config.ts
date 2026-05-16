/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: "/smart-hire-web",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
