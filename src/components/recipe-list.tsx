import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { HeartIcon } from "./bottom-nav-bar";
import { useAtom, useAtomValue } from "jotai";
import { favoritesAtom, sessionAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  addRecipe,
  deleteRecipe,
  getCurrentUserRecipes,
  Recipe,
  RecipeWithId,
} from "@/orm/recipe.collection";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [favLoading, setFavLoading] = useState("");
  const session = useAtomValue(sessionAtom);

  const markFavorite = async (recipe: Recipe) => {
    try {
      const user = session?.user;
      const userId = await user?.uid;

      if (!userId) {
        throw new Error("User not authenticated");
      }
      const docRef = await addRecipe({
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        uid: userId,
      });

      console.log({ docRef });
      await fetchFavorites();

      toast({
        title: "Success:",
        description:
          recipe.strMeal + " Recipe added to favorites successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error:",
        variant: "destructive",
        description:
          error.message || "Internal Error while adding your favorite recipe",
      });
    } finally {
      setFavLoading("");
    }
  };

  const removeFavorite = async (recipe: RecipeWithId) => {
    try {
      await deleteRecipe(recipe.id);
      await fetchFavorites();
      toast({
        title: "Success:",
        description: "The recipe has been unmarked as favorite",
      });
    } catch (error: any) {
      toast({
        title: "Error:",
        variant: "destructive",
        description: error.message || "Something went wrong!",
      });
    } finally {
      setFavLoading("");
    }
  };

  const fetchFavorites = async () => {
    try {
      const newFav = await getCurrentUserRecipes();
      setFavorites(newFav);
    } catch (error: any) {
      setFavorites([]);
      toast({
        title: "Error:",
        variant: "destructive",
        description: error.message || "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    if (!favorites) {
      fetchFavorites();
    }
  }, []);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
      {favorites &&
        recipes.map((recipe) => {
          const favoriteItem = favorites.find(
            ({ idMeal }) => recipe.idMeal === idMeal
          );
          const FavIcon = favoriteItem ? HeartIcon : Heart;
          return (
            <a
              title={recipe.strMeal}
              href={`/recipes/${recipe.idMeal}`}
              key={recipe.idMeal}
              className="break-inside-avoid border border-muted block rounded-md bg-muted hover:bg-gray-50 shadow-lg mb-6 p-4 pb-0"
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={recipe.strMealThumb}
                  alt={`Photo for ${recipe.strMeal}`}
                  className="h-full w-full rounded-sm object-cover"
                />
              </AspectRatio>
              <div className="flex flex-row items-center">
                <h4 className="text-sm">{recipe.strMeal}</h4>
                <div className="grow"></div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    setFavLoading(recipe.idMeal);
                    !favoriteItem
                      ? markFavorite(recipe)
                      : removeFavorite(favoriteItem);
                  }}
                >
                  <>
                    {favLoading === recipe.idMeal ? (
                      <Loader2
                        width={12}
                        height={12}
                        className="animate-spin"
                      />
                    ) : (
                      <FavIcon
                        width={12}
                        height={12}
                        className={cn("text-pink-600", {
                          "pointer-events-none": favLoading,
                        })}
                      />
                    )}
                  </>
                </Button>
              </div>
            </a>
          );
        })}
    </div>
  );
}
