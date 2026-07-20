import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/content";

// Next.js bu dosyadan /robots.txt üretir.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
