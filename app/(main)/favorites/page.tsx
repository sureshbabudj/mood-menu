import Favorites from "@/views/favorites";
import ProtectedRoute from "@/components/protected-route";

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  );
}
