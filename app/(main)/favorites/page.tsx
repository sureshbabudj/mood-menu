import type { Metadata } from "next";
import Favorites from "@/views/favorites";
import ProtectedRoute from "@/components/protected-route";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "View and manage your saved MoodMenu favorite recipes.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/favorites",
  },
};

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  );
}
