import type { Metadata } from "next";
import ResetPassword from "@/views/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your MoodMenu account.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/reset-password",
  },
};

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
