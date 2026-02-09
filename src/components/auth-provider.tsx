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

export function Auth({ children }: PropsWithChildren) {
  const [session, setSession] = useAtom(sessionAtom);
  const [initializing, setInitializing] = useState(true);

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
      (provider) => provider.providerId === "password"
    );
    const isGoogle = user.providerData.some(
      (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
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

    // Handle initial redirect result (important for signInWithRedirect)
    getRedirectResult(auth)
      .then((result) => {
        if (mounted && result) {
          console.log("Auth Provider: Redirect result handled successfully");
          const credential = GoogleAuthProvider.credentialFromResult(result);
          setSession(processInfo(result.user, credential?.accessToken || undefined));
        }
      })
      .catch((error) => {
        console.error("Auth Provider: Redirect error", error);
      });

    // Standard observer for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!mounted) return;
      
      console.log("Auth Provider: ", user ? `User (${user.email}) is logged in` : "No active session");
      
      // Keep it "sticky" like in 0e8d222
      if (session?.user && user && session.user.uid === user.uid) {
        setInitializing(false);
        return;
      }

      setSession(processInfo(user));
      setInitializing(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [setSession, session?.user]);

  return (
    <>
      {!initializing && session?.ready ? (
        <>
          {children}
          <pre className="hidden">{JSON.stringify(auth.currentUser)}</pre>
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
