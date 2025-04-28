import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 async rewrites() {
    return [
      {
        source: '/products/:id',
        destination: '/products/[id]',
      },
    ];
  },
  images: {
  
     remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
    domains: ["fakestoreapi.com", "storage.googleapis.com", 'lh3.googleusercontent.com'], // Ensure correct domains
  },
};

export default nextConfig;
