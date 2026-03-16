import { MetadataRoute } from "next";
import { cuisine, categories } from "@/lib/data";

const BASE_URL = "https://moodmenu.kanini.top";

const moods = ["Happy", "Tired", "Adventurous", "Stressed", "Focused"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/recipes/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/favorites/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/info/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic recipe URLs based on combinations
  const dynamicRoutes: MetadataRoute.Sitemap = moods.flatMap((mood) =>
    cuisine.flatMap((cuis) =>
      categories.map((diet) => ({
        url: `${BASE_URL}/recipes/?mood=${encodeURIComponent(mood)}&amp;cuisine=${encodeURIComponent(cuis)}&amp;diet=${encodeURIComponent(diet)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ),
  );

  return [...staticRoutes, ...dynamicRoutes];
}
