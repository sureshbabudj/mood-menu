import { auth } from "@/lib/firebaseClient";
import { PropsWithChildren, useEffect, useState } from "react";
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useAtom } from "jotai";
import { sessionAtom } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";

export function Auth({ children }: PropsWithChildren) {
  const [session, setSession] = useAtom(sessionAtom);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  function processInfo(user: User | null, token?: string) {
    if (!user) {
      return {
        userLoggedIn: false,
        isEmailUser: false,
        isGoogleUser: false,
        user: null,
        ready: true,
        token: undefined,
      };
    }

    const isEmail = user.providerData.some(
      (provider) => provider.providerId === "password",
    );
    const isGoogle = user.providerData.some(
      (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID,
    );

    return {
      userLoggedIn: true,
      isEmailUser: isEmail,
      isGoogleUser: isGoogle,
      user: { ...user }, // Spread as in 0e8d222
      ready: true,
      token,
    };
  }

  useEffect(() => {
    let mounted = true;

    // Only set up auth listeners in browser environment
    if (!auth) {
      return;
    }

    // Track initialization through the auth listener
    let initialized = false;

    // Handle initial redirect result (important for signInWithRedirect)
    getRedirectResult(auth)
      .then((result) => {
        if (mounted && result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          setSession(
            processInfo(result.user, credential?.accessToken || undefined),
          );
        }
      })
      .catch(() => {
        // Ignore redirect errors here. The app still relies on onAuthStateChanged.
      });

    // Standard observer for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!mounted) return;

      // Keep it "sticky" like in 0e8d222
      if (session?.user && user && session.user.uid === user.uid) {
        if (!initialized) {
          initialized = true;
          setInitializing(false);
        }
        return;
      }

      setSession(processInfo(user));
      if (!initialized) {
        initialized = true;
        setInitializing(false);

        // Redirect to home if user just signed in and is not on an auth page
        if (user && !pathname?.startsWith("/auth") && pathname !== "/") {
          router.push("/");
        } else if (user && pathname?.startsWith("/auth")) {
          // Redirect authenticated users away from auth pages
          router.push("/");
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [setSession, session?.user, pathname, router]);

  return (
    <>
      {!initializing && session?.ready ? (
        <>
          {children}
          <pre className="hidden">
            {JSON.stringify(auth?.currentUser ?? null)}
          </pre>
        </>
      ) : (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
}

export default Auth;
