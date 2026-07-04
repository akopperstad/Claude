/** @type {import('next').NextConfig} */

// Set BASE_PATH (e.g. "/Claude") when the site is served from a sub-path,
// as on GitHub Pages. NEXT_PUBLIC_BASE_PATH mirrors it to client code for
// plain <img> asset URLs that Next's basePath doesn't rewrite.
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
