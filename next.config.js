/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'scontent-cdg2-1.xx.fbcdn.net',
      'scontent-cdt1-1.xx.fbcdn.net',
      'storage.googleapis.com',
      'd1lc72dkikf3w9.cloudfront.net',
      'd12ke8i0d04z83.cloudfront.net'
    ]
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
        },
        {
          source: '/surf-spot/:id(\\d{1,})-:slug',
          destination: '/surf-spot?id=:id&slug=:slug'
        },
        {
          source: '/:slug',
          destination: '/?slug=:slug'
        }
      ]
    };
  }
};

module.exports = nextConfig;
