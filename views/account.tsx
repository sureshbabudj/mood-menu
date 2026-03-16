"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { sessionAtom } from "@/lib/store";
import { auth } from "@/lib/firebaseClient";
import {
  updateProfile,
  updatePassword,
  sendEmailVerification,
  Auth,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  LogOut,
  User,
  Lock,
  Mail,
  Shield,
  Chrome,
  Loader,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ShieldCheckIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function Account() {
  const session = useAtomValue(sessionAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [displayName, setDisplayName] = useState(
    session?.user?.displayName || "",
  );
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Get current user
  const currentUser = (auth as Auth)?.currentUser;
  const isEmailUser = session?.isEmailUser;
  const isGoogleUser = session?.isGoogleUser;
  const emailVerified = currentUser?.emailVerified;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    try {
      await updateProfile(currentUser, { displayName });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getErrorMessage(error, "Failed to update profile."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newPassword) return;
    setLoading(true);
    try {
      await updatePassword(currentUser, newPassword);
      setNewPassword("");
      setShowPasswordForm(false);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getErrorMessage(error, "Failed to update password."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    if (!currentUser) return;
    setVerifyingEmail(true);
    try {
      const host =
        process.env.NEXT_PUBLIC_HOST ??
        process.env.HOST ??
        window.location.origin;

      await sendEmailVerification(currentUser, {
        url: `${host}`,
        handleCodeInApp: true,
      });
      toast({
        title: "Verification email sent",
        description: "Check your email to verify your address.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getErrorMessage(
          error,
          "Failed to send verification email.",
        ),
        variant: "destructive",
      });
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await (auth as Auth).signOut();
      router.push("/");
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getErrorMessage(error, "Failed to sign out."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto max-w-3xl p-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold font-sourgummy text-primary mb-2">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your profile, security, and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Auth Provider Badge & Status */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                  AUTHENTICATION METHOD
                </h3>
                <div className="flex items-center gap-3">
                  {isGoogleUser && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg border border-orange-200">
                      <Chrome className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">
                        Google Sign-In
                      </span>
                    </div>
                  )}
                  {isEmailUser && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">
                        Email & Password
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <ShieldCheckIcon className="w-8 h-8 text-primary opacity-90" />
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Profile Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address{" "}
                  <span className="text-muted-foreground">(Read-only)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    value={session?.user?.email || ""}
                    disabled
                    className="bg-muted pr-10"
                  />
                  {emailVerified ? (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {emailVerified ? (
                    <span className="text-emerald-700">✓ Email verified</span>
                  ) : (
                    <span className="text-amber-700">⚠ Email not verified</span>
                  )}
                </p>
              </div>

              {!emailVerified && isEmailUser && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSendVerificationEmail}
                  disabled={verifyingEmail}
                  className="w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifyingEmail && (
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Send Verification Email
                </Button>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Display Name
                </Label>
                <Input
                  id="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  className="h-10"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </div>

          {/* Security Section - Only for Email users */}
          {isEmailUser && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Security</h2>
              </div>

              {!showPasswordForm ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Keep your account secure by using a strong password.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPasswordForm(true)}
                    className="w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                  >
                    Change Password
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword} className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="new-password"
                      className="text-sm font-semibold"
                    >
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter a strong password"
                      className="h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                      Use a combination of uppercase, lowercase, numbers, and
                      symbols.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={loading || !newPassword}
                      className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading && (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      Update Password
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setNewPassword("");
                      }}
                      disabled={loading}
                      className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Google Account Info - For Google users */}
          {isGoogleUser && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Chrome className="w-5 h-5 mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">
                    Google Account Management
                  </h3>
                  <p className="text-sm text-orange-800 mb-4">
                    Your account is linked to Google. Password changes and
                    detailed security settings are managed through your Google
                    account for added security.
                  </p>
                  <a
                    href="https://myaccount.google.com/security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Manage Google Account
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Sign Out Section */}
          <div className="bg-card border border-destructive/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold">Sign Out</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Sign out from this device. You&apos;ll need to sign in again to
              access your account.
            </p>
            <Button
              type="button"
              variant="destructive"
              onClick={handleSignOut}
              className="w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Additional Security Info */}
          <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground border border-border">
            <p>
              🔒 This account is protected by MoodMenu&apos;s security practices
              and Firebase Authentication. Your data is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
