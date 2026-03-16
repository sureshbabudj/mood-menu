import type { Metadata } from "next";
import Register from "@/views/register";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your MoodMenu account to personalize and save recipes.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/auth/register",
  },
};

export default function RegisterPage() {
  return <Register />;
}
