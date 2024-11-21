import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";
import { Provider } from "jotai";

import Home from "@/pages/home";
import Recipes from "@/pages/recipes";
import Layout from "@/components/layout";
import Recipe from "@/pages/recipe";
import Information from "@/pages/info";
import { Favorites } from "@/pages/favorites";
import GoogleSignInPage from "@/pages/sync";
import { Login } from "@/pages/login";

import { store } from "@/lib/store";
import useAuth from "@/hooks/use-auth";

function NotFound() {
  return <div>404 Not Found</div>;
}

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const user = useAuth();
  return user ? element : null;
};

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
    children: [{ index: true, element: <Login /> }],
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
