import { Recipe } from "@/orm/entities/recipe";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import recipeDataSource from "@/orm/datasources/recipeDataSource";
import { HeartIcon } from "./bottom-nav-bar";
import { useAtom } from "jotai";
import { favoritesAtom, getFavorites } from "@/lib/store";
import { useEffect } from "react";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const connection = recipeDataSource.dataSource;

  const markFavorite = async (recipe: Recipe) => {
    try {
      const newFav = new Recipe();
      newFav.idMeal = recipe.idMeal;
      newFav.strMeal = recipe.strMeal;
      newFav.strMealThumb = recipe.strMealThumb;
      await connection
        .createQueryBuilder()
        .insert()
        .into(Recipe)
        .values([newFav])
        .execute();
      toast({
        title: "Success:",
        description:
          recipe.strMeal + " Recipe added to favorites successfully!",
      });
      if (favorites === null) {
        const favorites = await getFavorites();
        setFavorites(favorites);
      } else {
        setFavorites([...favorites, newFav]);
      }
    } catch (error: any) {
      toast({
        title: "Error:",
        variant: "destructive",
        description:
          error.message || "Internal Error while adding your favorite recipe",
      });
    }
  };

  const removeFavorite = async (recipe: Recipe) => {
    try {
      const removed = await connection
        .getRepository(Recipe)
        .delete(recipe.idMeal);
      if (removed.affected === 0) {
        throw new Error(
          `Failed to remove the favorite recipe bearing id ${recipe.idMeal}`
        );
      }
      if (favorites === null) {
        const favorites = await getFavorites();
        setFavorites(favorites);
      } else {
        const temp = favorites.filter((item) => item.idMeal !== recipe.idMeal);
        setFavorites(temp);
      }

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
    }
  };

  const fetchFavorites = async () => {
    const fav = await getFavorites();
    setFavorites(fav);
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
                    !isFav ? markFavorite(recipe) : removeFavorite(recipe);
                  }}
                >
                  {isFav ? (
                    <HeartIcon
                      width={12}
                      height={12}
                      className="text-pink-600"
                    />
                  ) : (
                    <Heart width={12} height={12} />
                  )}
                </Button>
              </div>
            </a>
          );
        })}
    </div>
  );
}
