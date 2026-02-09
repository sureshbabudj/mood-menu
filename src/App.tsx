import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Provider, useAtomValue } from "jotai";
import React, { useEffect } from "react";

import Home from "@/pages/home";
import Recipes from "@/pages/recipes";
import Layout from "@/components/layout";
import Recipe from "@/pages/recipe";
import Information from "@/pages/info";
import Favorites from "@/pages/favorites";
import Login from "@/pages/login";
import ResetPassword from "@/pages/reset-password";
import Account from "@/pages/account";

import { sessionAtom, store } from "@/lib/store";
import { AuthLayout } from "./components/auth-layout";
import ProtectedRoute from "./components/protected-route";
import { Auth } from "./components/auth-provider";
import Register from "./pages/register";
import { ForgotPasswordSuccess } from "./pages/forgot-password-success";
import { Button } from "./components/ui/button";

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-4xl font-bold font-sourgummy text-primary">404</h1>
      <p className="text-xl">Oops! This recipe doesn't exist yet.</p>
      <img src="/assets/logo.svg" alt="MoodMenu Logo" className="w-24 h-24 animate-bounce" />
      <Button asChild>
        <Link to="/">Go back to Home</Link>
      </Button>
    </div>
  );
}
function AppRouter() {
  const location = useLocation();
  const session = useAtomValue(sessionAtom);
  const navigate = useNavigate();

  const isAuthRoute = location.pathname.startsWith("/auth");

  useEffect(() => {
    if (session?.user && isAuthRoute) {
      console.log("AppRouter: User authenticated, redirecting to home...");
      navigate("/", { replace: true });
    }
  }, [session?.user, isAuthRoute, navigate]);

  if (session?.user && isAuthRoute) {
    return (
      <div className="w-full h-full fixed top-0 left-0 bg-white z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<Recipe />} />
        <Route path="favorites" element={<ProtectedRoute element={<Favorites />} />} />
        <Route path="account" element={<ProtectedRoute element={<Account />} />} />
      </Route>
      <Route
        path="/reset-password"
        element={<AuthLayout />}
      >
        <Route index element={<ResetPassword />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="forgot-password-success"
          element={<ForgotPasswordSuccess />}
        />
        <Route path="*" element={<Login />} />
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
        <Auth>
          <AppRouter />
        </Auth>
      </Provider>
    </BrowserRouter>
  );
}
