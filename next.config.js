/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['scontent-cdg2-1.xx.fbcdn.net', 'scontent-cdt1-1.xx.fbcdn.net', 'storage.googleapis.com']
  },
  swcMinify: true,
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/buy-used-surfboards-in-:location-bali-indonesia',
          destination: '/?location=:location'
        },
        {
          source: '/buy-used-surfboards-in-:location-bali-indonesia-surfboards-size-:size',
          destination: '/?location=:location&size=:size'
        },
        {
          source: '/surfboards-size-:size',
          destination: '/?size=:size'
        },
        {
          source: '/surfboard/:id(\\d{1,})-:slug',
          destination: '/surfboard?id=:id&location=:slug'
        }
      ]
    };
  }
};

module.exports = nextConfig;
