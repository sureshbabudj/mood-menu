import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { HeartIcon } from "./bottom-nav-bar";
import { useAtom, useAtomValue } from "jotai";
import { favoritesAtom, sessionAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Recipe } from "@/types";
import { cn } from "@/lib/utils";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [favLoading, setFavLoading] = useState("");
  const session = useAtomValue(sessionAtom);

  const markFavorite = async (recipe: Recipe) => {
    try {
      const user = session?.user;
      const userId = user?.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }
      const { data, error } = await supabase
        .from("recipe")
        .upsert({
          idMeal: recipe.idMeal,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
          user_id: userId,
        })
        .select("*");

      if (error)
        throw new Error("Error marking the recipe as favorite:", error);

      setFavorites((prev) => (prev ? [...prev, ...data] : data));

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

  const removeFavorite = async (recipe: Recipe) => {
    try {
      const { error } = await supabase
        .from("recipe")
        .delete()
        .eq("idMeal", recipe.idMeal);

      if (error) {
        throw new Error(
          `Failed to remove the favorite recipe bearing id ${recipe.idMeal}`
        );
      }

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
      const { data, error } = await supabase.from("recipe").select("*");
      if (error) throw error;
      setFavorites(data as Recipe[]);
    } catch (error: any) {
      setFavorites([] as Recipe[]);
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
          const isFav = favorites.find(
            ({ idMeal }) => recipe.idMeal === idMeal
          );
          const FavIcon = isFav ? HeartIcon : Heart;
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
                    !isFav ? markFavorite(recipe) : removeFavorite(recipe);
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
