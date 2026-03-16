import { ImageResponse } from "@vercel/og";

export const runtime = "nodejs";
export const alt = "MoodMenu - Discover recipes based on your mood";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
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
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          🍽️
        </div>

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
              fontWeight: "bold",
              background: "linear-gradient(120deg, #f97316 0%, #fb923c 100%)",
              backgroundClip: "text",
              color: "transparent",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            MoodMenu
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#e5e7eb",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Recipes for your mood
          </p>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
