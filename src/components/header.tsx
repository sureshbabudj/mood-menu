import { cn } from "@/lib/utils";
import Greeting from "./greeting";
import { ChevronLeft, Heart, Info, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { HeartIcon } from "./bottom-nav-bar";
import { googleUserAtom } from "@/lib/store";
import { useAtomValue } from "jotai";

const Header = ({
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAtomValue(googleUserAtom);
  const isHomePage = location.pathname === "/";
  return (
    <header className={cn("p-2 py-4 mx-auto", className)} {...props}>
      <div className="flex flex-row items-center container mx-auto space-x-2 sm:space-x-4">
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
          <div className="sm:text-right">
            <Greeting />
            <h3 className="text-xl font-semibold">
              {user ? user.wt.Ad : "Guest"}
            </h3>
          </div>
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
      </div>
    </header>
  );
};

export default Header;
