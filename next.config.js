/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  compiler: {
    styledComponents: true,
    emotion: true
  },
  experimental: {
    serverComponentsExternalPackages: ['@mui/material']
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