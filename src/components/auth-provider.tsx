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
      user,
      ready: true,
      token,
    };
  }

  useEffect(() => {
    let mounted = true;

    // Listen for auth state changes (handles popup and persistent session)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!mounted) return;
      console.log("Auth State Changed:", user ? user.email : "No User");
      setSession(processInfo(user));
      setInitializing(false);
    });

    // Check for a redirect result (if the user still wants to use redirect)
    getRedirectResult(auth)
      .then((result) => {
        if (result && mounted) {
          console.log("Redirect Success:", result.user.email);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          setSession(processInfo(result.user, credential?.accessToken));
          setInitializing(false);
        }
      })
      .catch((error) => {
        if (mounted) {
          console.error("Redirect Error:", error);
          setInitializing(false);
        }
      });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [setSession]);

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
