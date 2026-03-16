import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <h1 className="font-sourgummy text-4xl font-bold text-primary">404</h1>
      <p className="text-xl">Oops! This recipe doesn&apos;t exist yet.</p>
      <img src="/assets/logo.svg" alt="MoodMenu Logo" className="h-24 w-24" />
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
