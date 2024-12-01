import { sessionAtom } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function AuthLayoutTitle({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const location = useLocation();
  const navigate = useNavigate();
  const session = useAtomValue(sessionAtom);
  if (
    session?.user &&
    (location.pathname === "/auth/login" ||
      location.pathname === "/auth/register")
  ) {
    navigate("/");
    return null;
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <img
        src="/assets/logo.svg"
        loading="lazy"
        className="w-10"
        alt="MoodMenu Logo"
      />
      {children}
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-top))] flex items-center relative bg-gradient-to-br from-sky-50 to-gray-200">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
