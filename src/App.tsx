import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";
import { Provider } from "jotai";

import Home from "@/pages/home";
import Recipes from "@/pages/recipes";
import Layout from "@/components/layout";
import Recipe from "@/pages/recipe";
import Information from "@/pages/info";
import Favorites from "@/pages/favorites";
import GoogleSignInPage from "@/pages/sync";
import Login from "@/pages/login";
import ForgotPassword from "@/pages/forgot-password";

import { store } from "@/lib/store";
import { AuthLayout } from "./components/auth-layout";
import ProtectedRoute from "./components/protected-route";

function NotFound() {
  return <div>404 Not Found</div>;
}

const routes = [
  {
    path: "/",
    element: <ProtectedRoute element={<Layout />} />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/recipes",
    element: <ProtectedRoute element={<Layout />} />,
    children: [{ index: true, element: <Recipes /> }],
  },
  {
    path: "/recipes/:id",
    element: <ProtectedRoute element={<Layout />} />,
    children: [{ index: true, element: <Recipe /> }],
  },
  {
    path: "/info",
    children: [{ index: true, element: <Information /> }],
  },
  {
    path: "/favorites",
    element: <ProtectedRoute element={<Layout />} />,
    children: [{ index: true, element: <Favorites /> }],
  },
  {
    path: "/sync",
    element: <ProtectedRoute element={<Layout />} />,
    children: [{ index: true, element: <GoogleSignInPage /> }],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/forgot-password",
    element: <ProtectedRoute element={<AuthLayout />} />,
    children: [{ index: true, element: <ForgotPassword /> }],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
] as RouteObject[];

function AppRouter() {
  const element = useRoutes(routes);
  return <>{element}</>;
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
