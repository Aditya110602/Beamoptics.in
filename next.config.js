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
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/we-offer",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/product",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services-and-products",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/handheld-produce-scanner",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/handheld-produce-scanner/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/handheld-produce-scanner",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/handheld-produce-scanner/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/handheld-produce-scanner.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/Handheld-Produce-Scanner",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/insight",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/inslight",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/press-kit",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/presskit",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
