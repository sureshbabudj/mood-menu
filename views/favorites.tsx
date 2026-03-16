"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import Link from "next/link";

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

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const data = await getCurrentUserRecipes();
        setFavorites(data);
      } catch (error: unknown) {
        toast({
          title: "Error",
          description: getErrorMessage(error, "Error while fetching favorites."),
        });
      }
    }

    fetchFavorites();
  }, [setFavorites]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight">Your Favorites</h1>
        <p className="text-sm text-muted-foreground">
          Recipes that match your mood perfectly.
        </p>
      </header>

      {favorites && favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((recipe) => (
            <Link
              href={`/recipes/${recipe.idMeal}`}
              key={recipe.id}
              className="group block overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm"
            >
              <div
                className="aspect-video w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ backgroundImage: `url(${recipe.strMealThumb})` }}
              />
              <div className="space-y-1 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Saved Recipe</p>
                <h2 className="text-lg font-bold leading-tight">{recipe.strMeal}</h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <section className="rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-8 text-center">
          <p className="text-xl font-bold">No favorites yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Start discovering recipes and tap the heart icon to save them here.
          </p>
          <Button asChild className="mt-5 rounded-xl">
            <Link href="/">Discover Recipes</Link>
          </Button>
        </section>
      )}
    </div>
  );
}
