import { AuthLayoutTitle } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebaseClient";
import { cn } from "@/lib/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ result });
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
      setLoading(false);
    }
  };
  return (
    <>
      <AuthLayoutTitle className="py-4">
        <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
          Register to get the best of {" "}
          <span className="font-sourgummy">MoodMenu</span>.
        </h2>
      </AuthLayoutTitle>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input name="password" type="password" required />
          </div>
          <Button
            type="submit"
            className={cn("w-full", { "pointer-events-none": loading })}
          >
            Register
          </Button>
          <div className="my-4 text-center text-primary">
            <a href="/auth/login">Go back to login</a>
          </div>
        </div>
      </form>
    </>
  );
}
