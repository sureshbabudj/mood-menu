"use client";

import React from "react";
import { CheckCircle, AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TermsOfService: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-lg mb-6 text-muted-foreground">
          Last Updated: March 2026
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using MoodMenu (&quot;the App&quot;), you agree
              to be bound by these Terms of Service. If you do not agree with
              any part of these terms, please do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              App Purpose & Use
            </h2>
            <div className="ml-8 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  Purpose
                </div>
                <p className="ml-6 text-muted-foreground">
                  MoodMenu is a free recipe discovery app that provides recipe
                  suggestions based on user inputs such as mood, dietary
                  preferences, and cuisine preferences. The App is provided
                  &quot;as-is&quot; without any warranty or guarantee of
                  availability.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  Permitted Use
                </div>
                <p className="ml-6 text-muted-foreground">
                  You may use MoodMenu only for lawful purposes and in a way
                  that does not infringe upon the rights of others or restrict
                  their use and enjoyment of the App.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              User Responsibilities
            </h2>
            <p className="mb-4">As a user of MoodMenu, you agree to:</p>
            <div className="ml-8 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>Comply with all applicable laws and regulations</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  Not attempt to gain unauthorized access to the App or its
                  systems
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  Not engage in any form of harassment, abuse, or inappropriate
                  behavior
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>Maintain the confidentiality of your account credentials</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  Be responsible for all activities that occur under your
                  account
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Accuracy of Information
            </h2>
            <p>
              While we strive to provide accurate and helpful recipe
              information, we do not guarantee the correctness, completeness, or
              suitability of all content provided. Recipes are sourced from
              third-party providers and may contain errors or outdated
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Third-Party Services & Content
            </h2>
            <p className="mb-4">
              MoodMenu uses third-party APIs and services for its functionality:
            </p>
            <div className="ml-8 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  <strong>TheMealDB:</strong> Recipe data and images are
                  provided by TheMealDB API. We are not responsible for the
                  accuracy or availability of this content.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  <strong>Firebase:</strong> Authentication and data syncing
                  services. Firebase has its own terms of service that you
                  implicitly agree to.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-primary mt-1 shrink-0" />
                <p>
                  <strong>Third-Party Integrations:</strong> Any other
                  integrated services have their own terms and privacy policies.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Disclaimer of Warranties
            </h2>
            <p>
              MoodMenu is provided &quot;AS IS&quot; and &quot;AS
              AVAILABLE&quot; without any warranties, express or implied. We
              make no warranties regarding:
            </p>
            <div className="ml-8 space-y-2 mt-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>The accuracy or reliability of any recipe information</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>
                  The suitability of recipes for your cooking ability or dietary
                  needs
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>The uninterrupted or error-free operation of the App</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>The security or protection of your data</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="text-destructive" />
              Limitation of Liability
            </h2>
            <p>
              MoodMenu and its creators are not liable for any direct, indirect,
              incidental, consequential, or punitive damages arising from:
            </p>
            <div className="ml-8 space-y-2 mt-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>The use or inability to use the App</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>
                  Health issues, allergies, or injuries related to recipes or
                  ingredients
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>Loss of data or unauthorized access to your account</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="text-destructive mt-1 shrink-0" />
                <p>
                  Any third-party content or services linked through MoodMenu
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Cookie Policy
            </h2>
            <p className="mb-4">
              MoodMenu uses cookies to improve your experience:
            </p>
            <div className="ml-8 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  Essential Cookies
                </div>
                <p className="ml-6 text-muted-foreground">
                  Required for basic app functionality, authentication, and
                  security.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  Analytics Cookies
                </div>
                <p className="ml-6 text-muted-foreground">
                  Help us understand user interactions and improve app
                  performance.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CheckCircle className="text-primary shrink-0" />
                  Preference Cookies
                </div>
                <p className="ml-6 text-muted-foreground">
                  Remember your settings and preferences for future visits.
                </p>
              </div>
            </div>
            <p className="mt-4 ml-8">
              You can disable cookies through your browser settings, but some
              features may not work properly without them. By using MoodMenu,
              you consent to our use of cookies as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Modifications to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Your continued use of MoodMenu following the posting of revised
              terms means you accept and agree to the changes. We will notify
              you of significant changes via email or a prominent notice on the
              App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Intellectual Property
            </h2>
            <p>
              MoodMenu owns or licenses all content, code, and design elements
              displayed in the App. Recipe content is sourced from third-party
              providers and remains their property. You may not reproduce,
              distribute, or transmit any content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend your account and
              access to MoodMenu at any time, without notice, for violation of
              these terms or any applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance
              with applicable laws. Any disputes arising from the use of
              MoodMenu shall be subject to the exclusive jurisdiction of the
              courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Contact
            </h2>
            <p>
              For questions about these Terms of Service, please contact us at{" "}
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

export default TermsOfService;
