import { AuthLayoutTitle } from "@/components/auth-layout";
import { GoogleSignIn, SignInWithPassword } from "@/components/social-login";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <AuthLayoutTitle />
      <div className="mt-4">
        <SignInWithPassword isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
      <div className="mt-4 border-t border-t-muted p-4">
        <h3 className="text-small text-center mb-4 text-primary">or</h3>
        <div className=" flex flex-row space-x-4 justify-around">
          <GoogleSignIn isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      </div>
      <div className="mt-4 space-y-4 text-gray-600 text-center sm:-mb-8">
        <p className="text-xs">
          By proceeding, you agree to our{" "}
          <a href="/info#termsOfUse" className="underline">
            Terms of Use
          </a>{" "}
          and confirm you have read our{" "}
          <a href="/info#privacyPolicy" className="underline">
            Privacy and Cookie Statement
          </a>
          .
        </p>
        <p className="text-xs">
          This site is protected by reCAPTCHA and the{" "}
          <a
            href="https://policies.google.com/privacy"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/info#termsOfUse" className="underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </>
  );
}
