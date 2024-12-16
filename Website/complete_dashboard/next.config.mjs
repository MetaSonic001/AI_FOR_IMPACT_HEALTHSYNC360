/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Ignores all ESLint errors during production builds
      },
};

export default nextConfig;
