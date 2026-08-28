import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files, so the whole site is emitted as static HTML.
  output: "export",

  // Emit projects/janusmm/index.html rather than projects/janusmm.html, which
  // is the shape GitHub Pages resolves most reliably.
  trailingSlash: true,

  // The image optimiser is a server feature and cannot run on Pages.
  images: { unoptimized: true },
};

export default nextConfig;
