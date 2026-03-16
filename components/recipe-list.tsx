"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { HeartIcon } from "./bottom-nav-bar";
import { useAtom, useAtomValue } from "jotai";
import { favoritesAtom, sessionAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  addRecipe,
  deleteRecipe,
  getCurrentUserRecipes,
  Recipe,
  RecipeWithId,
} from "@/orm/recipe.collection";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [favLoading, setFavLoading] = useState("");
  const [readyForReducedMotion, setReadyForReducedMotion] = useState(false);
  const [favoritePopId, setFavoritePopId] = useState("");
  const session = useAtomValue(sessionAtom);
  const router = useRouter();

  const markFavorite = async (recipe: Recipe) => {
    try {
      const user = session?.user;

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setFavLoading(recipe.idMeal);
      const userId = user.uid;

      await addRecipe({
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        uid: userId,
      });
      await fetchFavorites();

      toast({
        title: "Success:",
        description:
          recipe.strMeal + " Recipe added to favorites successfully!",
      });
    } catch (error: unknown) {
      toast({
        title: "Error:",
        variant: "destructive",
        description: getErrorMessage(
          error,
          "Internal error while adding your favorite recipe."
        ),
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
    } catch (error: unknown) {
      toast({
        title: "Error:",
        variant: "destructive",
        description: getErrorMessage(error, "Something went wrong."),
      });
    } finally {
      setFavLoading("");
    }
  };

  const fetchFavorites = async () => {
    if (!session?.user) return;
    try {
      const newFav = await getCurrentUserRecipes();
      setFavorites(newFav);
    } catch (error: unknown) {
      setFavorites([]);
      toast({
        title: "Error:",
        variant: "destructive",
        description: getErrorMessage(error, "Something went wrong."),
      });
    }
  };

  useEffect(() => {
    if (!favorites && session?.user) {
      fetchFavorites();
    } else if (!session?.user) {
      setFavorites([]);
    }
  }, [session]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReadyForReducedMotion(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
      {favorites &&
        recipes.map((recipe, index) => {
          const favoriteItem = favorites.find(
            ({ idMeal }) => recipe.idMeal === idMeal
          );
          const FavIcon = favoriteItem ? HeartIcon : Heart;
          return (
            <Link
              title={recipe.strMeal}
              href={`/recipes/${recipe.idMeal}`}
              key={recipe.idMeal}
              className={cn(
                "mm-recipe-card break-inside-avoid border border-muted block rounded-md bg-muted/80 hover:bg-muted shadow-lg mb-6 p-4 pb-0",
                {
                  "mm-recipe-card-ready": readyForReducedMotion,
                }
              )}
              style={{ "--stagger": index % 10 } as React.CSSProperties}
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
                  aria-label={
                    favoriteItem
                      ? `Remove ${recipe.strMeal} from favorites`
                      : `Add ${recipe.strMeal} to favorites`
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setFavLoading(recipe.idMeal);
                    setFavoritePopId(recipe.idMeal);
                    window.setTimeout(() => setFavoritePopId(""), 260);
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
                          "mm-favorite-icon-pop": favoritePopId === recipe.idMeal,
                        })}
                      />
                    )}
                  </>
                </Button>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
