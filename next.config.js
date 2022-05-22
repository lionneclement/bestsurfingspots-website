/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  rewrites: async () => {
    return {
      fallback: [
        {
          source: '/country/:id(\\d{1,})-:slug',
          destination: '/country?id=:id&slug=:slug'
        }
      ]
    };
  }
};

module.exports = nextConfig;
