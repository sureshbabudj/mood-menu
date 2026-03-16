"use client";

import { HotRecipes } from "@/components/hot-recipes";
import {
  CuisineEnum,
  DietaryPreferencesEnum,
  MoodEnum,
} from "@/components/recipe-from";
import { RecipeList } from "@/components/recipe-list";
import { RecipeTags } from "@/components/recipe-tags";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { moods } from "@/lib/data";
import { getRandom } from "@/lib/utils";
import { Recipe } from "@/orm/recipe.collection";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Zap } from "lucide-react";

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
  const [hotRecipes, setHotRecipes] = useState<Recipe[]>([]);
  const [current, setCurrent] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  function getUniqueRecipes(recipes: Recipe[]): Recipe[] {
    const uniqueRecipes = new Map<string, Recipe>();
    recipes.forEach((recipe) => {
      uniqueRecipes.set(recipe.idMeal, recipe);
    });
    return Array.from(uniqueRecipes.values());
  }

  useEffect(() => {
    async function fetchRecipes(
      ingredients: string[],
      category: string,
      cuisine: string
    ) {
      try {
        const [{ meals: res1 }, { meals: res2 }, { meals: res3 }] =
          (await Promise.all([
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}&c=${category}&i=${ingredients[0]}`
            ).then((res) => res.json()),
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}&c=${category}&i=${ingredients[1]}`
            ).then((res) => res.json()),
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}&c=${category}&i=${ingredients[2]}`
            ).then((res) => res.json()),
          ])) as { meals: Recipe[] }[];
        const result = getUniqueRecipes([...res1, ...res2, ...res3]);
        setHotRecipes(result.slice(0, 5));
        setRecipes(result.slice(5));
        setPage(1);
      } catch (error: unknown) {
        toast({
          title: "Error:",
          variant: "destructive",
          description: getErrorMessage(
            error,
            "Internal error while fetching recipes."
          ),
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
        title: "Error:",
        variant: "destructive",
        description: <div className="text-bg-400">Something went wrong</div>,
      });
      router.push("/");
    }
  }, [mood, dietaryPreference, cuisine, router]);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 300);
  }, []);

  useEffect(() => {
    function getCurrentRecipes(page: number) {
      const size = 12;
      const start = (page - 1) * size;
      const end = start + size;
      const newRecipes = recipes.slice(0, end);
      setCurrent(newRecipes);
      setHasMore(page * size < recipes.length);
    }
    if (page !== 0) {
      getCurrentRecipes(page);
    }
  }, [page, recipes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero Section */}
        <div className="relative py-12 space-y-4 overflow-hidden">
          <div className="absolute -top-20 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium animate-bounce-subtle">
              <span className="animate-pulse">✨</span>
              <span>Discovery Mode</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Feeling <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400">{mood}?</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-2xl">
              We've found <span className="font-bold text-orange-400">{hotRecipes.length + recipes.length} amazing recipes</span> crafted perfectly for your vibe. Let's get cooking! 🍽️
            </p>
          </div>
        </div>

        {/* Tags & Filters */}
        <div className="mb-12 space-y-6">
          <RecipeTags
            ingredients={ingredients}
            cuisine={cuisine!}
            category={dietaryPreference!}
          />
        </div>

        {/* Hot Recipes Section */}
        {hotRecipes.length > 0 && (
          <div className="mb-12">
            <HotRecipes recipes={hotRecipes} />
          </div>
        )}

        {/* Featured Recipes Section */}
        {current.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full" />
              <h2 className="text-3xl font-semibold font-sourgummy text-white">
                Featured Recipes
              </h2>
            </div>
            <RecipeList recipes={current} />
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="relative group bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
              <span className="flex items-center gap-2">
                {isLoadingMore ? (
                  <>
                    <span className="animate-spin">⚡</span>
                    Loading More Magic...
                  </>
                ) : (
                  <>
                    Discover More Recipes
                    <ChevronDown className="group-hover:translate-y-1 transition-transform" size={20} />
                  </>
                )}
              </span>
            </Button>
          </div>
        )}

        {/* No Results State */}
        {current.length === 0 && hotRecipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No recipes found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your mood or preferences</p>
            <Button asChild className="bg-orange-500 hover:bg-orange-400 text-white rounded-full">
              <a href="/">Back to Discovery</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
