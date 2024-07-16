/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "https://ejubpcdhecomjjdnnkwp.supabase.co/storage/v1/object/public/thumbnails/img/rocket.jpg",
      },
    ],
  },
};

export default nextConfig;
