import type { Metadata } from "next";
import { ForgotPasswordSuccess } from "@/views/forgot-password-success";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Password Reset Email Sent",
  description: "Your password reset email has been sent. Follow the link to continue.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/auth/forgot-password-success",
  },
};

export default function ForgotPasswordSuccessPage() {
  return <ForgotPasswordSuccess />;
}
