import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/trading",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
