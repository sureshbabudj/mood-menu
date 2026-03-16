import Link from "next/link";

export function ForgotPasswordSuccess() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-5 bg-card p-8 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-3xl">✅</div>
      <h1 className="text-2xl font-extrabold">Password reset complete</h1>
      <p className="text-sm text-muted-foreground">
        Your password has been updated successfully. Continue exploring your mood-based meals.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
      >
        Go to Home
      </Link>
    </div>
  );
}
