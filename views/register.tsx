"use client";

import { AuthLayoutTitle } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebaseClient";
import { cn } from "@/lib/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Link from "next/link";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function Register() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      if (
        !email ||
        typeof email !== "string" ||
        !password ||
        typeof password !== "string"
      ) {
        throw new Error("validation failed");
      }
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      toast({
        description: getErrorMessage(error, "Failed to register. Please try again."),
        title: "Error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div
        className="relative min-h-55 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(18, 27, 25, 0.82), rgba(18, 27, 25, 0.15)), url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <div className="p-5">
          <AuthLayoutTitle>
            <p className="text-white/95 text-3xl font-extrabold">Join MoodMenu</p>
            <p className="text-sm text-white/80">Discover recipes that match your mood.</p>
          </AuthLayoutTitle>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-5 p-5">
        <h1 className="text-2xl font-extrabold">Create your account</h1>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" placeholder="you@example.com" required className="h-12 rounded-xl" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" required className="h-12 rounded-xl" />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={cn("h-12 rounded-xl", { "pointer-events-none": loading })}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
