/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  reactStrictMode: true,
  transpilePackages: [],
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
    ]
  },
  swcMinify: true,
};

module.exports = nextConfig;
