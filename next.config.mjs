/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2ttts4ku10mha.cloudfront.net",
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
