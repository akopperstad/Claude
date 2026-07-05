/** @type {import('next').NextConfig} */
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages showcase build: static export under /<repo> base path.
  // The API route is removed by the deploy workflow before this build runs.
  ...(isExport
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
