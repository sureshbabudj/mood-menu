"use client";

import React from "react";
import { CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const About: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        {/* About Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6">About MoodMenu</h1>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Welcome to MoodMenu, your culinary companion for discovering
              recipes based on your mood and preferences.
            </p>
            <p>
              MoodMenu is a free-to-use web application designed to help you
              discover recipes that match your mood, cuisine preferences, and
              dietary needs. Whether you&apos;re feeling adventurous,
              comfort-hungry, or looking for something quick and light, MoodMenu
              connects you with the perfect recipe.
            </p>
            <p>
              This project is non-commercial and built with passion for food
              lovers who want a more intuitive way to discover new recipes.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We believe that cooking should be easier and more enjoyable.
            Traditional recipe search can be overwhelming—endless options,
            unclear descriptions, and mismatched preferences. MoodMenu
            simplifies the process by focusing on what matters most: your mood
            and dietary needs.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Mood-Driven Discovery
                </h3>
                <p className="text-muted-foreground">
                  Start your culinary journey by selecting your mood, not just
                  ingredients.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Simplified Preferences
                </h3>
                <p className="text-muted-foreground">
                  Filter by cuisine and dietary needs to get truly relevant
                  results.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Personalized Experience
                </h3>
                <p className="text-muted-foreground">
                  Save your favorite recipes and access them anytime on any
                  device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credits Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Credits & Attribution</h2>
          <p className="text-lg text-muted-foreground mb-6">
            MoodMenu is built on the shoulders of amazing open-source projects
            and services:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <CheckCircle className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Recipe Data:{" "}
                  <a
                    href="https://www.themealdb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    TheMealDB API
                  </a>
                </h3>
                <p className="text-muted-foreground">
                  Providing a comprehensive database of meals and recipes from
                  around the world.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <CheckCircle className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Images:{" "}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Unsplash
                  </a>
                </h3>
                <p className="text-muted-foreground">
                  Beautiful, free stock photos used throughout the application.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <CheckCircle className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Tech Stack: Next.js, React, TypeScript, Tailwind CSS
                </h3>
                <p className="text-muted-foreground">
                  Modern web technologies powering a fast, responsive
                  experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <CheckCircle className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">
                  UI Components:{" "}
                  <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    shadcn/ui
                  </a>
                </h3>
                <p className="text-muted-foreground">
                  High-quality, accessible React components built on Radix UI
                  and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal & Licenses Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Legal & Licenses</h2>
          <p className="text-lg text-muted-foreground mb-6">
            MoodMenu adheres to open-source and creative licenses:
          </p>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This application uses data and services that comply with creative
              commons licenses for non-commercial usage. All recipe data,
              images, and third-party content retain their original ownership
              and licenses.
            </p>
            <p className="text-muted-foreground">
              MoodMenu respects the intellectual property rights of all content
              providers and third-party services. For detailed license
              information, visit{" "}
              <a
                href="https://creativecommons.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Creative Commons
              </a>
              .
            </p>
            <p className="text-muted-foreground">
              All open-source libraries and APIs used are subject to their
              respective licensing terms. See our{" "}
              <Link
                href="/terms-of-service"
                className="text-blue-500 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              for more details.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Have a question, suggestion, or feedback about MoodMenu? We&apos;d
            love to hear from you!
          </p>
          <div className="p-6 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Mail
                className="text-orange-600 dark:text-orange-400"
                width={24}
                height={24}
              />
              <h3 className="text-xl font-bold">Email Us</h3>
            </div>
            <p className="mb-4">For any queries, feedback, or support:</p>
            <a
              href="mailto:sureshofcbe@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Mail width={20} height={20} />
              sureshofcbe@gmail.com
            </a>
          </div>

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-bold mb-3">Feedback Topics We Love</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✨ Feature suggestions and ideas</li>
              <li>🐛 Bug reports and technical issues</li>
              <li>💡 Improvements to user experience</li>
              <li>🍳 Recipe or cuisine recommendations</li>
              <li>🤝 Collaboration and partnership inquiries</li>
            </ul>
          </div>
        </section>

        {/* Footer Links */}
        <section className="mt-12 pt-8 border-t">
          <p className="text-center text-muted-foreground mb-6">
            Learn more about MoodMenu
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy-policy"
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted text-foreground transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted text-foreground transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
