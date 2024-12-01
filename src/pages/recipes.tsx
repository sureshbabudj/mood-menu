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
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Recipes() {
  const [params] = useSearchParams();
  const dietaryPreference = params.get("diet");
  const cuisine = params.get("cuisine");
  const mood = params.get("mood");
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hotRecipes, setHotRecipes] = useState<Recipe[]>([]);
  const [current, setCurrent] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

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
      } catch (error: any) {
        toast({
          title: "Error:",
          variant: "destructive",
          description: error.message || "Internal Error while fetching recipes",
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
      navigate("/");
    }
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
  }, [page]);

  return (
    <div className="px-4 mb-2 container mx-auto">
      <h3>
        <span className="text-2xl font-sourgummy">Feeling {mood}?</span>
        <br />
        We’ve got {hotRecipes.length + recipes.length} amazing recipes that’ll
        hit the spot!
      </h3>

      <HotRecipes recipes={hotRecipes} />
      <RecipeTags
        ingredients={ingredients}
        cuisine={cuisine!}
        category={dietaryPreference!}
      />
      {current.length > 0 && (
        <h3 className="text-lg font-semibold font-sourgummy text-primary my-4">
          Featured Recipes
        </h3>
      )}
      <RecipeList recipes={current} />
      {hasMore && (
        <Button
          className="w-full my-4"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More...
        </Button>
      )}
    </div>
  );
}
