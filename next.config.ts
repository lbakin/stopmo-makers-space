import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from writing a notes file into the repo.
  agentRules: false,
  devIndicators: false,
};

export default nextConfig;
