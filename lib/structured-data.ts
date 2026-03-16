// Structured data generation for JSON-LD
export interface RecipeStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    ratingCount: string;
  };
  author?: {
    "@type": string;
    name: string;
  };
}

export interface SearchActionStructuredData {
  "@context": string;
  "@type": string;
  target: {
    "@type": string;
    urlTemplate: string;
  };
  query_input?: string;
}

export function generateRecipeSearchAction(): SearchActionStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://moodmenu.kanini.top/recipes/?mood={mood}&cuisine={cuisine}&diet={diet}",
    },
    query_input: "required name=mood",
  };
}

export function generateWebsiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MoodMenu",
    description:
      "Discover recipes tailored to your mood, cuisine preference, and dietary needs",
    url: "https://moodmenu.kanini.top",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://moodmenu.kanini.top/recipes/?mood={mood}&cuisine={cuisine}&diet={diet}",
      },
      "query-input": "required name=query",
    },
  };
}

export function generateRecipeCollectionSchema(
  mood: string,
  cuisine: string,
  diet: string,
): RecipeStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${mood} ${cuisine} ${diet} Recipes`,
    description: `A collection of ${diet} recipes from ${cuisine} cuisine, perfect for when you're feeling ${mood}`,
    url: `https://moodmenu.kanini.top/recipes/?mood=${encodeURIComponent(mood)}&cuisine=${encodeURIComponent(cuisine)}&diet=${encodeURIComponent(diet)}`,
    applicationCategory: "Food & Cooking",
  };
}
