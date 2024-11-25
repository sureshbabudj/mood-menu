import { sessionAtom } from "@/lib/store";
import { useAtomValue } from "jotai";
import { Navigate } from "react-router";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const session = useAtomValue(sessionAtom);
  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

export default ProtectedRoute;
