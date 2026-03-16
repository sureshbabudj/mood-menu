import type { Metadata } from "next";
import AboutView from "@/views/about";

export const metadata: Metadata = {
  title: "About MoodMenu",
  description:
    "Learn about MoodMenu, our mission, credits, and how to contact us.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
