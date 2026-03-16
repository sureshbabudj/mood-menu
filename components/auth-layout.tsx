import { cn } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";

export function AuthLayoutTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Link href="/" className={cn("space-y-2", className)}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
        MM
      </span>
      {children}
    </Link>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-card shadow-xl">
      {children}
    </div>
  );
}
