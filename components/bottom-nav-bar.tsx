"use client";

import { Info, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const HeartIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    viewBox="0 0 22 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    aria-hidden="true"
    {...props}
  >
    <path d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"></path>
  </svg>
);

export function BottomNavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const itemBase =
    "inline-flex h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors";

  return (
    <nav className="border-t border-primary/10 bg-background/95 px-4 pb-6 pt-2 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <Button
          size="icon"
          variant="ghost"
          className={cn(itemBase, pathname === "/" ? "text-primary" : "text-muted-foreground")}
          onClick={() => router.push("/")}
          aria-label="Home"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            itemBase,
            pathname === "/favorites" ? "text-primary" : "text-muted-foreground"
          )}
          onClick={() => router.push("/favorites")}
          aria-label="Favorites"
        >
          <HeartIcon className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={cn(itemBase, pathname === "/info" ? "text-primary" : "text-muted-foreground")}
          onClick={() => router.push("/info")}
          aria-label="Info"
        >
          <Info className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={cn(itemBase, pathname === "/account" ? "text-primary" : "text-muted-foreground")}
          onClick={() => router.push("/account")}
          aria-label="Account"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}
