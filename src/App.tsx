import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider, useAtom } from "jotai";

import Home from "@/pages/home";
import Recipes from "@/pages/recipes";
import Layout from "@/components/layout";
import Recipe from "@/pages/recipe";
import Information from "@/pages/info";
import Favorites from "@/pages/favorites";
import Login from "@/pages/login";
import ForgotPassword from "@/pages/forgot-password";

import { sessionAtom, store } from "@/lib/store";
import { AuthLayout } from "./components/auth-layout";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import ProtectedRoute from "./components/protected-route";

function NotFound() {
  return <div>404 Not Found</div>;
}
function AppRouter() {
  const location = useLocation();

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
        // navigate("/");
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        // navigate("/login");
      } else if (event === "PASSWORD_RECOVERY") {
        // navigate("/forgot-password");
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
        // navigate("/");
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

  const nonProtectedRoutes = ["/login"];

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<Recipe />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>{" "}
      <Route
        path="/forgot-password"
        element={
          session?.user && nonProtectedRoutes.includes(location.pathname) ? (
            <Navigate to="/login" replace />
          ) : (
            <AuthLayout />
          )
        }
      >
        <Route index element={<ForgotPassword />} />
      </Route>
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/info" element={<Information />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}
