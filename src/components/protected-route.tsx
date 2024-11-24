import { sessionAtom } from "@/lib/store";
import { supabase } from "@/lib/supabaseClient";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const navigate = useNavigate();

  const [session, setSession] = useAtom(sessionAtom);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setSession(null);
      }
      setSession(data.session);
      setReady(true);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        navigate("/login");
      } else if (event === "PASSWORD_RECOVERY") {
        navigate("/forgot-password");
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
        navigate("/");
      }
    });
  }, [session]);

  if (!ready) {
    return (
      <div className="h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))] flex flex-col justify-center items-center bg-emerald-900 text-white text-4xl text-center">
        Loading...
      </div>
    );
  }
  if (ready && !session?.user) {
    navigate("/login");
  }
  return element;
};

export default ProtectedRoute;
