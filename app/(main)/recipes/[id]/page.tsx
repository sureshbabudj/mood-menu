import Recipe from "@/views/recipe";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/latest.php",
      { cache: "force-cache" }
    );
    const data = (await response.json()) as {
      meals?: Array<{ idMeal: string }>;
    };

    return (data.meals ?? []).slice(0, 25).map(({ idMeal }) => ({ id: idMeal }));
  } catch {
    // Fallback static params so build stays deterministic if API is unavailable.
    return [{ id: "52772" }, { id: "52874" }, { id: "52977" }];
  }
}

export default function RecipePage() {
  return <Recipe />;
}
