import { RecipeDetail } from "@/views/recipe";
import { cn } from "@/lib/utils";
import { Clock3, Flame, Star } from "lucide-react";

type RecipeDetailsProps = React.HTMLAttributes<HTMLDivElement> & {
  recipe: RecipeDetail;
};

type Ingredient = {
  name: string;
  measure: string;
};

function processRecipeIngredients(recipe: RecipeDetail): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetail];
    const measure = recipe[`strMeasure${i}` as keyof RecipeDetail];

    if (typeof ingredient === "string" && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient.trim(),
        measure: typeof measure === "string" ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

export default function RecipeDetails({
  recipe,
  className,
  ...props
}: RecipeDetailsProps) {
  const ingredients = processRecipeIngredients(recipe);
  const steps = recipe.strInstructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <article
      className={cn(
        "mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-sm",
        className
      )}
      {...props}
    >
      <div className="relative aspect-4/3 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${recipe.strMealThumb})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="mb-2 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
            {recipe.strArea}
          </p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">{recipe.strMeal}</h1>
        </div>
      </div>

      <div className="space-y-8 p-5 sm:p-8">
        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-muted p-4 text-center">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Rating</p>
            <p className="mt-1 inline-flex items-center gap-1 text-lg font-bold">
              <Star className="h-4 w-4 text-primary" /> 4.8
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Energy</p>
            <p className="mt-1 inline-flex items-center gap-1 text-lg font-bold">
              <Flame className="h-4 w-4 text-primary" /> 450 kcal
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Time</p>
            <p className="mt-1 inline-flex items-center gap-1 text-lg font-bold">
              <Clock3 className="h-4 w-4 text-primary" /> 30 min
            </p>
          </div>
        </div>

        <section>
          <h2 className="mb-4 text-xl font-extrabold">Ingredients</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {ingredients.map((ingredient) => (
              <label
                key={`${ingredient.name}-${ingredient.measure}`}
                className="flex items-center gap-3 rounded-xl border border-primary/10 bg-background p-3"
              >
                <input className="h-5 w-5 rounded border-primary/40 text-primary" type="checkbox" />
                <div>
                  <p className="font-semibold">{ingredient.name}</p>
                  <p className="text-sm text-muted-foreground">{ingredient.measure || "to taste"}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-extrabold">Instructions</h2>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li
                key={`${step.slice(0, 16)}-${index}`}
                className="flex gap-3 rounded-xl border border-primary/10 bg-background p-4"
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
