import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typedRoutes: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
