const withNextIntel = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
module.exports = withNextIntel({
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "drpatches.com",
      },
    ],
  },
});
