/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'asset.cloudinary.com',
            port: '',
            pathname: '/',
          },
        ],
      },
};

export default nextConfig;
