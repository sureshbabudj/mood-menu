"use client";

import { RecipeDetail } from "@/views/recipe";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import EmbedYouTube from "./embed-youtube";
import { RecipeTags } from "./recipe-tags";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check } from "lucide-react";

export interface Ingredient {
  name: string;
  measure: string;
  thumb: string;
}

type RecipeDetailsProps = React.HTMLAttributes<HTMLDivElement> & {
  recipe: RecipeDetail;
};

function processRecipeIngredients(recipe: RecipeDetail): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientNameRaw = recipe[`strIngredient${i}` as keyof RecipeDetail];
    const measureRaw = recipe[`strMeasure${i}` as keyof RecipeDetail];

    if (
      typeof ingredientNameRaw !== "string" ||
      ingredientNameRaw.trim() === ""
    ) {
      break;
    }

    const ingredientName = ingredientNameRaw.trim();
    const measure = typeof measureRaw === "string" ? measureRaw.trim() : "";

    ingredients.push({
      name: ingredientName,
      measure: measure,
      thumb: `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`,
    });
  }

  return ingredients;
}

function Ingredients({
  ingredients,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ingredients: Ingredient[] }) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set(),
  );
  const [justChecked, setJustChecked] = useState<string | null>(null);

  const handleIngredientCheck = (ingredientName: string) => {
    const newChecked = new Set(checkedIngredients);
    newChecked.has(ingredientName)
      ? newChecked.delete(ingredientName)
      : newChecked.add(ingredientName);
    setCheckedIngredients(newChecked);
    setJustChecked(ingredientName);
    setTimeout(() => setJustChecked(null), 300);
  };

  const completionPercent = Math.round(
    (checkedIngredients.size / ingredients.length) * 100,
  );

  return (
    <div className={cn("max-w-4xl mx-auto", className)} {...props}>
      <div
        className="flex items-center justify-between mb-4"
        style={{
          animation: "slide-up-fade 0.5s ease-out forwards",
          opacity: 0,
        }}
      >
        <h2 className="font-semibold text-lg font-sourgummy">
          Ingredients you&apos;ll love 🩷
        </h2>
        {ingredients.length > 0 && (
          <div className="text-xs font-semibold text-orange-500 transition-all duration-300">
            {checkedIngredients.size}/{ingredients.length} gathered
          </div>
        )}
      </div>

      {ingredients.length > 0 && (
        <div
          className="mb-4 h-2 bg-orange-500/10 rounded-full overflow-hidden"
          style={{
            animation: "slide-up-fade 0.5s ease-out forwards",
            opacity: 0,
            animationDelay: "50ms",
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500 ease-out shadow-lg shadow-orange-500/50"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {ingredients.map((ingredient, index) => {
          const isChecked = checkedIngredients.has(ingredient.name);
          const wasJustChecked = justChecked === ingredient.name;

          return (
            <div
              key={ingredient.name}
              onClick={() => handleIngredientCheck(ingredient.name)}
              style={{
                animation: "slide-up-fade 0.5s ease-out forwards",
                opacity: 0,
                animationDelay: `${75 + index * 40}ms`,
              }}
              className={cn(
                "flex gap-4 items-center cursor-pointer rounded-lg p-3 transition-all duration-200 group",
                isChecked
                  ? "bg-orange-500/10 border border-orange-400/30 shadow-md shadow-orange-500/20"
                  : "hover:bg-orange-500/5 border border-transparent hover:border-orange-400/20 hover:shadow-md hover:shadow-orange-500/10",
                "relative",
              )}
            >
              {/* Checkbox */}
              <div
                className={cn(
                  "relative flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300",
                  isChecked
                    ? "bg-orange-500 border-orange-500 shadow-md shadow-orange-500/50"
                    : "border-orange-300 group-hover:border-orange-400 group-hover:shadow-sm group-hover:shadow-orange-500/20",
                )}
              >
                {isChecked && (
                  <Check
                    size={14}
                    className={cn(
                      "text-white",
                      wasJustChecked && "animate-ingredient-check",
                    )}
                  />
                )}
              </div>

              <span
                className={cn(
                  "bg-secondary p-1.5 rounded-full flex-shrink-0 w-12 h-12 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:shadow-orange-500/20",
                  isChecked && "ring-2 ring-orange-400/30",
                )}
              >
                <AspectRatio ratio={1 / 1} className="w-full h-full">
                  <img
                    src={ingredient.thumb}
                    alt={`Photo for ${ingredient.name}`}
                    className={cn(
                      "rounded-full object-cover w-full h-full transition-all duration-300 group-hover:scale-110",
                      isChecked && "opacity-50 grayscale",
                    )}
                  />
                </AspectRatio>
              </span>

              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    "font-semibold text-sm transition-all duration-300",
                    isChecked && "line-through text-muted-foreground",
                  )}
                >
                  {ingredient.name}
                </h3>
                <p
                  className={cn(
                    "mt-0.5 text-xs transition-all duration-300",
                    isChecked
                      ? "text-muted-foreground"
                      : "text-orange-600 group-hover:text-orange-500",
                  )}
                >
                  {ingredient.measure}
                </p>
              </div>

              {/* Celebration particle on check */}
              {wasJustChecked && (
                <>
                  <div
                    className="absolute top-1 right-2 animate-scale-pop text-lg"
                    style={{
                      animation:
                        "scale-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                    }}
                  >
                    ✨
                  </div>
                  <div
                    className="absolute bottom-1 left-4 animate-scale-pop text-lg"
                    style={{
                      animation:
                        "scale-pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                      animationDelay: "50ms",
                    }}
                  >
                    🎉
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {checkedIngredients.size === ingredients.length &&
        ingredients.length > 0 && (
          <div
            className="mt-6 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-300/30 text-center animate-slide-up-fade shadow-lg shadow-orange-500/20"
            style={{
              animation: "slide-up-fade 0.5s ease-out forwards",
              opacity: 0,
              animationDelay: "500ms",
            }}
          >
            <p className="text-sm font-semibold text-orange-600">
              🎊 All set! Ready to cook like a champion! 🎊
            </p>
          </div>
        )}
    </div>
  );
}

export default function RecipeDetails({
  recipe,
  className,
  ...props
}: RecipeDetailsProps) {
  const ingredients = processRecipeIngredients(recipe);
  return (
    <div className="container mx-auto py-2">
      <div
        className={cn(
          "max-sm:relative max-sm:overflow-hidden flex max-sm:flex-col-reverse sm:flex-row justify-between mb-8",
          className,
        )}
        {...props}
      >
        <div className="w-2/3 max-sm:pl-4 space-y-4">
          <div
            style={{
              animation: "slide-up-fade 0.5s ease-out forwards",
              opacity: 0,
            }}
          >
            <h3 className="font-semibold text-2xl sm:text-3xl lg:text-4xl font-sourgummy text-primary mb-3">
              {recipe.strMeal}
            </h3>
          </div>
          <div
            style={{
              animation: "slide-up-fade 0.5s ease-out forwards",
              opacity: 0,
              animationDelay: "100ms",
            }}
          >
            <RecipeTags
              ingredients={[]}
              cuisine={recipe.strArea}
              category={recipe.strCategory}
            />
          </div>
          <div
            style={{
              animation: "slide-up-fade 0.6s ease-out forwards",
              opacity: 0,
              animationDelay: "200ms",
            }}
          >
            <Ingredients ingredients={ingredients} />
          </div>
        </div>
        <div
          className="max-sm:absolute max-sm:-right-[20%] max-[480px]:scale-150 max-sm:scale-125 max-sm:top-[25%] px-3 w-1/2 drop-shadow-2xl"
          style={{
            animation: "slide-up-fade 0.6s ease-out forwards",
            opacity: 0,
            animationDelay: "150ms",
          }}
        >
          <AspectRatio ratio={1 / 1} className="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recipe.strMealThumb}
              alt={`Photo for ${recipe.strMeal}`}
              className="rounded-full object-cover h-auto hover:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
        </div>
      </div>
      <div className="max-sm:px-4 pb-12">
        <div
          style={{
            animation: "slide-up-fade 0.5s ease-out forwards",
            opacity: 0,
            animationDelay: "300ms",
          }}
        >
          <h3 className="font-semibold text-xl sm:text-xl lg:text-2xl font-sourgummy text-primary mb-3">
            Recipe Preparation
          </h3>
          <p className="mb-6 whitespace-pre-line">{recipe.strInstructions}</p>
        </div>
        {recipe.strYoutube && (
          <div
            style={{
              animation: "slide-up-fade 0.5s ease-out forwards",
              opacity: 0,
              animationDelay: "400ms",
            }}
          >
            <EmbedYouTube videoUrl={recipe.strYoutube} />
          </div>
        )}
      </div>
    </div>
  );
}
