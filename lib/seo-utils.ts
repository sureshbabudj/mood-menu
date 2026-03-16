// SEO utilities for recipe pages
export interface RecipeSearchParams {
  mood?: string;
  cuisine?: string;
  diet?: string;
}

export function generateRecipeMetadata(params: RecipeSearchParams) {
  const { mood, cuisine, diet } = params;

  const title = [
    mood && `${mood} Mood`,
    cuisine && `${cuisine} Cuisine`,
    diet && `${diet} Recipes`,
  ]
    .filter(Boolean)
    .join(" | ");

  const description = [
    `Discover delicious`,
    diet && `${diet}`,
    cuisine && `${cuisine}`,
    mood && `recipes for when you're feeling ${mood.toLowerCase()}`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title: title || "Discover Perfect Recipes for Your Mood",
    description:
      description ||
      "Find recipes tailored to your current mood, cuisine preference, and dietary needs.",
    keywords: [
      "recipes",
      mood && mood.toLowerCase(),
      cuisine && cuisine.toLowerCase(),
      diet && diet.toLowerCase(),
      "mood-based recipes",
    ]
      .filter(Boolean)
      .join(", "),
  };
}

export function generateRecipeCanonicalUrl(
  params: RecipeSearchParams,
  baseUrl = "https://moodmenu.kanini.top",
): string {
  const queryParams = new URLSearchParams();

  if (params.mood) queryParams.append("mood", params.mood);
  if (params.cuisine) queryParams.append("cuisine", params.cuisine);
  if (params.diet) queryParams.append("diet", params.diet);

  const queryString = queryParams.toString();
  return queryString
    ? `${baseUrl}/recipes/?${queryString}/`
    : `${baseUrl}/recipes/`;
}

export function generateRecipeOGImage(params: RecipeSearchParams): string {
  const { mood, cuisine, diet } = params;
  const title = [mood, cuisine, diet && `${diet} Recipes`]
    .filter(Boolean)
    .join(" • ");

  // Using Vercel OG Image generation - will be implemented in opengraph-image.tsx
  return `/api/og?title=${encodeURIComponent(title)}&type=recipe`;
}
