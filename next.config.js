/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['scontent-cdg2-1.xx.fbcdn.net', 'scontent-cdt1-1.xx.fbcdn.net']
  },
  swcMinify: true,
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/buy-used-surfboards-in-:slug-bali-indonesia',
          destination: '/?slug=:slug'
        },
        {
          source: '/buy-used-surfboards-in-:slug-bali-indonesia',
          destination: '/?slug=:slug'
        },
        {
          source: '/surfboard/:id(\\d{1,})-:slug',
          destination: '/surfboard?id=:id&slug=:slug'
        }
      ]
    };
  }
};

module.exports = nextConfig;
