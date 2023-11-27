const withNextIntel = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
module.exports = withNextIntel({
  transpilePackages: ["@repo/ui"],
});
