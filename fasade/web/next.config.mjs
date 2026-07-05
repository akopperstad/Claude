/** @type {import('next').NextConfig} */
const nextConfig = {
  // pipeline/ lives one level up, outside this app's root
  experimental: { externalDir: true },
};

export default nextConfig;
