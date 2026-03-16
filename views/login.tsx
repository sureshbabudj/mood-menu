"use client";

import { AuthLayoutTitle } from "@/components/auth-layout";
import { GoogleSignIn, SignInWithPassword } from "@/components/social-login";
import { useState } from "react";
import Link from "next/link";
import { SignInAgreement } from "./signin-agreement";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <AuthLayoutTitle>
        <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
          Sign in to unlock the <br /> best of{" "}
          <span className="font-sourgummy">MoodMenu</span>.
          <div className="text-lg">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary">
              Register here
            </Link>
          </div>
        </h2>
      </AuthLayoutTitle>
      <div className="mt-4">
        <SignInWithPassword isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
      <div className="mt-4 border-t border-t-muted p-4">
        <h3 className="text-small text-center mb-4 text-primary">or</h3>
        <div className=" flex flex-row space-x-4 justify-around">
          <GoogleSignIn isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>
      <SignInAgreement />
    </>
  );
}
