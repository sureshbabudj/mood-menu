import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionAtom } from "@/lib/store";
import { supabase } from "@/lib/supabaseClient";

const useAuth = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

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
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
      } else if (event === "PASSWORD_RECOVERY") {
        debugger;
        navigate("/forgot-password");
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });
  }, [session]);

  return { ready, user: session?.user, accessToken: session?.access_token };
};

export default useAuth;
