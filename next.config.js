/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: "",
  images: {
    domains: [
      process.env.NEXT_PUBLIC_CLOUD_FRONT_URL.replace(/^https?:\/\//, ""),
    ],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    CLOUD_FRONT_URL: process.env.NEXT_PUBLIC_CLOUD_FRONT_URL,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/trending/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: `${process.env.NEXT_PUBLIC_CMS_BASE_URL}/:path*`,
      },
    ];
  },
});
