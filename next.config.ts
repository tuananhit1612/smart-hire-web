/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
  eslint: {
    // TODO: Fix ESLint errors and remove this
    // WARNING: This suppresses ALL lint errors during builds.
    // Run `npm run lint` regularly to catch issues.
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["puppeteer"],
};

export default nextConfig;
