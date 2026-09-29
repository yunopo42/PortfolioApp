import type { MetadataRoute } from "next";
import { designs, siteUrl } from "@/data/content";

// Next.js bu dosyadan /sitemap.xml üretir.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...designs.map((d) => ({
      url: `${siteUrl}/tasarimlar/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
