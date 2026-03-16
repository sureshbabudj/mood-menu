import type { Metadata } from "next";
import Recipes from "@/views/recipes";

type RecipesSearchParams = {
  mood?: string;
  cuisine?: string;
  diet?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<RecipesSearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const mood = params.mood;
  const cuisine = params.cuisine;
  const diet = params.diet;
  const title = mood ? `Recipes for ${mood} mood` : "Discover Recipes";
  const description = `Explore a variety of recipes${mood ? ` for your ${mood} mood` : ""}${cuisine ? ` in ${cuisine} cuisine` : ""}${diet ? ` matching your ${diet} diet` : ""}. Discover new flavors with MoodMenu.`;
  const query = new URLSearchParams();
  if (mood) query.set("mood", mood);
  if (cuisine) query.set("cuisine", cuisine);
  if (diet) query.set("diet", diet);

  return {
    title,
    description,
    keywords: `${mood ? `${mood} recipes, ` : ""}${cuisine ? `${cuisine} food, ` : ""}meal ideas, recipe finder, mood based dishes`,
    alternates: {
      canonical: query.toString() ? `/recipes?${query.toString()}` : "/recipes",
    },
  };
}

export default function RecipesPage() {
  return <Recipes />;
}
