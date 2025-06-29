import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // 🚨 This will skip type errors during `next build`
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
