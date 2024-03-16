/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'asset.cloudinary.com',
            pathname:"/diiy0vfg1/**",
            port:""  
          },
          
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname:"/diiy0vfg1/**",
            port:""  
          },
        ],

      },
};

export default nextConfig;
