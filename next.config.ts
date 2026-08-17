import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // Consolidate apex → www so Google indexes one host only
      {
        source: "/:path*",
        has: [{ type: "host", value: "pixlpluz.com" }],
        destination: "https://www.pixlpluz.com/:path*",
        permanent: true,
      },
      // Legacy Hostinger / WordPress "coming soon" URLs → live home
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
      {
        source: "/coming-soon",
        destination: "/",
        permanent: true,
      },
      {
        source: "/coming-soon/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
