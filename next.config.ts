import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pchyseiocwvhaevpqmhe.supabase.co',
        port: '', // leave empty unless using a non-default port
        pathname: '/**', // allow all paths under this host
      },
    ],
  },
};

export default nextConfig;
