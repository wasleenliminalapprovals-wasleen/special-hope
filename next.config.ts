import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Compression (enabled by default in Next.js 15) ── */
  compress: true,

  /* ── React Strict Mode for development best practices ── */
  reactStrictMode: true,

  /* ── Image Optimization ── */
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimize for static export + sharp (included in devDependencies)
    unoptimized: false,
    // Allow SVG logos for authority badges
    dangerouslyAllowSVG: true,
  },

  /* ── HTTP Headers for security and caching ── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache font files
        source: "/:all*(woff|woff2|ttf|eot)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /* ── Server-side only packages (sharp for image optimization) ── */
  serverExternalPackages: ["sharp"],
};

export default nextConfig;
