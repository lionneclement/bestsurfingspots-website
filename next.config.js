/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'scontent-cdg2-1.xx.fbcdn.net',
      'scontent-cdt1-1.xx.fbcdn.net',
      'storage.googleapis.com',
      'lh3.googleusercontent.com',
      'graph.facebook.com'
    ]
  },
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/surf-area/:id(\\d{1,})-:slug',
        destination: '/',
        permanent: true
      },
      {
        source: '/country/:id(\\d{1,})-:slug',
        destination: '/',
        permanent: true
      }
    ];
  },
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/buy-used-surfboards-in-:location-bali-indonesia',
          destination: '/?location=:location'
        },
        {
          source: '/buy-used-surfboards-in-:location-bali-indonesia-surfboards-size-:size(\\d{1,})',
          destination: '/?location=:location&size=:size'
        },
        {
          source: '/surfboards-size-:size(\\d{1,})',
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
