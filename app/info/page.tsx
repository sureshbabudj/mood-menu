import type { Metadata } from "next";
import Information from "@/views/info";

export const metadata: Metadata = {
  title: "Information & Legal",
  description: "Read about MoodMenu terms of use, privacy policy, and legal information.",
  alternates: {
    canonical: "/info",
  },
};

export default function InformationPage() {
  return <Information />;
}
