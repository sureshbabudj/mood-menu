import Link from "next/link";

export function SignInAgreement() {
  return (
    <div className="mt-4 space-y-4 text-gray-600 text-center sm:-mb-8">
      <p className="text-xs">
        By proceeding, you agree to our{" "}
        <Link href="/terms-of-service" className="underline">
          Terms of Use
        </Link>{" "}
        and confirm you have read our{" "}
        <Link href="/privacy-policy" className="underline">
          Privacy and Cookie Statement
        </Link>
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
        <Link href="/terms-of-service" className="underline">
          Terms of Service
        </Link>{" "}
        apply.
      </p>
    </div>
  );
}
