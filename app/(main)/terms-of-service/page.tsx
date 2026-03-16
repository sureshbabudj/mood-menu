import type { Metadata } from "next";
import TermsOfServiceView from "@/views/terms-of-service";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read MoodMenu's terms of service and understand our cookie policy and user agreements.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return <TermsOfServiceView />;
}
