import { cn } from "@/lib/utils";
import Greeting from "./greeting";
import { ChevronLeft, Info, LogIn, LogOut, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeartIcon } from "./bottom-nav-bar";
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
  const location = useLocation();
  const navigate = useNavigate();
  const session = useAtomValue(sessionAtom);
  const isHomePage = location.pathname === "/";
  return (
    <header className={cn("p-2 py-4 mx-auto", className)} {...props}>
      <div className="flex flex-row items-center mx-auto">
        <div className="hidden sm:block">
          <div className="flex flex-row space-x-2 items-center">
            <img
              src="/assets/logo.svg"
              alt="logo"
              className="w-8 h-8 lg:w-12 lg:h-12"
            />
            <a
              href="/"
              className="font-sourgummy text-2xl lg:text-3xl text-emerald-600 font-black leading-4 lg:leading-5"
            >
              Mood
              <br />
              <span className="text-gray-600">Menu</span>
            </a>
          </div>
        </div>
        <div className="hidden sm:block grow" />
        {!isHomePage && (
          <Button
            size="icon"
            variant="ghost"
            className=" sm:hidden"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
          </Button>
        )}
        {isHomePage && (
          <a
            href={session?.user ? "/account" : "/auth/login"}
            className="sm:text-right transition-colors hover:text-primary"
          >
            <Greeting />
            <h3 className="text-xl font-semibold">
              {session?.user?.displayName ?? session?.user?.email ?? "Guest"}
            </h3>
          </a>
        )}
        <div className="block sm:hidden grow" />
        <Button
          size="icon"
          variant="ghost"
          className="hidden sm:inline-flex text-red-500"
          asChild
        >
          <a href="/info">
            <Info />
          </a>
        </Button>

        <Button size="icon" variant="ghost" className="text-pink-500" asChild>
          <a href="/favorites">
            <HeartIcon />{" "}
          </a>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          asChild
          className="text-emerald-600"
        >
          <a href="/">
            <Search />
          </a>
        </Button>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-cyan-600 hidden sm:inline-flex h-10 w-10 overflow-hidden rounded-full"
                asChild
              >
                <a href="/account">
                  <Avatar>
                    {session.user.photoURL ? (
                      <AvatarImage
                        src={session.user.photoURL}
                        alt={session.user.displayName || "User"}
                      />
                    ) : (
                      <AvatarFallback>
                        {session.user.displayName?.[0] ?? "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </a>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/account">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => auth.signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive"
            asChild
          >
            <a href="/auth/login">
              <LogIn className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
