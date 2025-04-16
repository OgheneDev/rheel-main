import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export for cPanel
  images: {
    domains: ["apidoc.rheel.ng", "res.cloudinary.com"],
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Ensure proper static file structure
  typescript: {
    ignoreBuildErrors: true, // Prevents type errors from stopping the build
  },
};

export default nextConfig;
