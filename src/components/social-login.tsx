import * as React from "react";

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

function GoogleSvgComponent(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 10H110V110H10z" />
    </svg>
  );
}

export default GoogleSvgComponent;

export function SignInWithPassword({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const emailRef = React.useRef<any>(null);

  const forgotPassword = async () => {
    const redirectTo = process.env.SUPABASE_REDIRECT_URL;
    try {
      const email = emailRef.current?.value;
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (response.error) {
        throw response.error;
      }
      toast({
        description: "We have a sent a email to reset the password",
        title: "Success:",
      });
    } catch (e: any) {
      toast({
        description:
          e.error_description ||
          e.message ||
          "Failed to sign in. Please try again.",
        title: "Error:",
        variant: "destructive",
      });
    }
  };
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      if (
        !email ||
        typeof email !== "string" ||
        !password ||
        typeof password !== "string"
      ) {
        throw new Error("validation failed");
      }

      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (response.error) {
        throw response.error;
      }
    } catch (e: any) {
      toast({
        description:
          e.error_description ||
          e.message ||
          "Failed to sign in. Please try again.",
        title: "Error:",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSignIn}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="m@example.com"
            ref={emailRef}
            required
          />
        </div>{" "}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" asChild onClick={forgotPassword}>
              <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </Button>
          </div>
          <Input name="password" type="password" required />
        </div>{" "}
        <Button
          type="submit"
          className={cn("w-full", { "pointer-events-none": isLoading })}
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export function GoogleSignIn({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: process.env.SUPABASE_REDIRECT_URL },
      });
      if (error) throw error;
    } catch (err: any) {
      toast({
        description: "Failed to sign in. Please try again.",
        title: "Error:",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className={cn(
        "h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100",
        { "pointer-events-none": isLoading }
      )}
      onClick={handleSignIn}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12.5,10.2v3.8H18c-0.7,2.3-2.6,4-5.4,4c-3.3,0-6-2.7-6-6s2.7-6,6-6c1.5,0,2.9,0.5,3.9,1.5l2.8-2.8C17.5,3,15.1,2,12.5,2 C7,2,2.5,6.5,2.5,12s4.5,10,10,10c8.4,0,10.2-7.9,9.4-11.7L12.5,10.2z"></path>
      </svg>
    </button>
  );
}

export function GithubLogin({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  return (
    <button
      className={cn(
        "h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100",
        { "pointer-events-none": isLoading }
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-6 h-6"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    </button>
  );
}

export function FacebookLogin({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  return (
    <button
      className={cn(
        "h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100",
        { "pointer-events-none": isLoading }
      )}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 fill-gray-600"
      >
        <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
      </svg>
    </button>
  );
}
