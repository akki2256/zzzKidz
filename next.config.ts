import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Do not set `output: 'export'` or `output: 'standalone'` here.
   * Vercel serves this app via its Next.js builder; standalone export
   * breaks platform routing when combined with the Next 16.3 adapter.
   */
};

export default nextConfig;
