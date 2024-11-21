import React, { useState, useEffect } from "react";
import { Sun, Moon, CloudSun, CloudMoon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

function getGreeting() {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else if (hours < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

const GreetingIcon = ({
  time,
  className,
  ...props
}: LucideProps & { time: string }) => {
  switch (time) {
    case "Good morning": {
      return <Sun className={cn("w-4", className)} {...props} />;
    }
    case "Good afternoon": {
      return <CloudSun className={cn("w-4", className)} {...props} />;
    }
    case "Good evening": {
      return <CloudMoon className={cn("w-4", className)} {...props} />;
    }
    case "Good night": {
      return <Moon className={cn("w-4", className)} {...props} />;
    }
  }
};

const Greeting = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <>
      {greeting && (
        <div
          className={cn(
            "flex flex-row space-x-2 text-sm items-center",
            className
          )}
          {...props}
        >
          <span>{greeting}</span>
          <GreetingIcon time={greeting} className="fill-violet-600" />
        </div>
      )}
    </>
  );
};

export default Greeting;
