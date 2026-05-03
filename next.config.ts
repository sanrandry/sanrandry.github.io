import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_VERSION: version,
  },
};

export default nextConfig;
