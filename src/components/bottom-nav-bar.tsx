import {  Info, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className=" bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 sm:hidden">
      <div className="flex flex-row justify-around p-2">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => navigate("/")}
        >
          <svg
            className={cn(
              "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500",
              location.pathname === "/"
                ? "text-emerald-600 dark:text-emerald-500"
                : ""
            )}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="sr-only">Home</span>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => navigate("/favorites")}
        >
          <HeartIcon
            className={cn(
              "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500",
              location.pathname === "/favorites"
                ? "text-emerald-600 dark:text-emerald-500"
                : ""
            )}
          />
          <span className="sr-only">Favorites</span>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => navigate("/info")}
        >
          <Info
            className={cn(
              "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500",
              location.pathname === "/info"
                ? "text-emerald-600 dark:text-emerald-500"
                : ""
            )}
          />
          <span className="sr-only">Information</span>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => navigate("/account")}
        >
          <User
            className={cn(
              "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500",
              location.pathname === "/account"
                ? "text-emerald-600 dark:text-emerald-500"
                : ""
            )}
          />
          <span className="sr-only">Account</span>
        </Button>
      </div>
    </div>
  );
}
