"use client";

import {
  CuisineEnum,
  DietaryPreferencesEnum,
  MoodEnum,
} from "@/components/recipe-from";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { moods } from "@/lib/data";
import { getRandom } from "@/lib/utils";
import { Recipe } from "@/orm/recipe.collection";
import { Clock3, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function Recipes() {
  const params = useSearchParams();
  const dietaryPreference = params.get("diet");
  const cuisine = params.get("cuisine");
  const mood = params.get("mood");

  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [current, setCurrent] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  function getUniqueRecipes(items: Recipe[]): Recipe[] {
    const uniqueRecipes = new Map<string, Recipe>();
    items.forEach((recipe) => {
      uniqueRecipes.set(recipe.idMeal, recipe);
    });
    return Array.from(uniqueRecipes.values());
  }

  useEffect(() => {
    async function fetchRecipes(
      ingredientPool: string[],
      category: string,
      selectedCuisine: string
    ) {
      try {
        const [{ meals: res1 }, { meals: res2 }, { meals: res3 }] =
          (await Promise.all([
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}&c=${category}&i=${ingredientPool[0]}`
            ).then((res) => res.json()),
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}&c=${category}&i=${ingredientPool[1]}`
            ).then((res) => res.json()),
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}&c=${category}&i=${ingredientPool[2]}`
            ).then((res) => res.json()),
          ])) as { meals: Recipe[] }[];

        const result = getUniqueRecipes([...(res1 ?? []), ...(res2 ?? []), ...(res3 ?? [])]);
        setRecipes(result);
        setPage(1);
      } catch (error: unknown) {
        toast({
          title: "Error",
          variant: "destructive",
          description: getErrorMessage(error, "Internal error while fetching recipes."),
        });
      }
    }

    const inputMood = MoodEnum.safeParse(mood).data;
    const inputDiet = DietaryPreferencesEnum.safeParse(dietaryPreference).data;
    const inputCuisine = CuisineEnum.safeParse(cuisine).data;
    if (inputMood && inputDiet && inputCuisine) {
      const ingredientsParsed = getRandom(moods[inputMood], 3);
      setIngredients(ingredientsParsed);
      fetchRecipes(ingredientsParsed, inputDiet, inputCuisine);
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
      });
      router.push("/");
    }
  }, [mood, dietaryPreference, cuisine, router]);

  useEffect(() => {
    const size = 12;
    const newRecipes = recipes.slice(0, page * size);
    setCurrent(newRecipes);
    setHasMore(page * size < recipes.length);
  }, [recipes, page]);

  const chips = [mood, cuisine, dietaryPreference].filter(Boolean) as string[];

  return (
    <div className="mx-auto w-full max-w-4xl pb-4">
      <div className="sticky top-[4.4rem] z-20 mb-4 border-b border-primary/10 bg-background/85 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto px-1 py-3">
          {chips.map((chip) => (
            <span
              key={chip}
              className="whitespace-nowrap rounded-xl border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              {chip}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </span>
        </div>
      </div>

      <header className="mb-6 space-y-2 px-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Curated for your mood</h1>
        <p className="text-sm text-muted-foreground">
          {current.length} recipes discovered using {ingredients.join(", ")}.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        {current.map((recipe) => (
          <Link
            key={recipe.idMeal}
            href={`/recipes/${recipe.idMeal}`}
            className="group rounded-2xl border border-primary/10 bg-card p-2 shadow-sm transition-all hover:-translate-y-1"
          >
            <div
              className="aspect-4/5 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${recipe.strMealThumb})` }}
            />
            <div className="px-1 pb-1 pt-3">
              <h2 className="line-clamp-2 text-sm font-bold sm:text-base">{recipe.strMeal}</h2>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock3 className="h-3 w-3" /> Meal idea
              </p>
            </div>
          </Link>
        ))}
      </section>

      {hasMore && (
        <Button
          className="mt-6 h-12 w-full rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More Recipes
        </Button>
      )}
    </div>
  );
}
