import { AuthLayoutTitle } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebaseClient";
import { cn } from "@/lib/utils";
import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  if (!oobCode) {
    return <Navigate to="/auth/login" />;
  }

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
      navigate("/");
    } catch (e: any) {
      toast({
        description:
          e.error_description ||
          e.message ||
          "Failed to update password. Please try again.",
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
          Reset the password.. to login{" "}
          <span className="font-sourgummy">MoodMenu</span>.
        </h2>
      </AuthLayoutTitle>
      <form onSubmit={handleResetPassword}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">New Password</Label>
            <Input name="newPassword" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="confirmPassword" type="password" required />
          </div>
          <Button
            type="submit"
            className={cn("w-full", { "pointer-events-none": isLoading })}
          >
            Update Password
          </Button>

          <div className="my-4 text-center text-primary">
            <a href="/auth/login">Go back to login</a>
          </div>
        </div>
      </form>
    </>
  );
}
