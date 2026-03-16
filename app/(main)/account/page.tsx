import type { Metadata } from "next";
import Account from "@/views/account";
import ProtectedRoute from "@/components/protected-route";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your MoodMenu profile and account security settings.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/account",
  },
};

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  );
}
