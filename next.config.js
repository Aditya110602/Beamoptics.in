/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
