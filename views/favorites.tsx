"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";

import { RecipeList } from "@/components/recipe-list";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { favoritesAtom } from "@/lib/store";
import { getCurrentUserRecipes } from "@/orm/recipe.collection";
import SEO from "@/components/seo";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function Favorites() {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const fetchFavorites = async () => {
    try {
      const data = await getCurrentUserRecipes();
      setFavorites(data);
    } catch (error: unknown) {
      toast({
        title: "Error:",
        description: getErrorMessage(error, "Error while fetching favorites."),
      });
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto max-sm:px-4 py-4">
      <SEO title="My Favorites" noindex={true} />
      <h3 className="font-sourgummy font-semibold text-xl mb-3">
        🔥 Your Ultimate Go-To Recipes!
      </h3>
      <p className="text-base mb-6">
        These are your top picks, saved and ready to inspire your next delicious
        creation. Keep building your collection of flavor-packed favorites!
      </p>
      {favorites && favorites.length > 0 ? (
        <RecipeList recipes={favorites} />
      ) : (
        <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
          <p className="text-base text-muted-foreground">
            No favorites yet. Save recipes you love, and they will appear here.
          </p>
        </div>
      )}

      <p className="text-lg my-6 text-center">
        Didn&apos;t find what you were craving? <br />
        <Button asChild className="my-2 text-center">
          <a href="/">Head back and explore more recipes to love!</a>
        </Button>
      </p>
    </div>
  );
}
