"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { Heart } from "lucide-react";
import Link from "next/link";

import { RecipeList } from "@/components/recipe-list";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { favoritesAtom } from "@/lib/store";
import { getCurrentUserRecipes } from "@/orm/recipe.collection";

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
  }, [fetchFavorites]);

  return (
    <div className="container mx-auto max-sm:px-4 py-4">
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
        <div className="rounded-2xl border border-orange-400/20 bg-linear-to-br from-orange-500/5 via-orange-500/10 to-transparent p-8 text-center animate-scale-pop max-w-md mx-auto">
          <div className="mb-4 animate-bounce-subtle">
            <Heart className="w-16 h-16 mx-auto text-orange-400/60 stroke-1 opacity-60" />
          </div>
          <h4 className="text-xl font-semibold text-foreground mb-2">
            Your favorites collection is waiting to be created 💭
          </h4>
          <p className="text-sm text-muted-foreground mb-6">
            Start exploring recipes and save the ones that make your taste buds dance. Each save brings you closer to discovering your perfect meal! ✨
          </p>
          <Button className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-8 transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/">
              Discover Your Next Favorite 🍽️
            </Link>
          </Button>
        </div>
      )}

      <p className="text-lg my-6 text-center">
        Didn&apos;t find what you were craving? <br />
        <Button asChild className="my-2 text-center bg-orange-500 hover:bg-orange-400">
          <Link href="/">Head back and explore more recipes to love!</Link>
        </Button>
      </p>
    </div>
  );
}
