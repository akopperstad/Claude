import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://seawise.no",
      lastModified: new Date("2026-07-05"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
