import { ReactElement } from "react";
import { useAppContext } from "../lib/contextLib";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthenticatedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${pathname}${search}`} />;
  }

  return children;
}
