"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Info, LogIn, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HeartIcon } from "./bottom-nav-bar";
import { sessionAtom } from "@/lib/store";
import { useAtomValue } from "jotai";

const Header = ({
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const pathname = usePathname();
  const router = useRouter();
  const session = useAtomValue(sessionAtom);
  const isHomePage = pathname === "/";

  return (
    <header
      className={cn(
        "mx-auto flex w-full max-w-6xl items-center gap-2 px-1 py-2",
        className
      )}
      {...props}
    >
      {!isHomePage ? (
        <Button
          size="icon"
          variant="ghost"
          aria-label="Go back"
          onClick={() => router.back()}
          className="rounded-full bg-primary/10 text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          aria-label="Search recipes"
          className="rounded-full bg-primary/10 text-primary"
          onClick={() => router.push("/")}
        >
          <Search className="h-5 w-5" />
        </Button>
      )}

      <Link href="/" className="mr-auto flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Search className="h-4 w-4" />
        </span>
        <span className="text-lg font-extrabold tracking-tight text-primary">MoodMenu</span>
      </Link>

      <Button
        size="icon"
        variant="ghost"
        className="hidden rounded-full bg-primary/10 text-primary sm:inline-flex"
        asChild
      >
        <Link href="/info" aria-label="Information">
          <Info className="h-5 w-5" />
        </Link>
      </Button>

      <Button size="icon" variant="ghost" className="rounded-full bg-primary/10 text-primary" asChild>
        <Link href="/favorites" aria-label="Favorites">
          <HeartIcon className="h-5 w-5" />
        </Link>
      </Button>

      {session?.user ? (
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full bg-primary/10 text-primary"
          asChild
        >
          <Link href="/account" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
        </Button>
      ) : (
        <Button variant="secondary" className="h-9 rounded-full px-4" asChild>
          <Link href="/auth/login">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Log in</span>
          </Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
