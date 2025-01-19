/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@mui/material']
  },
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp']
  },
  env: {
    API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://api.example.com' 
      : 'http://localhost:3000/api'
  },
  webpack: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false
        }
      }
    };
  }
}

module.exports = nextConfig 