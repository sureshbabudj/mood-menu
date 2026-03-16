import Account from "@/views/account";
import ProtectedRoute from "@/components/protected-route";

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  );
}
