/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/graphql",
        headers: [
          {
            key: "Access-Control-Request-Headers",
            value: "*",
          },
          {
            key: "SameSite",
            value: "None",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
