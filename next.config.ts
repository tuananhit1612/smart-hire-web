/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
  typescript: {
    // TODO: Fix TypeScript errors and remove this
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
