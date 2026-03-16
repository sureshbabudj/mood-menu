import type { Metadata } from "next";
import PrivacyPolicyView from "@/views/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read MoodMenu's privacy policy and learn how we protect your personal data.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}
