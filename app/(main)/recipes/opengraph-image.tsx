import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";
export const alt = "MoodMenu - Discover recipes based on your mood";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
  searchParams,
}: {
  params?: Promise<{ mood?: string; cuisine?: string; diet?: string }>;
  searchParams?: Promise<{ mood?: string; cuisine?: string; diet?: string }>;
} = {}) {
  let resolvedParams = {};
  let resolvedSearchParams = {};

  try {
    if (params) resolvedParams = await params;
    if (searchParams) resolvedSearchParams = await searchParams;
  } catch {
    // Handle runtime errors gracefully
  }

  const moodValue =
    (resolvedParams as any)?.mood ||
    (resolvedSearchParams as any)?.mood ||
    "Your Mood";
  const cuisineValue =
    (resolvedParams as any)?.cuisine ||
    (resolvedSearchParams as any)?.cuisine ||
    "";
  const dietValue =
    (resolvedParams as any)?.diet || (resolvedSearchParams as any)?.diet || "";

  const mood = moodValue?.charAt
    ? moodValue.charAt(0).toUpperCase() + moodValue.slice(1)
    : "Your Mood";
  const cuisine = cuisineValue?.charAt
    ? cuisineValue.charAt(0).toUpperCase() + cuisineValue.slice(1)
    : "";
  const diet = dietValue?.charAt
    ? dietValue.charAt(0).toUpperCase() + dietValue.slice(1)
    : "";

  const moodEmoji: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    hungry: "🤤",
    tired: "😴",
    adventurous: "🚀",
    lazy: "🛋️",
    stressed: "😰",
    energetic: "⚡",
  };

  const selectedMood = (moodValue || "").toLowerCase();
  const emoji = moodEmoji[selectedMood] || "🍽️";

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
        gap: "20px",
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

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {/* Mood emoji */}
        <div
          style={{
            fontSize: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {emoji}
        </div>

        {/* Main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "64px",
              fontWeight: "700",
              color: "#ffffff",
              fontFamily: "'Sour Gummy', system-ui, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Feeling {mood}?
          </h1>

          {/* Filter tags */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {cuisine && (
              <div
                style={{
                  padding: "8px 16px",
                  background: "rgba(249, 115, 22, 0.2)",
                  border: "1px solid rgba(249, 115, 22, 0.5)",
                  borderRadius: "20px",
                  color: "#fbbf24",
                  fontSize: "18px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                🍳 {cuisine}
              </div>
            )}
            {diet && (
              <div
                style={{
                  padding: "8px 16px",
                  background: "rgba(249, 115, 22, 0.2)",
                  border: "1px solid rgba(249, 115, 22, 0.5)",
                  borderRadius: "20px",
                  color: "#fbbf24",
                  fontSize: "18px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                🥗 {diet}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          marginTop: "30px",
          fontSize: "24px",
          color: "#9ca3af",
          fontFamily: "system-ui, -apple-system, sans-serif",
          zIndex: 1,
        }}
      >
        Discover amazing recipes crafted for your vibe
      </div>
    </div>,
    {
      ...size,
    },
  );
}
