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
        throw new Error("Enter the valid password");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Confirm the new password twice");
      }

      await confirmPasswordReset(auth, oobCode, newPassword);
      router.push("/");
    } catch (e: unknown) {
      toast({
        description: getErrorMessage(
          e,
          "Failed to update password. Please try again."
        ),
        title: "Error:",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AuthLayoutTitle className="py-4">
        <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
          Reset your password to log in to{" "}
          <span className="font-sourgummy">MoodMenu</span>.
        </h2>
      </AuthLayoutTitle>
      <form onSubmit={handleResetPassword}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input name="newPassword" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input name="confirmPassword" type="password" required />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className={cn("w-full", { "pointer-events-none": isLoading })}
          >
            {isLoading ? "Updating..." : "Update password"}
          </Button>

          <div className="my-4 text-center text-primary">
            <Link href="/auth/login">Go back to log in</Link>
          </div>
        </div>
      </form>
    </>
  );
}
