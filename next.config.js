/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com']
  },
  swcMinify: true,
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/country/:id(\\d{1,})-:slug',
          destination: '/country?id=:id&slug=:slug'
        },
        {
          source: '/surf-area/:id(\\d{1,})-:slug',
          destination: '/surf-area?id=:id&slug=:slug'
        }
      ]
    };
  }
};

module.exports = nextConfig;
