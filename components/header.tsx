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
  DropdownMenuGroup,
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full px-4 py-3 transition-all",
        className,
      )}
      {...props}
    >
      <div className="container mx-auto flex flex-row items-center gap-4">
        {/* Logo Section */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 transition-transform hover:scale-105",
            { "hidden sm:flex": !isHomePage },
          )}
        >
          <img
            src="/assets/logo.svg"
            alt="logo"
            className="w-7 h-7 lg:w-9 lg:h-9 "
          />

          <div className="font-sourgummy text-xl lg:text-2xl leading-none hidden sm:block">
            <span className="text-orange-400 font-black tracking-tight">Mood</span>
            <span className="text-orange-300 font-bold block -mt-1\">Menu</span>
          </div>
        </Link>

        <div className="grow" />

        {/* Back Button for Mobile Search/Results */}
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
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
                <DropdownMenuLabel className="font-bold text-primary-foreground text-[10px] uppercase tracking-widest">
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
  );
};

export default Header;
