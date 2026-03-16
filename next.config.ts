import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  typedRoutes: true,
  trailingSlash: true,
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
