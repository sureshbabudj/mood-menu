import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeDetails from "@/components/recipe-details";
import SEO from "@/components/seo";
import { Helmet } from "react-helmet-async";

export interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: any;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: any;
  strCreativeCommonsConfirmed: any;
  dateModified: any;
}

export default function Recipe() {
  const { id: mealId } = useParams();
  const navigate = useNavigate();
  const id = Number(mealId);
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

  const getIngredients = (r: RecipeDetail) => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = r[`strIngredient${i}` as keyof RecipeDetail];
      const measure = r[`strMeasure${i}` as keyof RecipeDetail];
      if (ingredient && ingredient !== "") {
        list.push(`${measure} ${ingredient}`);
      }
    }
    return list;
  };

  const recipeSchema = recipe ? {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.strMeal,
    "image": [recipe.strMealThumb],
    "author": {
      "@type": "Organization",
      "name": "MoodMenu"
    },
    "description": recipe.strInstructions.substring(0, 160) + "...",
    "recipeCategory": recipe.strCategory,
    "recipeCuisine": recipe.strArea,
    "recipeIngredient": getIngredients(recipe),
    "recipeInstructions": recipe.strInstructions.split('\r\n').filter(i => i.trim() !== '').map(instruction => ({
      "@type": "HowToStep",
      "text": instruction
    }))
  } : null;

  useEffect(() => {
    async function fetchRecipe(id: number) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const result = (await response.json()) as { meals: RecipeDetail[] };
        setRecipe(result.meals[0]);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    }
    if (id) {
      fetchRecipe(id);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {recipe && (
        <>
          <SEO 
            title={recipe.strMeal} 
            description={recipe.strInstructions.substring(0, 160)} 
            image={recipe.strMealThumb}
            type="article"
          />
          {recipeSchema && (
            <Helmet>
              <script type="application/ld+json">
                {JSON.stringify(recipeSchema)}
              </script>
            </Helmet>
          )}
          <RecipeDetails recipe={recipe} />
        </>
      )}
    </>
  );
}
