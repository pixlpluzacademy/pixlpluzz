import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/pages/coming-soon",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pages/coming-soon/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
