import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";
export const alt = "MoodMenu - Discover recipes";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
  searchParams,
}: {
  params?: Promise<{ mood?: string }>;
  searchParams?: Promise<{ mood?: string }>;
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
  const mood = moodValue?.charAt
    ? moodValue.charAt(0).toUpperCase() + moodValue.slice(1)
    : "Your Mood";

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
          gap: "15px",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {emoji}
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "56px",
            fontWeight: "700",
            color: "#ffffff",
            fontFamily: "'Sour Gummy', system-ui, sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Feeling {mood}?
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "24px",
            color: "#f97316",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: "500",
          }}
        >
          Discover amazing recipes 🍳
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
