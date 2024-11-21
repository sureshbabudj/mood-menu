import { RecipeList } from "@/components/recipe-list";
import { Button } from "@/components/ui/button";
import { favoritesAtom, getFavorites } from "@/lib/store";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export function Favorites() {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const fetchFavorites = async () => {
    const fav = await getFavorites();
    setFavorites(fav);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto max-sm:px-4 py-4">
      <h3 className="font-sourgummy font-semibold text-xl mb-3">
        🔥 Your Ultimate Go-To Recipes!
      </h3>
      <p className="text-base mb-6">
        These are your top picks, saved and ready to inspire your next delicious
        creation. Keep building your collection of flavor-packed favorites!
      </p>
      {favorites && <RecipeList recipes={favorites} />}

      <p className="text-lg my-6 text-center">
        Didn’t find what you were craving? <br />
        <Button asChild className="my-2 text-center">
          <a href="/">Head back and explore more recipes to love!</a>
        </Button>
      </p>
    </div>
  );
}
