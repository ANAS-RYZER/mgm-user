// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/products/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/mgm_dev/products/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/mgm_dev/product/**",
      },
    ],
  },
};

module.exports = nextConfig;
