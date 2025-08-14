import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb" // increase this to your desired max size
    }
  }
};

export default nextConfig;
