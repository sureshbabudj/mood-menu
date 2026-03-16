import type { Metadata } from "next";
import Login from "@/views/login";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to MoodMenu to save favorites and sync your account.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/auth/login",
  },
};

export default function LoginPage() {
  return <Login />;
}
