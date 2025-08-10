/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/3D-cube',
  assetPrefix: '/3D-cube/',   // <-- Add this line
};

module.exports = nextConfig;

