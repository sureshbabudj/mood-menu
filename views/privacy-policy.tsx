"use client";

import React from "react";
import { AlertCircle, CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PrivacyPolicy: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-lg mb-6 text-muted-foreground">
          Last Updated: March 2026
        </p>

        <div className="space-y-6">
          <section>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-destructive mt-1 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Our Commitment to Privacy
                </h2>
                <p>
                  MoodMenu respects your privacy and is committed to protecting
                  your personal data. This privacy policy explains how we
                  collect, use, and protect your information.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              What Information We Collect
            </h2>
            <div className="ml-8 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-primary shrink-0" />
                  <strong>Account Information</strong>
                </div>
                <p className="ml-6 text-muted-foreground">
                  When you sign up or log in through email or social auth
                  (Google), we collect your name and email address.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-primary shrink-0" />
                  <strong>Recipe Preferences & Favorites</strong>
                </div>
                <p className="ml-6 text-muted-foreground">
                  We store your saved favorite recipes and your recipe
                  preferences to provide a personalized experience across your
                  devices.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-primary shrink-0" />
                  <strong>Usage Data</strong>
                </div>
                <p className="ml-6 text-muted-foreground">
                  We may collect anonymized information about how you use
                  MoodMenu to improve performance and user experience.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-primary shrink-0" />
                  <strong>Device Information</strong>
                </div>
                <p className="ml-6 text-muted-foreground">
                  Basic device information (browser type, operating system) may
                  be collected for analytics and troubleshooting purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              How We Use Your Information
            </h2>
            <div className="ml-8 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  To provide personalized recipe recommendations based on your
                  preferences
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>To sync your favorites and preferences across devices</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>To improve app performance and user experience</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>To send you important updates or service notifications</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>To troubleshoot technical issues and maintain security</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Third-Party Services
            </h2>
            <p className="mb-4">
              MoodMenu uses third-party services that may collect or process
              your data:
            </p>
            <div className="ml-8 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  Firebase Authentication
                </div>
                <p className="ml-6 text-muted-foreground">
                  Handles user authentication securely. View their{" "}
                  <a
                    href="https://firebase.google.com/support/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    privacy policy
                  </a>
                  .
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  TheMealDB API
                </div>
                <p className="ml-6 text-muted-foreground">
                  Provides recipe data. Your recipe requests may be logged by
                  this service. Visit{" "}
                  <a
                    href="https://www.themealdb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    TheMealDB
                  </a>
                  .
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  Google Drive (Optional)
                </div>
                <p className="ml-6 text-muted-foreground">
                  If you choose to sync favorites with Google Drive, your data
                  will be stored according to Google&apos;s privacy policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Data Security
            </h2>
            <p>
              Your data is encrypted and stored securely using industry-standard
              security practices. We do not store sensitive user data on our own
              servers. Authentication is handled by Firebase, and favorites are
              synced only with your explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Your Privacy Rights
            </h2>
            <div className="ml-8 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  <strong>Access:</strong> You can access your personal
                  information in your account settings
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  <strong>Update:</strong> You can update your profile
                  information at any time
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  <strong>Delete:</strong> You can delete your account and all
                  associated data
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  <strong>Opt-Out:</strong> You can opt out of analytics and
                  optional sync features
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Cookies
            </h2>
            <p>
              MoodMenu uses cookies to enhance your experience. See our{" "}
              <Link
                href="/terms-of-service"
                className="text-blue-500 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              for more information on our cookie policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any significant changes via email or through a
              prominent notice on our app. Your continued use of MoodMenu
              constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or our privacy
              practices, please contact us at{" "}
              <a
                href="mailto:sureshofcbe@gmail.com"
                className="text-blue-500 hover:underline"
              >
                sureshofcbe@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
