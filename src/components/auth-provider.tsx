import { auth } from "@/lib/firebaseClient";
import { PropsWithChildren } from "react";
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

  function processInfo(user: User, token?: string) {
    // check if provider is email and password login
    const isEmail = user.providerData.some(
      (provider) => provider.providerId === "password"
    );

    // check if the auth provider is google or not
    const isGoogle = user.providerData.some(
      (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
    );
    return {
      userLoggedIn: true,
      isEmailUser: isEmail,
      isGoogleUser: isGoogle,
      user: { ...user },
      ready: true,
      token,
    };
  }

  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setSession(processInfo(result.user, credential?.accessToken));
      }
    })
    .catch((error) => {
      console.log(error);
    });

  onAuthStateChanged(auth, function (user: User | null) {
    if (session && session.user && user !== null) {
      return;
    }
    if (!session?.user && user) {
      setSession(processInfo(user));
    } else {
      setSession({
        userLoggedIn: false,
        isEmailUser: false,
        isGoogleUser: false,
        user: null,
        ready: true,
      });
    }
  });

  return (
    <>
      {session?.ready ? (
        <>
          {children}{" "}
          <pre className="hidden">{JSON.stringify(auth.currentUser)}</pre>
        </>
      ) : (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
          <div className="flex justify-center items-center mt-[50vh]">
            <div className="fas fa-circle-notch fa-spin fa-5x text-violet-600"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
