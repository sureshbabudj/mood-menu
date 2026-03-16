"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  accepted: boolean;
}

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    preferences: false,
    accepted: false,
  });

  useEffect(() => {
    // Check if user has already made a cookie choice
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (!savedPreferences) {
      setShowBanner(true);
    } else {
      const stored = JSON.parse(savedPreferences);
      setPreferences(stored);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      preferences: true,
      accepted: true,
    };
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowBanner(false);
    // Load analytics script if accepted
    loadAnalytics();
  };

  const handleRejectAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      preferences: false,
      accepted: true,
    };
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const newPreferences: CookiePreferences = {
      ...preferences,
      accepted: true,
    };
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowBanner(false);
    setShowDetails(false);
    // Load analytics if enabled
    if (newPreferences.analytics) {
      loadAnalytics();
    }
  };

  const handleToggleAnalytics = () => {
    setPreferences({
      ...preferences,
      analytics: !preferences.analytics,
    });
  };

  const handleTogglePreferences = () => {
    setPreferences({
      ...preferences,
      preferences: !preferences.preferences,
    });
  };

  const loadAnalytics = () => {
    // This is where you would load your analytics script
    // For example, Google Analytics, Mixpanel, etc.
    // Example:
    // const script = document.createElement('script');
    // script.async = true;
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_ID';
    // document.head.appendChild(script);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-2xl animate-in slide-in-from-bottom-0 duration-300">
        <div className="container mx-auto p-4 md:p-6">
          {showDetails ? (
            // Detailed Cookie Settings
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Cookie Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your cookie settings below. Essential cookies are
                    always enabled as they are required for the app to function.
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowDetails(false)}
                >
                  <X width={20} height={20} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Essential Cookies */}
                <div className="p-4 border border-border rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">Essential Cookies</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Required for basic functionality, security, and
                        authentication
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.essential}
                      disabled
                      className="mt-1"
                      aria-label="Essential cookies"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ✓ Always enabled (cannot be disabled)
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">Analytics Cookies</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Help us understand how you use MoodMenu to improve the
                        experience
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={handleToggleAnalytics}
                      className="mt-1"
                      aria-label="Analytics cookies"
                    />
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">Preference Cookies</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Remember your settings and preferences for future visits
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={handleTogglePreferences}
                      className="mt-1"
                      aria-label="Preference cookies"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row justify-end">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          ) : (
            // Simple Cookie Banner
            <div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-2">We use cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    We use essential cookies to make MoodMenu work, plus
                    analytics cookies to understand how you use the app and
                    improve it. Read our{" "}
                    <Link
                      href="/terms-of-service"
                      className="underline text-blue-600 hover:text-blue-700"
                      onClick={() => setShowBanner(false)}
                    >
                      cookie policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="underline text-blue-600 hover:text-blue-700"
                      onClick={() => setShowBanner(false)}
                    >
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <Button
                    variant="outline"
                    onClick={handleRejectAll}
                    className="text-sm"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(true)}
                    className="text-sm"
                  >
                    Customize
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className="text-sm bg-orange-600 hover:bg-orange-700"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for details view */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default CookieBanner;
