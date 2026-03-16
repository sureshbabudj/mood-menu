import type { Metadata } from "next";
import Recipe from "@/views/recipe";

// Allow recipe IDs outside the prebuilt static set so links from results pages do not 404.
export const dynamicParams = true;

async function fetchRecipeById(id: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      { cache: "force-cache" }
    );

    const data = (await response.json()) as {
      meals?: Array<{
        strMeal: string;
        strInstructions: string;
        strMealThumb: string;
      }>;
    };

    return data.meals?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const recipe = await fetchRecipeById(routeParams.id);

  if (!recipe) {
    return {
      title: "Recipe",
      description: "Explore detailed recipe steps and ingredients on MoodMenu.",
      alternates: {
        canonical: `/recipes/${routeParams.id}`,
      },
    };
  }

  const description = recipe.strInstructions.substring(0, 160);

  return {
    title: recipe.strMeal,
    description,
    alternates: {
      canonical: `/recipes/${routeParams.id}`,
    },
    openGraph: {
      type: "article",
      title: recipe.strMeal,
      description,
      images: [
        {
          url: recipe.strMealThumb,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.strMeal,
      description,
      images: [recipe.strMealThumb],
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/latest.php",
      { cache: "force-cache" }
    );
    const data = (await response.json()) as {
      meals?: Array<{ idMeal: string }>;
    };

    return (data.meals ?? []).slice(0, 25).map(({ idMeal }) => ({ id: idMeal }));
  } catch {
    // Fallback static params so build stays deterministic if API is unavailable.
    return [{ id: "52772" }, { id: "52874" }, { id: "52977" }];
  }
}

export default function RecipePage() {
  return <Recipe />;
}
