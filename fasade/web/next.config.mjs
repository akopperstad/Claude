import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pipeline/ lives one level up, outside this app's root
  experimental: { externalDir: true },
  webpack: (config) => {
    // pipeline/ files must resolve their packages (@anthropic-ai/sdk) from
    // THIS app's node_modules — a fresh clone has no repo-root node_modules
    config.resolve.modules = [
      path.join(appDir, 'node_modules'),
      ...(config.resolve.modules ?? ['node_modules']),
    ];
    return config;
  },
};

export default nextConfig;
