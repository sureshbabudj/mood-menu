import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Information & Legal",
  description:
    "Read about MoodMenu terms of use, privacy policy, and legal information.",
  alternates: {
    canonical: "/info",
  },
};

export default function InformationPage() {
  return (
    <div className="container mx-auto p-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Information & Legal
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn about MoodMenu, our policies, and legal agreements
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* About Card */}
          <Link href="/about">
            <div className="h-full p-6 rounded-lg border border-border hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer bg-card hover:bg-muted/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Info
                    className="text-blue-600 dark:text-blue-400"
                    width={24}
                    height={24}
                  />
                </div>
                <h2 className="text-2xl font-bold">About Us</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Discover our mission, story, credits, and how to get in touch
                with the team behind MoodMenu.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <span>Learn More</span>
                <ArrowRight width={16} height={16} />
              </div>
            </div>
          </Link>

          {/* Privacy Policy Card */}
          <Link href="/privacy-policy">
            <div className="h-full p-6 rounded-lg border border-border hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer bg-card hover:bg-muted/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Shield
                    className="text-green-600 dark:text-green-400"
                    width={24}
                    height={24}
                  />
                </div>
                <h2 className="text-2xl font-bold">Privacy Policy</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Understand how we collect, use, protect, and respect your
                personal data and privacy rights.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <span>Read Policy</span>
                <ArrowRight width={16} height={16} />
              </div>
            </div>
          </Link>

          {/* Terms of Service Card */}
          <Link href="/terms-of-service">
            <div className="h-full p-6 rounded-lg border border-border hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer bg-card hover:bg-muted/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <FileText
                    className="text-purple-600 dark:text-purple-400"
                    width={24}
                    height={24}
                  />
                </div>
                <h2 className="text-2xl font-bold">Terms of Service</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Review the terms governing your use of MoodMenu, including
                cookie policy and liability information.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <span>Read Terms</span>
                <ArrowRight width={16} height={16} />
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Quick Links?</h3>
          <p className="text-muted-foreground mb-6">
            Jump directly to the section you're looking for
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline">
              <Link href="/about#contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/privacy-policy">Privacy & Data</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/terms-of-service#cookie">Cookies</Link>
            </Button>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
