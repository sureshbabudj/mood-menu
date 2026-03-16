import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";
export const alt = "Recipe - MoodMenu";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let recipe = null;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      { cache: "force-cache" },
    );
    const data = await response.json();
    recipe = data.meals?.[0];
  } catch (e) {
    // Error handling
  }

  if (!recipe) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#f97316",
            marginBottom: "20px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          🍽️ MoodMenu
        </div>
        <p
          style={{
            fontSize: "32px",
            color: "#e5e7eb",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Recipes for your mood
        </p>
      </div>,
      { ...size },
    );
  }

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        gap: "30px",
      }}
    >
      {/* Background gradient accent */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Recipe Image */}
      <div
        style={{
          width: "280px",
          height: "280px",
          borderRadius: "16px",
          overflow: "hidden",
          flexShrink: 0,
          border: "3px solid rgba(249, 115, 22, 0.5)",
          zIndex: 1,
        }}
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Recipe Details */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
          flex: 1,
          zIndex: 1,
        }}
      >
        {/* Recipe Name */}
        <h1
          style={{
            margin: 0,
            fontSize: "44px",
            fontWeight: "700",
            color: "#ffffff",
            fontFamily: "'Sour Gummy', system-ui, sans-serif",
            letterSpacing: "-0.01em",
            lineHeight: "1.2",
          }}
        >
          {recipe.strMeal}
        </h1>

        {/* Category and Cuisine */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {recipe.strCategory && (
            <div
              style={{
                padding: "6px 12px",
                background: "rgba(249, 115, 22, 0.2)",
                border: "1px solid rgba(249, 115, 22, 0.5)",
                borderRadius: "14px",
                color: "#fbbf24",
                fontSize: "14px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: "500",
              }}
            >
              {recipe.strCategory}
            </div>
          )}
          {recipe.strArea && (
            <div
              style={{
                padding: "6px 12px",
                background: "rgba(249, 115, 22, 0.2)",
                border: "1px solid rgba(249, 115, 22, 0.5)",
                borderRadius: "14px",
                color: "#fbbf24",
                fontSize: "14px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: "500",
              }}
            >
              {recipe.strArea}
            </div>
          )}
        </div>

        {/* MoodMenu branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          <span style={{ fontSize: "22px" }}>🍽️</span>
          <span
            style={{
              fontSize: "18px",
              color: "#f97316",
              fontWeight: "bold",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            MoodMenu
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
