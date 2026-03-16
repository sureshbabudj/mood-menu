"use client";

import { AuthLayoutTitle } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebaseClient";
import { cn } from "@/lib/utils";
import { confirmPasswordReset } from "firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function ResetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      router.replace("/auth/login");
    }
  }, [oobCode, router]);

  if (!oobCode) return null;

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const newPassword = formData.get("newPassword");
      const confirmPassword = formData.get("confirmPassword");
      if (
        !newPassword ||
        typeof newPassword !== "string" ||
        !confirmPassword ||
        typeof confirmPassword !== "string"
      ) {
        throw new Error("Enter a valid password");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Confirm password does not match");
      }

      await confirmPasswordReset(auth, oobCode, newPassword);
      router.push("/");
    } catch (error: unknown) {
      toast({
        description: getErrorMessage(error, "Failed to update password. Please try again."),
        title: "Error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="p-5">
        <AuthLayoutTitle>
          <p className="text-2xl font-extrabold">Reset your password</p>
          <p className="text-sm text-muted-foreground">Set a new password to continue.</p>
        </AuthLayoutTitle>
      </div>
      <form onSubmit={handleResetPassword} className="space-y-4 p-5">
        <div className="grid gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input name="newPassword" type="password" className="h-12 rounded-xl" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input name="confirmPassword" type="password" className="h-12 rounded-xl" required />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={cn("h-12 w-full rounded-xl", { "pointer-events-none": isLoading })}
        >
          {isLoading ? "Updating..." : "Update password"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}
