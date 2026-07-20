import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/content";

// Next.js bu dosyadan /sitemap.xml üretir.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
