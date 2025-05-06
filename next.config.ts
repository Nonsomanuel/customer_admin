import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... your existing config

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  // ... any other config you have
};

export default nextConfig;
