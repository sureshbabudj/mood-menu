"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { sessionAtom } from "@/lib/store";
import { auth } from "@/lib/firebaseClient";
import { updateProfile, updatePassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LogOut, Lock, Mail, User } from "lucide-react";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function Account() {
  const session = useAtomValue(sessionAtom);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(session?.user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName });
      toast({ title: "Success", description: "Profile updated successfully" });
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
    if (!auth.currentUser || !newPassword) return;
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      setNewPassword("");
      toast({ title: "Success", description: "Password updated successfully" });
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

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Account Settings</h1>

      <section className="space-y-4 rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 text-lg font-bold">
          <User className="h-5 w-5 text-primary" /> Profile Information
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" value={session?.user?.email || ""} disabled className="h-12 rounded-xl pl-10" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="h-12 rounded-xl"
            />
          </div>
          <Button type="submit" disabled={loading} className="rounded-xl">
            Update Profile
          </Button>
        </form>
      </section>

      {session?.isEmailUser && (
        <section className="space-y-4 rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Lock className="h-5 w-5 text-primary" /> Security
          </div>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-12 rounded-xl"
              />
            </div>
            <Button type="submit" variant="secondary" disabled={loading || !newPassword} className="rounded-xl">
              Change password
            </Button>
          </form>
        </section>
      )}

      <Button
        variant="destructive"
        className="flex items-center gap-2 rounded-xl"
        onClick={() => auth.signOut()}
      >
        <LogOut className="h-4 w-4" /> Sign out
      </Button>
    </div>
  );
}
