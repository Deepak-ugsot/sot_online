import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output exists for the Docker image only — `Dockerfile` copies
  // `.next/standalone`. It must NOT be set on Vercel: with it, Next.js writes the traced
  // server bundle into `.next/standalone/` and skips emitting `.next/next-server.js.nft.json`,
  // which is the file Vercel's `onBuildComplete` hook reads to assemble the serverless
  // functions. Its absence kills the deploy with ENOENT *after* an otherwise-clean build.
  // `VERCEL` is set to "1" automatically on every Vercel build, so Docker is unaffected.
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    remotePatterns: [
      // TEMPORARY — placeholder photography for the gallery cards.
      // Lorem Picsum, scoped to its seeded-image path so only stable, deterministic
      // URLs are allowed through the optimizer. Remove this entry once the real
      // gallery art lands in `public/assets/`.
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/seed/**",
        search: "",
      },
      // YouTube video thumbnails, used as the poster for the click-to-load embed
      // facade. `/vi/**` is valid because the wildcard covers whole trailing
      // segments (`/vi/<id>/<quality>.jpg`).
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
