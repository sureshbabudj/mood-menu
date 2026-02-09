import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider, useAtomValue } from "jotai";

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

function NotFound() {
  return <div>404 Not Found</div>;
}
function AppRouter() {
  const location = useLocation();
  const session = useAtomValue(sessionAtom);

  const isAuthRoute = location.pathname.startsWith("/auth");

  if (session?.user && isAuthRoute) {
    return <Navigate to="/" replace />;
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
