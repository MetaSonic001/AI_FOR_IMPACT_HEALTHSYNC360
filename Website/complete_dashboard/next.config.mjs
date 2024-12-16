/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
    eslint: {
        ignoreDuringBuilds: true, // Ignores all ESLint errors during production builds
      },
};

export default nextConfig;
