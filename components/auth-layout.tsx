import { cn } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function AuthLayoutTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Link href="/" className={cn("space-y-4", className)}>
      <Image
        src="/assets/logo.svg"
        width={40}
        height={40}
        loading="lazy"
        className="w-10"
        alt="MoodMenu Logo"
      />
      {children}
    </Link>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-top))] flex items-center relative bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
