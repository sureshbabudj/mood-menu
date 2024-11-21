import { RecipeDetail } from "@/pages/recipe";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import EmbedYouTube from "./embed-youtube";
import { RecipeTags } from "./recipe-tags";
import { cn } from "@/lib/utils";

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

  for (let i = 1; i <= 100; i++) {
    const ingredientName = recipe[`strIngredient${i}` as keyof RecipeDetail];
    const measure = recipe[`strMeasure${i}` as keyof RecipeDetail];

    if (!ingredientName || ingredientName.trim() === "") {
      break;
    }

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
  return (
    <div className={cn("max-w-4xl mx-auto", className)} {...props}>
      <h2 className="font-semibold text-lg font-sourgummy mb-4">
        Ingredients you'll love 🩷
      </h2>
      <div className="grid md:grid-cols-2 gap-2">
        {ingredients.map((ingredient) => (
          <div key={ingredient.name} className="flex gap-4 items-center">
            <span className="bg-secondary p-1.5 rounded-full block w-16 h-16">
              <AspectRatio ratio={1 / 1}>
                <img
                  src={ingredient.thumb}
                  alt={`Photo for ${ingredient.name}`}
                  className="rounded-full object-cover  h-auto"
                />
              </AspectRatio>
            </span>
            <div>
              <h3 className="font-semibold text-xl">{ingredient.name}</h3>
              <p className="mt-1 text-orange-700">{ingredient.measure}</p>
            </div>
          </div>
        ))}
      </div>
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
    <>
      <div
        className={cn(
          "max-sm:relative max-sm:overflow-hidden flex max-sm:flex-col-reverse sm:flex-row justify-between mb-8",
          className
        )}
        {...props}
      >
        <div className="w-2/3 max-sm:pl-4">
          <h3 className="font-semibold text-2xl sm:text-3xl lg:text-4xl font-sourgummy text-primary mb-3">
            {recipe.strMeal}
          </h3>
          <RecipeTags
            ingredients={[]}
            cuisine={recipe.strArea}
            category={recipe.strCategory}
          />
          <Ingredients ingredients={ingredients} />
        </div>
        <div className="max-sm:absolute max-sm:-right-[20%] max-[480px]:scale-150 max-sm:scale-125 max-sm:top-[25%] px-3 w-1/2 drop-shadow-2xl">
          <AspectRatio ratio={1 / 1} className="">
            <img
              src={recipe.strMealThumb}
              alt={`Photo for ${recipe.strMeal}`}
              className="rounded-full object-cover  h-auto"
            />
          </AspectRatio>
        </div>
      </div>
      <div className="max-sm:px-4 pb-12">
        <h3 className="font-semibold text-xl sm:text-xl lg:text-2xl font-sourgummy text-primary mb-3">
          Recipe Preparation
        </h3>
        <p className="mb-6 whitespace-pre-line">{recipe.strInstructions}</p>
        {recipe.strYoutube && <EmbedYouTube videoUrl={recipe.strYoutube} />}
      </div>
    </>
  );
}
