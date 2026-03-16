"use client";

import { AuthLayoutTitle } from "@/components/auth-layout";
import { GoogleSignIn, SignInWithPassword } from "@/components/social-login";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div
        className="relative min-h-[220px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(18, 27, 25, 0.8), rgba(18, 27, 25, 0.15)), url('https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <div className="p-5">
          <AuthLayoutTitle>
            <p className="text-white/95 text-3xl font-extrabold">Welcome Back</p>
            <p className="text-sm text-white/80">Ready to find your next favorite meal?</p>
          </AuthLayoutTitle>
        </div>
      </div>

      <div className="flex-1 space-y-6 p-5">
        <div>
          <h1 className="text-2xl font-extrabold">Let&apos;s get cooking</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to access your personalized recipes.
          </p>
        </div>

        <SignInWithPassword isLoading={isLoading} setIsLoading={setIsLoading} />

        <div className="relative py-2 text-center text-sm text-muted-foreground">
          <span className="bg-background px-2">Or continue with</span>
          <div className="absolute left-0 right-0 top-1/2 -z-10 border-t border-border" />
        </div>

        <div className="flex justify-center">
          <GoogleSignIn isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
