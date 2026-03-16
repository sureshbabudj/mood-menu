import type { Metadata } from "next";
import Home from "@/views/home";

export const metadata: Metadata = {
  title: "Home",
  description: "Find meal ideas tailored to your mood, cuisine, and dietary preferences.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <Home />;
}
