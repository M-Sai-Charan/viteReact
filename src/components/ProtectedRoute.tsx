import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
