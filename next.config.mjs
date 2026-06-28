/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Playwright must not be bundled by Next's server compiler — keep it external
  // so it loads the real package (and the system Chromium) at runtime.
  experimental: {
    serverComponentsExternalPackages: ["playwright", "playwright-core", "undici"],
  },
};

export default nextConfig;
