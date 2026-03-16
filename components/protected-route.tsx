"use client";

import { sessionAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useAtomValue(sessionAtom);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.replace("/auth/login");
    }
  }, [router, session?.user]);

  if (!session?.user) return null;
  return children;
};

export default ProtectedRoute;
