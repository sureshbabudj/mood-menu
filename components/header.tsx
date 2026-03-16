"use client";

import { cn } from "@/lib/utils";
import Greeting from "./greeting";
import { ChevronLeft, Info, LogIn, Search, Heart, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sessionAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import { auth } from "@/lib/firebaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const pathname = usePathname();
  const router = useRouter();
  const session = useAtomValue(sessionAtom);
  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full px-4 py-3 transition-all",
          className,
        )}
        {...props}
      >
        <div className="container mx-auto flex flex-row items-center gap-4">
          {/* Back Button for Mobile Search/Results */}
          <div className="flex">
            {!isHomePage && (
              <Button
                size="icon"
                variant="ghost"
                className="sm:hidden text-primary-foreground hover:text-white hover:bg-white/10"
                aria-label="Go back"
                onClick={() => router.back()}
              >
                <ChevronLeft size={20} />
              </Button>
            )}
            {/* Logo Section */}
            <Link
              href="/"
              className={cn(
                "items-center transition-transform hover:scale-105 flex",
                { "gap-3": isHomePage },
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo.svg"
                alt="logo"
                className="w-5 h-6 lg:w-7 lg:h-7"
              />

              <div className="font-sourgummy text-xl lg:text-2xl leading-none hidden sm:block">
                <span className="text-orange-400 font-black tracking-tight">
                  Mood
                </span>
                <span className="text-orange-300 font-bold -mt-1\">Menu</span>
              </div>
            </Link>
          </div>

          <div className="grow" />

          {/* Navigation Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex text-primary-foreground hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
              asChild
            >
              <Link href="/info" aria-label="Information">
                <Info size={20} />
              </Link>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              asChild
            >
              <Link href="/favorites" aria-label="Favorites">
                <Heart size={20} />
              </Link>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
              asChild
            >
              <Link href="/" aria-label="Search recipes">
                <Search size={20} />
              </Link>
            </Button>
          </div>

          {/* User Profile / Auth Section */}
          <div className="flex items-center gap-4 pl-2 border-l border-white/10">
            {isHomePage && (
              <div className="hidden md:flex flex-col items-end justify-center">
                <Greeting />
                <h3 className="text-sm font-bold text-primary tracking-wide">
                  {session?.user?.displayName ??
                    session?.user?.email?.split("@")[0] ??
                    "Guest"}
                </h3>
              </div>
            )}

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative group outline-none">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
                    <Avatar className="h-9 w-9 border border-white/20 relative">
                      <AvatarImage
                        src={session.user.photoURL ?? ""}
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-slate-800 text-white font-bold">
                        {session.user.displayName?.[0] ?? <User size={16} />}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-slate-900/95 backdrop-blur-xl border-white/10 text-white"
                >
                  <DropdownMenuLabel className="font-bold text-muted text-[10px] uppercase tracking-widest">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    asChild
                    className="focus:bg-orange-500/20 focus:text-white cursor-pointer"
                  >
                    <Link href="/account">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    className="text-rose-400 focus:bg-rose-500 focus:text-white cursor-pointer"
                    onClick={() => auth?.signOut()}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                asChild
                className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl px-5 h-10 shadow-lg shadow-orange-500/20"
              >
                <Link href="/auth/login" className="flex items-center gap-2">
                  <LogIn size={16} />
                  <span className="font-bold text-xs uppercase tracking-wider hidden sm:block">
                    Log in
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      {/* Subtle top glow line */}
      <div className="h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />
    </>
  );
};

export default Header;
