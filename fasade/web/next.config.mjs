import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // self-contained server bundle for the Docker/Fly deploy
  output: 'standalone',
  // pipeline/ lives one level up, outside this app's root; tracing root at
  // the repo root so the standalone bundle includes those files
  experimental: {
    externalDir: true,
    outputFileTracingRoot: path.join(appDir, '../..'),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
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
