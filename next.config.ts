import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Exclude db folder from webpack build
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "db/seed": "commonjs db/seed",
        "@/db/seed": "commonjs @/db/seed",
      });
    }
    return config;
  },
};

export default nextConfig;
