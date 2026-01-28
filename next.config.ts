import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    // Bỏ qua lỗi ESLint khi build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bỏ qua lỗi Type check khi build
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
