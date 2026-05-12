import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: path.join(__dirname),
  allowedDevOrigins: ["127.0.0.1"]
};

export default nextConfig;
