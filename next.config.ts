import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mrpfx.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'mrpfx-backend.onrender.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BACKEND_URL || 'https://mrpfx-backend.onrender.com'}/api/v1/:path*`,
      },
      {
        source: '/wp-content/:path*',
        destination: `${process.env.BACKEND_URL || 'https://mrpfx-backend.onrender.com'}/wp-content/:path*`,
      },
      {
        source: '/media/:path*',
        destination: `${process.env.BACKEND_URL || 'https://mrpfx-backend.onrender.com'}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
