/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3tz9pfar1sc62.cloudfront.net",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "image.yes24.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
